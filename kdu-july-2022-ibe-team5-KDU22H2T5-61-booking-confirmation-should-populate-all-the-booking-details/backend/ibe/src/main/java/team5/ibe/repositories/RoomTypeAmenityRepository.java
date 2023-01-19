package team5.ibe.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import team5.ibe.entities.RoomTypeAmenity;
import team5.ibe.entities.RoomTypeAmenityId;

import java.util.List;
import java.util.Set;

public interface RoomTypeAmenityRepository extends JpaRepository<RoomTypeAmenity, RoomTypeAmenityId> {
    @Query(value = "select * from room_type_amenities where room_type_id in (:ids)", nativeQuery = true)
    public List<RoomTypeAmenity> getRoomTypeAmenities(@Param("ids") Set<Long> roomTypeIds);
}
