package com.example.demo.controller;

import com.example.demo.model.User;
import com.example.demo.repo.UserRepository;
import com.example.demo.service.OtpService;
import com.example.demo.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/auth")
public class AuthController {
    @Autowired private UserRepository userRepo;
    @Autowired private PasswordEncoder passwordEncoder;
    @Autowired private JwtUtil jwtUtil;
    @Autowired private OtpService otpService;

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody User user) {
        if (userRepo.findByEmail(user.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body("Email already exists");
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));

        // Generate and store OTP
        String otp = otpService.generateOtp();
        user.setOtp(otp);
        user.setOtpExpiry(LocalDateTime.now().plusMinutes(5));
        userRepo.save(user);

        // In production, send OTP via email/SMS
        System.out.println("OTP for " + user.getEmail() + ": " + otp);

        return ResponseEntity.ok("Signup successful. Check your email for OTP.");
    }

    @PostMapping("/verify")
    public ResponseEntity<?> verifyOtp(@RequestBody Map<String, String> body) {
        String email = body.get("email");
        String otp = body.get("otp");
        User user = userRepo.findByEmail(email)
            .orElseThrow(() -> new RuntimeException("User not found"));

        if (otpService.isOtpValid(user.getOtp(), otp, user.getOtpExpiry())) {
            user.setVerified(true);
            user.setOtp(null);
            user.setOtpExpiry(null);
            userRepo.save(user);
            return ResponseEntity.ok("Account verified successfully");
        }

        return ResponseEntity.badRequest().body("Invalid or expired OTP");
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> credentials) {
        String email = credentials.get("email");
        String password = credentials.get("password");
        
        return userRepo.findByEmail(email)
            .filter(dbUser -> passwordEncoder.matches(password, dbUser.getPassword()))
            .map(dbUser -> {
                if (!dbUser.isVerified()) {
                    Map<String, String> response = new HashMap<>();
                    response.put("error", "Account not verified");
                    return ResponseEntity.badRequest().body(response);
                }
                String token = jwtUtil.generateToken(dbUser.getEmail());
                Map<String, String> response = new HashMap<>();
                response.put("token", token);
                return ResponseEntity.ok(response);
            })
            .orElseGet(() -> {
                Map<String, String> response = new HashMap<>();
                response.put("error", "Invalid credentials");
                return ResponseEntity.badRequest().body(response);
            });
    }
}
