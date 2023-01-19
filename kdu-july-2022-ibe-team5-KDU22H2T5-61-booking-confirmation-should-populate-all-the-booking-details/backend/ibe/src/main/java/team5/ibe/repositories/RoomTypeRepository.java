package team5.ibe.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import team5.ibe.entities.RoomType;

import java.util.List;

@Repository
public interface RoomTypeRepository extends JpaRepository<RoomType, Long> {
    @Query(value = "select * from room_types where tenant_id=:tenantId and property_id=:propertyId and room_type_id in (:ids)", nativeQuery = true)
    public List<RoomType> getFilteredRoomTypes(@Param("tenantId")Long tenantId, @Param("propertyId")Long propertyId,
                                               @Param("ids")List<Integer> roomTypeIds);
}
