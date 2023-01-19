package team5.ibe.models.graphql;

import com.google.gson.annotations.SerializedName;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ListRoomRateDTO {
    @SerializedName("basic_nightly_rate")
    private Double basicNightlyRate;

    @SerializedName("date")
    private String date;

    @SerializedName("room_rate_id")
    private Long roomRateId;

    @SerializedName("room_types")
    private List<ListRoomRateRoomTypeDTO> roomTypes = new ArrayList<>();
}
