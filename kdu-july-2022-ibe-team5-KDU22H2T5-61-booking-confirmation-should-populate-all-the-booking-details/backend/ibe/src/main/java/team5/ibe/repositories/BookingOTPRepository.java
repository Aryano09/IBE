package team5.ibe.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import team5.ibe.entities.BookingOTP;

import java.util.List;

@Repository
public interface BookingOTPRepository extends JpaRepository<BookingOTP, Long> {
    @Modifying(clearAutomatically = true)
    @Transactional
    @Query(value = "INSERT INTO bookings_otp (booking_id, otp) VALUES (:bookingId, :otp) ON DUPLICATE KEY UPDATE otp = :otp, chances_left = 3", nativeQuery = true)
    public void updateBookingOTP(@Param("bookingId")Long bookingId, @Param("otp")Long otp);

    @Query(value = "SELECT * FROM bookings_otp WHERE booking_id = :bookingId", nativeQuery = true)
    public List<BookingOTP> getBookingOTPById(@Param("bookingId")Long bookingId);

    @Modifying(clearAutomatically = true)
    @Transactional
    @Query(value = "UPDATE bookings_otp SET chances_left = chances_left - 1 WHERE booking_id = :bookingId", nativeQuery = true)
    public void decrementChancesLeftById(@Param("bookingId")Long bookingId);
}
