package com.jharkhand.tourism.service;

import com.jharkhand.tourism.config.JwtUtil;
import com.jharkhand.tourism.entity.User;
import com.jharkhand.tourism.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.Map;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    @Lazy
    private AuthenticationManager authManager;

    public Map<String, String> register(User user) {
        if (userRepository.existsByEmail(user.getEmail()))
            throw new RuntimeException("Email already registered");
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);
        return Map.of("message", "Registration successful");
    }

    public Map<String, String> login(String email, String password) {
        authManager.authenticate(new UsernamePasswordAuthenticationToken(email, password));
        String token = jwtUtil.generateToken(email);
        User user = userRepository.findByEmail(email).get();
        return Map.of("token", token, "role", user.getRole().name(), "name", user.getName(), "userId", String.valueOf(user.getId()));
    }
}
