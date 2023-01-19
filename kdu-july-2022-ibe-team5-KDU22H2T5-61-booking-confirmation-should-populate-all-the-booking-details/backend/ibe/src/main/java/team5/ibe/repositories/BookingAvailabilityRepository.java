package team5.ibe.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import team5.ibe.entities.BookingAvailability;

import java.util.List;

@Repository
public interface BookingAvailabilityRepository extends JpaRepository<BookingAvailability, Long> {
    @Query(value = "SELECT * FROM bookings_availability_ids WHERE booking_id = :bookingId", nativeQuery = true)
    public List<BookingAvailability> getBookingAvailabilitiesById(@Param("bookingId")Long bookingId);
}
