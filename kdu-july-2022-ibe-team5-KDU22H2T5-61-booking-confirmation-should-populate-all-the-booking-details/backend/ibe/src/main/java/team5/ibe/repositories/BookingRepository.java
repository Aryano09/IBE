package team5.ibe.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import team5.ibe.entities.Booking;
import team5.ibe.models.rds.ConfirmationDTO;

import java.util.List;
import java.util.Set;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {
    @Modifying(clearAutomatically = true)
    @Transactional
    @Query(value = "insert \n" +
            "    into\n" +
            "        bookings\n" +
            "        (id, adult_count, amount_due_at_resort, billing_info_id, check_in_date, check_out_date, child_count, guest_id, payment_card_number, promotion_id, price_per_room, duration, subtotal, due_now, occupancy_tax, total_resort_fee, tax_surcharge_fee_total, property_id, room_type_id, total_cost, status_id, room_count, room_type_name, encrypted_booking_id) VALUES (:id, :adult_count, :amount_due_at_resort, :billing_info_id, :check_in_date, :check_out_date, :child_count, :guest_id, :payment_reference_number, :promotion_id, :price_per_room, :duration, :subtotal, :due_now, :occupancy_tax, :total_resort_fee, :tax_surcharge_fee_total, :property_id, :room_type_id, :total_cost, :status_id, :room_count, :room_type_name, :encrypted_booking_id)",nativeQuery = true)
    public void createBooking(@Param("id")Long id, @Param("adult_count")Long adult_count,@Param("amount_due_at_resort")Double amount_due_at_resort, @Param("billing_info_id")Long billing_info_id,@Param("check_in_date")String check_in_date,@Param("check_out_date")String check_out_date, @Param("child_count")Long child_count, @Param("guest_id")Long guest_id, @Param("payment_reference_number")String payment_reference_number, @Param("promotion_id")Long promotion_id, @Param("price_per_room")Double price_per_room, @Param("duration")Long duration, @Param("subtotal")Double subtotal, @Param("due_now")Double due_now, @Param("occupancy_tax")Double occupancy_tax, @Param("total_resort_fee")Double total_resort_fee, @Param("tax_surcharge_fee_total")Double tax_surcharge_fee_total,@Param("property_id")Long property_id, @Param("room_type_id")Long room_type_id, @Param("total_cost")Double total_cost, @Param("status_id")Long status_id, @Param("room_count")Long room_count, @Param("room_type_name")String room_type_name, @Param("encrypted_booking_id")String encrypted_booking_id);


    @Query(value = "Select * from bookings where id = :booking_id" ,nativeQuery = true)
    public Booking getBookingById(@Param("booking_id")Long BookingId);

    @Query(value = "Select id from bookings where encrypted_booking_id = :booking_id" ,nativeQuery = true)
    public Long getIdByIdEncrypted(@Param("booking_id")String encryptedBookingId);

    @Query(value = "Select * from bookings where encrypted_booking_id = :booking_id" ,nativeQuery = true)
    public Booking getBookingByIdEncrypted(@Param("booking_id")String encryptedBookingId);
    public Booking findByEncryptedBookingId(String encryptedBookingId);

    @Query(value = "select * from bookings where guest_id in (select id from guests where email = :email)", nativeQuery = true)
    public List<Booking> getAllBookingsByUserEmail(@Param("email")String email);

    @Modifying(clearAutomatically = true)
    @Transactional
    @Query(value = "UPDATE bookings SET status_id = 2 WHERE id = :bookingId", nativeQuery = true)
    public void updateBookingStatusAsCancelledById(@Param("bookingId")Long bookingId);

    @Query(value = "select id from bookings where guest_id in :guestIds", nativeQuery = true)
    List<Long> getBookingIdsByGuestIds(@Param("guestIds") List<Long> guestIds);

    @Query(value = "select * from bookings where id in :bookingIds", nativeQuery = true)
    Set<Booking> getAllBookingsByIds(List<Long> bookingIds);
}
