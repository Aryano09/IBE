package team5.ibe.entities;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "room_type_reviews")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RoomTypeReview implements Serializable {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "room_type_id")
    private Long roomTypeId;

    @Column(name = "description")
    private String description;

    @Column(name = "rating")
    private Long rating;

    @Column(name = "username")
    private String username;
}
