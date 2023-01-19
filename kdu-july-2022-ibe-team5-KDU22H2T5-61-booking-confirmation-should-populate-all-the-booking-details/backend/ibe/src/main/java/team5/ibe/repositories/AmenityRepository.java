package team5.ibe.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import team5.ibe.entities.Amenity;

import java.util.List;

@Repository
public interface AmenityRepository extends JpaRepository<Amenity, Long> {

    @Query(value = "SELECT id,`name` FROM amenities INNER JOIN room_type_amenities ON room_type_amenities.amenity_id = amenities.id WHERE room_type_amenities.room_type_id = :room_type_id", nativeQuery = true)
    public List<Amenity> getAmenitiesByRoomTypeId(@Param("room_type_id")Long id);

    @Query(value = "SELECT id,`name` FROM amenities INNER JOIN room_type_amenities ON room_type_amenities.amenity_id = amenities.id WHERE room_type_amenities.room_type_id IN (:ids)", nativeQuery = true)
    public List<Amenity> getAmenitiesByRoomTypeIds(@Param("ids")List<Long> roomTypeIds);

    @Query(value = "select * from amenities", nativeQuery = true)
    public List<Amenity> getAllAmenities();
}
