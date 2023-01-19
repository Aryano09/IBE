package team5.ibe.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import team5.ibe.entities.BookingThread;

@Repository
public interface BookingThreadRepository extends JpaRepository<BookingThread, Long> {

    @Modifying(clearAutomatically = true)
    @Transactional
    @Query(value = "INSERT INTO booking_threads (room_type_id, in_use) VALUES (:roomTypeId, :inUse) ON DUPLICATE KEY UPDATE in_use=:inUse", nativeQuery = true)
    public void updateThreadByRoomTypeId(@Param("roomTypeId")Long roomTypeId, @Param("inUse")Boolean inUse);

    @Modifying(clearAutomatically = true)
    @Transactional
    @Query(value = "INSERT INTO booking_threads (room_type_id, in_use) VALUES (:roomTypeId, :inUse)", nativeQuery = true)
    public void insertNewRecord(@Param("roomTypeId")Long roomTypeId, @Param("inUse")Boolean inUse);

    @Modifying(clearAutomatically = true)
    @Transactional
    @Query(value = "DELETE FROM booking_threads WHERE room_type_id = :roomTypeId", nativeQuery = true)
    public void deleteThreadByRoomTypeId(@Param("roomTypeId")Long roomTypeId);
}
