package com.jharkhand.tourism.controller;
 
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.jharkhand.tourism.entity.Hotel;
import com.jharkhand.tourism.repository.HotelRepository;

import java.util.List;

@RestController
@RequestMapping("/api/hotels")
@Tag(name = "Hotels", description = "Browse and book hotels")
public class HotelController {

    @Autowired
    private HotelRepository repo;

    @Operation(summary = "Get all hotels")
    @GetMapping
    public List<Hotel> getAll() { return repo.findAll(); }

    @Operation(summary = "Get hotel by ID")
    @GetMapping("/{id}")
    public ResponseEntity<Hotel> getById(@PathVariable Long id) {
        return repo.findById(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @Operation(summary = "Filter hotels by district")
    @GetMapping("/district/{district}")
    public List<Hotel> getByDistrict(@PathVariable String district) { return repo.findByDistrict(district); }

    @Operation(summary = "Add a hotel")
    @PostMapping
    public Hotel create(@RequestBody Hotel hotel) { return repo.save(hotel); }

    @Operation(summary = "Update a hotel")
    @PutMapping("/{id}")
    public ResponseEntity<Hotel> update(@PathVariable Long id, @RequestBody Hotel hotel) {
        return repo.findById(id).map(h -> { hotel.setId(id); return ResponseEntity.ok(repo.save(hotel)); })
                .orElse(ResponseEntity.notFound().build());
    }

    @Operation(summary = "Decrement available rooms by count")
    @PutMapping("/{id}/decrement-rooms")
    public ResponseEntity<Hotel> decrementRooms(@PathVariable Long id, @RequestParam(defaultValue = "1") int count) {
        return repo.findById(id).map(h -> {
            h.setAvailableRooms(Math.max(0, h.getAvailableRooms() - count));
            return ResponseEntity.ok(repo.save(h));
        }).orElse(ResponseEntity.notFound().build());
    }

    @Operation(summary = "Increment available rooms by count")
    @PutMapping("/{id}/increment-rooms")
    public ResponseEntity<Hotel> incrementRooms(@PathVariable Long id, @RequestParam(defaultValue = "1") int count) {
        return repo.findById(id).map(h -> {
            h.setAvailableRooms(Math.min(h.getTotalRooms(), h.getAvailableRooms() + count));
            return ResponseEntity.ok(repo.save(h));
        }).orElse(ResponseEntity.notFound().build());
    }

    @Operation(summary = "Delete a hotel")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        repo.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
