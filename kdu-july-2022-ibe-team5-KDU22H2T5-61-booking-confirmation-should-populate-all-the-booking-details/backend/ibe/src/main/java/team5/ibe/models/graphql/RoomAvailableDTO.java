package team5.ibe.models.graphql;

import com.google.gson.annotations.SerializedName;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RoomAvailableDTO {
    @SerializedName("date")
    private String date;
    @SerializedName("booking_id")
    private Long bookingId;
    @SerializedName("availability_id")
    private Long availabilityId;
}
