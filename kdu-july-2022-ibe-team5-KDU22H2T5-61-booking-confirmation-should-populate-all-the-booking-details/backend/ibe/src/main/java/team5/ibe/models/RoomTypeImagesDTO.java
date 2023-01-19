package team5.ibe.models;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RoomTypeImagesDTO implements Serializable {
    private Long roomTypeId;
    private Long propertyId;
    private List<String> imageUrls = new ArrayList<>();
}
