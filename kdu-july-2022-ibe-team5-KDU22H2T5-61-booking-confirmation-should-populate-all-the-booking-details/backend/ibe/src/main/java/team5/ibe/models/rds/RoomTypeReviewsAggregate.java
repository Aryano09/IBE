package team5.ibe.models.rds;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RoomTypeReviewsAggregate implements Serializable {
    private List<RoomTypeReviewDTO> roomTypeReviewDTOList = new ArrayList<>();
    private ArrayList<Double> ratingsCountPercentage = Arrays.asList(new Double[5]).stream().collect(Collectors.toCollection(ArrayList::new));
}
