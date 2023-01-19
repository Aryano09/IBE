package team5.ibe.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import team5.ibe.entities.BookingStatus;

import java.util.List;

@Repository
public interface BookingStatusRepository extends JpaRepository<BookingStatus, Long> {
    @Query(value = "select * from booking_statuses where status_id=:statusId", nativeQuery = true)
    public List<BookingStatus> getBookingStatusById(@Param("statusId")Long id);
}
