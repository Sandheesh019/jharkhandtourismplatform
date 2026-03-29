package com.jharkhand.tourism.controller;

import com.jharkhand.tourism.entity.Transport;
import com.jharkhand.tourism.repository.TransportRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RequestMethod;

import java.util.List;

@RestController
@RequestMapping("/api/transport")
@CrossOrigin(origins = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE, RequestMethod.OPTIONS})
@Tag(name = "Transport", description = "Bus, Train, Cab options")
public class TransportController {

    @Autowired
    private TransportRepository repo;  // no final

    @Operation(summary = "Get all transport options")
    @GetMapping
    public List<Transport> getAll() { return repo.findAll(); }

    @Operation(summary = "Search transport by source and destination")
    @GetMapping("/search")
    public List<Transport> search(@RequestParam String source, @RequestParam String destination) {
        return repo.findBySourceAndDestination(source, destination);
    }

    @Operation(summary = "Filter by type: BUS, TRAIN, CAB, AUTO")
    @GetMapping("/type/{type}")
    public List<Transport> getByType(@PathVariable String type) { return repo.findByType(type); }

    @Operation(summary = "Add transport option")
    @PostMapping
    public Transport create(@RequestBody Transport transport) { return repo.save(transport); }

    @Operation(summary = "Update transport option")
    @PutMapping("/{id}")
    public ResponseEntity<Transport> update(@PathVariable Long id, @RequestBody Transport transport) {
        return repo.findById(id).map(t -> { transport.setId(id); return ResponseEntity.ok(repo.save(transport)); })
                .orElse(ResponseEntity.notFound().build());
    }

    @Operation(summary = "Delete transport option")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        repo.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}