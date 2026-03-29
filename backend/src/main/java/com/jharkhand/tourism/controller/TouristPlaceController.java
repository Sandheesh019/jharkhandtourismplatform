package com.jharkhand.tourism.controller;
 
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.jharkhand.tourism.entity.TouristPlace;
import com.jharkhand.tourism.repository.TouristPlaceRepository;

import java.util.List;

@RestController
@RequestMapping("/api/places")
@Tag(name = "Tourist Places", description = "Eco, Cultural and Heritage sites")
public class TouristPlaceController {

    @Autowired
    private TouristPlaceRepository repo;

    @Operation(summary = "Get all tourist places")
    @GetMapping
    public List<TouristPlace> getAll() { return repo.findAll(); }

    @Operation(summary = "Get place by ID")
    @GetMapping("/{id}")
    public ResponseEntity<TouristPlace> getById(@PathVariable Long id) {
        return repo.findById(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @Operation(summary = "Filter by category: ECO, CULTURAL, HERITAGE")
    @GetMapping("/category/{category}")
    public List<TouristPlace> getByCategory(@PathVariable String category) {
        return repo.findByCategory(category);
    }

    @Operation(summary = "Filter by district")
    @GetMapping("/district/{district}")
    public List<TouristPlace> getByDistrict(@PathVariable String district) {
        return repo.findByDistrict(district);
    }

    @Operation(summary = "Add a new tourist place")
    @PostMapping
    public TouristPlace create(@RequestBody TouristPlace place) { return repo.save(place); }

    @Operation(summary = "Update a tourist place")
    @PutMapping("/{id}")
    public ResponseEntity<TouristPlace> update(@PathVariable Long id, @RequestBody TouristPlace place) {
        return repo.findById(id).map(p -> { place.setId(id); return ResponseEntity.ok(repo.save(place)); })
                .orElse(ResponseEntity.notFound().build());
    }

    @Operation(summary = "Delete a tourist place")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        repo.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
