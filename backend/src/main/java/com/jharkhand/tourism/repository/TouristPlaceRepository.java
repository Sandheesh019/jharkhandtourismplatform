package com.jharkhand.tourism.repository;

import com.jharkhand.tourism.entity.TouristPlace;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface TouristPlaceRepository extends JpaRepository<TouristPlace, Long> {
    List<TouristPlace> findByCategory(String category);
    List<TouristPlace> findByDistrict(String district);
}
