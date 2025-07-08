package com.example.demo.controller;


import com.example.demo.model.User;
import com.example.demo.repo.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.HttpSession;
import java.util.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class AuthController {
    @Autowired
    private UserRepository userRepo;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody User user) {
        if (userRepo.findByEmail(user.getEmail()).isPresent()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Email already exists");
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepo.save(user);
        return ResponseEntity.ok("Signup successful");
    }

    // Handled by Spring Security, but you can add custom login logic if you want

    @GetMapping("/me")
    public ResponseEntity<?> me(HttpSession session) {
        Object email = session.getAttribute("SPRING_SECURITY_CONTEXT");
        if (email == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Not logged in");
        }
        // You can extract the user info from the session if you add it on login
        return ResponseEntity.ok(Map.of("status", "logged in"));
    }

    @GetMapping("/users")
    public List<User> getAllUsers() {
        return userRepo.findAll();
    }
    
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) {
        Optional<User> dbUser = userRepo.findByEmail(user.getEmail());
        if (dbUser.isPresent() && passwordEncoder.matches(user.getPassword(), dbUser.get().getPassword())) {
            // You should generate a JWT token or session here for real apps!
            return ResponseEntity.ok("Login successful");
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials.");
    }

}
