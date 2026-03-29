package com.jharkhand.tourism.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "tourist_places")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TouristPlace {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    private String description;
    private String location;
    private String district;
    private String imageUrl;

    @Enumerated(EnumType.STRING)
    private Category category;

    private Double latitude;
    private Double longitude;

    public enum Category {
        ECO,
        CULTURAL,
        HERITAGE
    }
}