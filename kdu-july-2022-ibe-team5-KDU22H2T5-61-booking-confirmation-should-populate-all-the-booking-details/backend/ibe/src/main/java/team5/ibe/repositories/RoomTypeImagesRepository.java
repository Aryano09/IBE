package team5.ibe.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import team5.ibe.entities.RoomTypeImages;

import java.util.List;
import java.util.Set;

@Repository
public interface RoomTypeImagesRepository extends JpaRepository<RoomTypeImages, Long> {
    @Query(value = "select * from room_type_images where property_id=:propertyId and room_type_id in (:ids)", nativeQuery = true)
    public List<RoomTypeImages> getRoomTypeImagesByIds(@Param("propertyId")Integer propertyId, @Param("ids")List<Integer> roomTypeIds);

    @Query(value = "select * from room_type_images where room_type_id in (:ids)", nativeQuery = true)
    public List<RoomTypeImages> getRoomTypeImagesByRoomTypeIds(@Param("ids") Set<Long> roomTypeIds);
}
