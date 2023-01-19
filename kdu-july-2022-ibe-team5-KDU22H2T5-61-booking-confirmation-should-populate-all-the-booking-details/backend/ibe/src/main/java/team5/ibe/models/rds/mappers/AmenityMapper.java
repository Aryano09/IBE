package team5.ibe.models.rds.mappers;

import team5.ibe.entities.Amenity;
import team5.ibe.models.rds.AmenityDTO;

public class AmenityMapper {

    public AmenityDTO toDTO(Amenity amenity){
        return AmenityDTO.builder()
                .id(amenity.getId())
                .name(amenity.getName())
                .build();
    }
}
