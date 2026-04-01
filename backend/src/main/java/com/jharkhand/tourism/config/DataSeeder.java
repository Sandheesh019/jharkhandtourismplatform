package com.jharkhand.tourism.config;

import com.jharkhand.tourism.entity.User;
import com.jharkhand.tourism.repository.UserRepository;
import com.jharkhand.tourism.repository.TouristPlaceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DataSeeder implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TouristPlaceRepository placeRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        seedUser("Admin User",   "admin@tourism.com", "password123", "9876543210", User.Role.ADMIN);
        seedUser("Vishnu Admin", "vishnu@admin.com",  "password123", "9000000001", User.Role.ADMIN);
        seedUser("Rahul Kumar",  "rahul@gmail.com",   "password123", "9123456780", User.Role.USER);
        seedUser("Priya Singh",  "priya@gmail.com",   "password123", "9234567891", User.Role.USER);
        seedUser("Amit Sharma",  "amit@gmail.com",    "password123", "9345678902", User.Role.USER);
    }

    private void seedUser(String name, String email, String rawPassword, String phone, User.Role role) {
        if (!userRepository.existsByEmail(email)) {
            User user = new User(null, name, email, passwordEncoder.encode(rawPassword), phone, role);
            userRepository.save(user);
            System.out.println("Seeded user: " + email);
        }
    }
}
