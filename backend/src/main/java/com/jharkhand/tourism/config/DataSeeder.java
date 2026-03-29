package com.jharkhand.tourism.config;

import com.jharkhand.tourism.entity.User;
import com.jharkhand.tourism.repository.UserRepository;
import com.jharkhand.tourism.repository.TouristPlaceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import java.util.Map;
import java.util.HashMap;

@Component
public class DataSeeder implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TouristPlaceRepository placeRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    private static final Map<String, String> PLACE_IMAGES = new HashMap<>();
    static {
        PLACE_IMAGES.put("Betla National Park",          "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Betla_National_Park_Entrance.jpg/1200px-Betla_National_Park_Entrance.jpg");
        PLACE_IMAGES.put("Hundru Falls",                 "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Hundru_fall.jpg/1200px-Hundru_fall.jpg");
        PLACE_IMAGES.put("Dassam Falls",                 "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Dasam_falls.jpg/1200px-Dasam_falls.jpg");
        PLACE_IMAGES.put("Pahari Mandir",                "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Pahari_Mandir_Ranchi.jpg/1200px-Pahari_Mandir_Ranchi.jpg");
        PLACE_IMAGES.put("Jagannath Temple",             "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Jagannath_Temple%2C_Ranchi.jpg/1200px-Jagannath_Temple%2C_Ranchi.jpg");
        PLACE_IMAGES.put("Deoghar Baidyanath Dham",      "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Baidyanath_Dham.jpg/1200px-Baidyanath_Dham.jpg");
        PLACE_IMAGES.put("Rajrappa Temple",              "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Rajrappa.jpg/1200px-Rajrappa.jpg");
        PLACE_IMAGES.put("Netarhat",                     "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Netarhat_view.jpg/1200px-Netarhat_view.jpg");
        PLACE_IMAGES.put("Panchghagh Falls",             "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Panchghagh_waterfall.jpg/1200px-Panchghagh_waterfall.jpg");
        PLACE_IMAGES.put("Hazaribagh Wildlife Sanctuary","https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Hazaribagh_National_Park.jpg/1200px-Hazaribagh_National_Park.jpg");
        PLACE_IMAGES.put("Topchanchi Lake",              "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Topchanchi_Lake.jpg/1200px-Topchanchi_Lake.jpg");
        PLACE_IMAGES.put("Macluskieganj",                "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Macluskieganj.jpg/1200px-Macluskieganj.jpg");
    }

    @Override
    public void run(String... args) {
        seedUser("Admin User",  "admin@tourism.com", "password123", "9876543210", User.Role.ADMIN);
        seedUser("Vishnu Admin", "vishnu@admin.com",  "password123", "9000000001", User.Role.ADMIN);
        seedUser("Rahul Kumar",  "rahul@gmail.com",   "password123", "9123456780", User.Role.USER);
        seedUser("Priya Singh",  "priya@gmail.com",   "password123", "9234567891", User.Role.USER);
        seedUser("Amit Sharma",  "amit@gmail.com",    "password123", "9345678902", User.Role.USER);
        seedPlaceImages();
    }

    private void seedPlaceImages() {
        placeRepository.findAll().forEach(place -> {
            if (place.getImageUrl() == null || place.getImageUrl().isBlank()) {
                String url = PLACE_IMAGES.get(place.getName());
                if (url != null) {
                    place.setImageUrl(url);
                    placeRepository.save(place);
                    System.out.println("Set image for: " + place.getName());
                }
            }
        });
    }

    private void seedUser(String name, String email, String rawPassword, String phone, User.Role role) {
        if (!userRepository.existsByEmail(email)) {
            User user = new User();
            user.setName(name);
            user.setEmail(email);
            user.setPassword(passwordEncoder.encode(rawPassword));
            user.setPhone(phone);
            user.setRole(role);
            userRepository.save(user);
            System.out.println("Seeded user: " + email);
        }
    }
}
