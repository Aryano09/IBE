package team5.ibe.entities;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.Objects;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RoomTypeAmenityId implements Serializable {
    private Long roomTypeId;
    private Long amenityId;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof RoomTypeAmenityId)) return false;
        RoomTypeAmenityId that = (RoomTypeAmenityId) o;
        return Objects.equals(getRoomTypeId(), that.getRoomTypeId()) && Objects.equals(getAmenityId(), that.getAmenityId());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getRoomTypeId(), getAmenityId());
    }
}
