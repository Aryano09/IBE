package team5.ibe.models.graphql;

import com.google.gson.annotations.SerializedName;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RoomTypeRoomRateDTO {
    @SerializedName("room_type_id")
    private Long roomTypeId;

    @SerializedName("room_type_name")
    private String roomTypeName;

    @SerializedName("room_rates")
    private List<RoomRateDTO> roomRates;
}
