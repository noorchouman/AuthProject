package com.example.demo.service;

import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.Random;

@Service
public class OtpService {
    public String generateOtp() {
        return String.format("%06d", new Random().nextInt(999999));
    }

    public boolean isOtpValid(String storedOtp, String inputOtp, LocalDateTime expiry) {
        return storedOtp != null 
            && storedOtp.equals(inputOtp)
            && LocalDateTime.now().isBefore(expiry);
    }
}