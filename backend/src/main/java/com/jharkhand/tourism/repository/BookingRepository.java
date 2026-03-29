package com.jharkhand.tourism.repository;

import com.jharkhand.tourism.entity.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface BookingRepository extends JpaRepository<Booking, Long> {
    List<Booking> findByUser_Id(Long userId);
    List<Booking> findByStatus(Booking.BookingStatus status);
}
