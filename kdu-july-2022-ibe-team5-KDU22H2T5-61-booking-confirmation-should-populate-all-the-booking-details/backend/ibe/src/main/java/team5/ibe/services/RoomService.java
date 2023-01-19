package team5.ibe.services;

import team5.ibe.models.RoomTypeImagesDTO;
import team5.ibe.models.rds.*;

import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;

public interface RoomService {

    void insertRoomTypeImagesList(List<RoomTypeImagesDTO> roomTypeImagesDTOList);

    List<AmenityDTO> getAllAmenities();

    LinkedHashMap<String, List<DealPackageDTO>> getDealsByMinimumDaysOfStay(String checkInDate, String checkOutDate);

    LinkedHashMap<String, LinkedHashMap<String, Double>> getRoomRatesByPropertyId(Long propertyId);

    String insertReviewByRoomTypeId(RoomTypeReviewDTO roomTypeReviewDTO);

    RoomTypeReviewsAggregate getReviewsByRoomTypeId(Long roomTypeId);

    HashMap<Long, RoomTypeRatingDTO> getRoomTypeRatings();
}
