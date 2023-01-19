package team5.ibe.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import team5.ibe.entities.ConcurrentBookingThread;

@Repository
public interface ConcurrentBookingThreadRepository extends JpaRepository<ConcurrentBookingThread, String> {
    @Modifying(clearAutomatically = true)
    @Transactional
    @Query(value = "INSERT INTO concurrent_booking_threads (propertyId_roomTypeId_date) VALUES (:key)", nativeQuery = true)
    public void insertNewRecord(@Param("key")String key);
    @Modifying
    @Transactional
    @Query(value = "DELETE FROM concurrent_booking_threads WHERE propertyId_roomTypeId_date = :key", nativeQuery = true)
    public void deleteRecordByKey(@Param("key")String key);
}
