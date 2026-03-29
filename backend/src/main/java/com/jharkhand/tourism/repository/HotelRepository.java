package com.jharkhand.tourism.repository;

import com.jharkhand.tourism.entity.Hotel;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface HotelRepository extends JpaRepository<Hotel, Long> {
    List<Hotel> findByDistrict(String district);
}
