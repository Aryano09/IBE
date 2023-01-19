package team5.ibe.models.mappers;

import org.springframework.stereotype.Component;
import team5.ibe.entities.RoomTypeImages;
import team5.ibe.models.RoomTypeImagesDTO;

@Component
public class RoomTypeImagesMapper {

    public RoomTypeImages fromDTO(RoomTypeImagesDTO roomTypeImagesDTO, String imageUrl){
        return RoomTypeImages.builder()
                .roomTypeId(roomTypeImagesDTO.getRoomTypeId())
//                .propertyId(roomTypeImagesDTO.getPropertyId())
                .imageUrl(imageUrl)
                .build();
    }
}
