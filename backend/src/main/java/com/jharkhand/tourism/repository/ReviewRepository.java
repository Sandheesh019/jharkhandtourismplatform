package com.jharkhand.tourism.repository;

import com.jharkhand.tourism.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ReviewRepository extends JpaRepository<Review, Long> {
    List<Review> findByPlaceId(Long placeId);
    List<Review> findByUserId(Long userId);
}
