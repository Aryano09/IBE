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
public class RoomTypeReviewDTO implements Serializable {
    private Long roomTypeId;
    private String description;
    private Long rating;
    private String username;
}
