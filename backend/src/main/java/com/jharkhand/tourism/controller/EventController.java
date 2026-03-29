package com.jharkhand.tourism.controller;

 import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.jharkhand.tourism.entity.Event;
import com.jharkhand.tourism.repository.EventRepository;

import java.util.List;

@RestController
@RequestMapping("/api/events")
@Tag(name = "Events", description = "Festivals and cultural events")
public class EventController {

    @Autowired
    private EventRepository repo;

    @Operation(summary = "Get all events")
    @GetMapping
    public List<Event> getAll() { return repo.findAll(); }

    @Operation(summary = "Get event by ID")
    @GetMapping("/{id}")
    public ResponseEntity<Event> getById(@PathVariable Long id) {
        return repo.findById(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @Operation(summary = "Filter events by district")
    @GetMapping("/district/{district}")
    public List<Event> getByDistrict(@PathVariable String district) { return repo.findByDistrict(district); }

    @Operation(summary = "Filter events by category: FESTIVAL, CULTURAL, ECO")
    @GetMapping("/category/{category}")
    public List<Event> getByCategory(@PathVariable String category) { return repo.findByCategory(category); }

    @Operation(summary = "Add an event")
    @PostMapping
    public Event create(@RequestBody Event event) { return repo.save(event); }

    @Operation(summary = "Delete an event")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        repo.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
