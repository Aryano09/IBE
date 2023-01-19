package team5.ibe.entities;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name="room_type_images")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RoomTypeImages {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "room_type_id")
    private Long roomTypeId;

//    @Column(name = "property_id")
//    private Long propertyId;

    @Column(name = "image_url")
    private String imageUrl;

    @Override
    public String toString() {
        return "RoomTypeImages{" +
                "roomTypeId=" + roomTypeId +
//                ", propertyId=" + propertyId +
                ", imageUrl='" + imageUrl + '\'' +
                '}';
    }
}
