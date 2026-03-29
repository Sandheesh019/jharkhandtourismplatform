package com.jharkhand.tourism.repository;

import com.jharkhand.tourism.entity.Transport;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface TransportRepository extends JpaRepository<Transport, Long> {
    List<Transport> findBySourceAndDestination(String source, String destination);
    List<Transport> findByType(String type);
}
