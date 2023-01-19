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
public class RoomRateDetailsDTO {
    @SerializedName("basic_nightly_rate")
    private Double basicNightlyRate;

    @SerializedName("date")
    private String date;
}
