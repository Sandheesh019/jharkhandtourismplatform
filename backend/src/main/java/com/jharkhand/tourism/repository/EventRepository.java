package com.jharkhand.tourism.repository;

import com.jharkhand.tourism.entity.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface EventRepository extends JpaRepository<Event, Long> {
    List<Event> findByDistrict(String district);
    List<Event> findByCategory(String category);
}
