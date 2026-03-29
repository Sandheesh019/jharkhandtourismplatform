package com.jharkhand.tourism.controller;

  import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.jharkhand.tourism.entity.EmergencyContact;
import com.jharkhand.tourism.repository.EmergencyContactRepository;

import java.util.List;

@RestController
@RequestMapping("/api/emergency")
@Tag(name = "Emergency Contacts", description = "Police, Hospital, Fire, Tourist Helpline")
public class EmergencyContactController {

    @Autowired
    private EmergencyContactRepository repo;

    @Operation(summary = "Get all emergency contacts")
    @GetMapping
    public List<EmergencyContact> getAll() { return repo.findAll(); }

    @Operation(summary = "Filter by district")
    @GetMapping("/district/{district}")
    public List<EmergencyContact> getByDistrict(@PathVariable String district) {
        return repo.findByDistrict(district);
    }

    @Operation(summary = "Filter by type: POLICE, HOSPITAL, FIRE, TOURIST_HELPLINE")
    @GetMapping("/type/{type}")
    public List<EmergencyContact> getByType(@PathVariable String type) {
        return repo.findByType(type);
    }

    @Operation(summary = "Add emergency contact")
    @PostMapping
    public EmergencyContact create(@RequestBody EmergencyContact contact) { return repo.save(contact); }

    @Operation(summary = "Delete emergency contact")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        repo.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
