package team5.ibe.services;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.google.gson.JsonObject;
import org.springframework.stereotype.Service;
import team5.ibe.models.RoomTypeDTO;
import team5.ibe.models.graphql.NightlyRatesDTO;
import team5.ibe.models.graphql.PromotionDTO;

import java.util.HashMap;
import java.util.List;

public interface GraphQLService {
    List<RoomTypeDTO> getAvailableRooms(Integer propertyId, String checkInDate, String checkOutDate, Integer maxCapacity, Integer beds, Integer rooms) throws JsonProcessingException;

    HashMap<Integer, Double> getRoomTypeToRoomRateMap(String checkInDate);

    String getTenantNameByTenantId(Integer tenantId);

    List<PromotionDTO> getPromotionsByMinimumDaysOfStay(String checkInDate, String checkOutDate);

    List<NightlyRatesDTO> getBasicNightlyRates(Long propertyId);
}
