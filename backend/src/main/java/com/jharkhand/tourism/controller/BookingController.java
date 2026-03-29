package com.jharkhand.tourism.controller;

import com.jharkhand.tourism.entity.Booking;
import com.jharkhand.tourism.entity.User;
import com.jharkhand.tourism.repository.BookingRepository;
import com.jharkhand.tourism.repository.UserRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/bookings")
@Tag(name = "Bookings", description = "Manage hotel, transport and event bookings")
public class BookingController {

    @Autowired
    private BookingRepository repo;

    @Autowired
    private UserRepository userRepo;

    @Operation(summary = "Get all bookings (admin)")
    @GetMapping
    public List<Booking> getAll() {
        return repo.findAll();
    }

    @Operation(summary = "Get bookings by user ID")
    @GetMapping("/user/{userId}")
    public List<Booking> getByUser(@PathVariable Long userId) {
        return repo.findByUser_Id(userId);
    }

    @Operation(summary = "Get booking by ID")
    @GetMapping("/{id}")
    public ResponseEntity<Booking> getById(@PathVariable Long id) {
        return repo.findById(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @Operation(summary = "Create a booking")
    @PostMapping
    public ResponseEntity<?> create(@RequestBody Map<String, Object> body) {
        Object userIdObj = body.get("userId");
        if (userIdObj == null) return ResponseEntity.badRequest().body("userId is required");
        User user = userRepo.findById(Long.valueOf(userIdObj.toString()))
            .orElseThrow(() -> new RuntimeException("User not found"));
        Booking booking = new Booking();
        booking.setUser(user);
        Object typeObj = body.get("type");
        if (typeObj == null) return ResponseEntity.badRequest().body("type is required");
        booking.setType(Booking.BookingType.valueOf(typeObj.toString()));
        if (body.get("referenceId") != null)
            booking.setReferenceId(Long.valueOf(body.get("referenceId").toString()));
        if (body.get("checkIn") != null)
            booking.setCheckIn(java.time.LocalDate.parse(body.get("checkIn").toString()));
        if (body.get("checkOut") != null)
            booking.setCheckOut(java.time.LocalDate.parse(body.get("checkOut").toString()));
        if (body.get("guests") != null)
            booking.setGuests(Integer.valueOf(body.get("guests").toString()));
        if (body.get("totalAmount") != null)
            booking.setTotalAmount(Double.valueOf(body.get("totalAmount").toString()));
        booking.setStatus(Booking.BookingStatus.CONFIRMED);
        return ResponseEntity.ok(repo.save(booking));
    }

    @Operation(summary = "Update booking status: PENDING, CONFIRMED, CANCELLED")
    @PutMapping("/{id}/status")
    public ResponseEntity<Booking> updateStatus(@PathVariable Long id, @RequestParam String status) {
        return repo.findById(id).map(b -> {
            b.setStatus(Booking.BookingStatus.valueOf(status));
            return ResponseEntity.ok(repo.save(b));
        }).orElse(ResponseEntity.notFound().build());
    }

    @Operation(summary = "Delete a booking")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        repo.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
