package com.jharkhand.tourism.controller;
 
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.jharkhand.tourism.entity.Review;
import com.jharkhand.tourism.repository.ReviewRepository;

import java.util.List;

@RestController
@RequestMapping("/api/reviews")
@Tag(name = "Reviews", description = "Ratings and comments on tourist places")
public class ReviewController {

    @Autowired
    private ReviewRepository repo;

    @Operation(summary = "Get reviews for a place")
    @GetMapping("/place/{placeId}")
    public List<Review> getByPlace(@PathVariable Long placeId) { return repo.findByPlaceId(placeId); }

    @Operation(summary = "Get reviews by user")
    @GetMapping("/user/{userId}")
    public List<Review> getByUser(@PathVariable Long userId) { return repo.findByUserId(userId); }

    @Operation(summary = "Add a review")
    @PostMapping
    public Review create(@RequestBody Review review) { return repo.save(review); }

    @Operation(summary = "Delete a review")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        repo.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
