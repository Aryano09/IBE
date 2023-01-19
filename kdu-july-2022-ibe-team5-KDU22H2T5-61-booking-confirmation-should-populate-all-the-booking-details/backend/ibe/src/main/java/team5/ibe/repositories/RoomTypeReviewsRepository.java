package team5.ibe.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import team5.ibe.entities.RoomTypeReview;

import java.util.List;

@Repository
public interface RoomTypeReviewsRepository extends JpaRepository<RoomTypeReview, Long> {

    @Query(value = "select * from room_type_reviews where room_type_id = :roomTypeId", nativeQuery = true)
    public List<RoomTypeReview> getReviewsByRoomTypeId(@Param("roomTypeId")Long roomTypeId);

    @Query(value = "select * from room_type_reviews", nativeQuery = true)
    public List<RoomTypeReview> getAllRoomTypeReviews();
}
