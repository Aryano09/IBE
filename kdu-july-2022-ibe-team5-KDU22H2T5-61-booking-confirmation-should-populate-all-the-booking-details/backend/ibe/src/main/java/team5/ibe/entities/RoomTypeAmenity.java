package team5.ibe.entities;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@IdClass(RoomTypeAmenityId.class)
@Table(name = "room_type_amenities")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RoomTypeAmenity implements Serializable {
    @Column(name = "room_type_id")
    @Id
    private Long roomTypeId;
    @Column(name = "amenity_id")
    @Id
    private Long amenityId;
}
