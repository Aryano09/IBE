package team5.ibe.models.graphql;

import com.google.gson.annotations.SerializedName;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ListRoomRateRoomTypeDTO {
    @SerializedName("room_type_id")
    private Long roomTypeId;

    @SerializedName("room_rate_id")
    private Long roomRateId;
}
