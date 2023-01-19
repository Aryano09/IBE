package team5.ibe.models.graphql;

import com.google.gson.annotations.SerializedName;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RoomDTO {
    @SerializedName("room_id")
    private Long roomId;
    @SerializedName("room_number")
    private Long roomNumber;
    @SerializedName("room_available")
    private List<RoomAvailableDTO> roomAvailableDTOList = new ArrayList<>();
}
