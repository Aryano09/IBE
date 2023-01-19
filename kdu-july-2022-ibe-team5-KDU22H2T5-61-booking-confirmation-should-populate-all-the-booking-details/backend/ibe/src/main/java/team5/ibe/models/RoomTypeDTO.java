package team5.ibe.models;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class RoomTypeDTO implements Serializable {
    private Integer roomTypeId;
    private Double area;
    private Integer doubleBed;
    private Integer maxCapacity;
    private String name;
    private Integer singleBed;
    private Double basicNightlyRate;
    private List<String> imageUrls = new ArrayList<>();
    private String description;
//    private List<String> amenities = new ArrayList<>();
    private List<Long> amenityIds = new ArrayList<>();
}
