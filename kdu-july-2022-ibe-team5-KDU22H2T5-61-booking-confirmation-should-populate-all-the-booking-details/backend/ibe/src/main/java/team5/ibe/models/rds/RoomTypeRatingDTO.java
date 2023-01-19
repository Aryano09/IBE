package team5.ibe.models.rds;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RoomTypeRatingDTO implements Serializable {
    private Long roomTypeId;
    private Double averageRating;
    private Long count;
}
