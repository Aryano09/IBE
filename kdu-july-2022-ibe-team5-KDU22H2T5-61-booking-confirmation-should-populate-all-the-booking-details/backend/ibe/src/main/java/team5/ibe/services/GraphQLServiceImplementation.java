package team5.ibe.services;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.reflect.TypeToken;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import team5.ibe.constants.GraphQL;
import team5.ibe.constants.Query;
import team5.ibe.models.RoomTypeDTO;
import team5.ibe.models.graphql.*;
import team5.ibe.models.graphql.mappers.NightlyRatesMapper;
import team5.ibe.models.graphql.mappers.PromotionMapper;
import team5.ibe.models.mappers.RoomTypeMapper;
import team5.ibe.utility.GraphQLUtility;

import java.lang.reflect.Type;
import java.time.*;
import java.util.*;
import java.util.stream.Collectors;

import static java.time.temporal.ChronoUnit.DAYS;

@Service
public class GraphQLServiceImplementation implements GraphQLService{
    @Autowired
    private GraphQLUtility graphQLUtility;
    @Autowired
    private Query queryObj;
    @Autowired
    private RoomTypeMapper roomTypeMapper;
    private static final Logger logger = LoggerFactory.getLogger(GraphQLServiceImplementation.class);
    private static final ObjectMapper objectMapper = new ObjectMapper();
    private static final Gson gson = new Gson();
    private static PromotionMapper promotionMapper = new PromotionMapper();
    private static final Mapper mapper = new Mapper();
    @Override
    public List<RoomTypeDTO> getAvailableRooms(Integer propertyId, String checkInDate, String checkOutDate, Integer maxCapacity, Integer beds, Integer rooms) throws JsonProcessingException {
        HashMap<Integer, Double> roomTypeToRoomRateMap = getRoomTypeToRoomRateMap(checkInDate);
        logger.debug("Printing roomTypeToRoomRateMap: {}", roomTypeToRoomRateMap);
//        logger.info("roomTypeToRoomRateMap: {}", roomTypeToRoomRateMap);
        HashMap<Integer, Integer> roomTypeAvailableCountOnCheckIn = new HashMap<>();
        String query = queryObj.getAvailableRooms(checkInDate, checkOutDate, maxCapacity, propertyId);
        String bodyString = graphQLUtility.graphQLQueryExecutor(query);
//        logger.info("availableRoomsJSON: {}", bodyString);
        return roomTypeMapper.toDTOList(bodyString, beds, checkInDate, roomTypeAvailableCountOnCheckIn, rooms, roomTypeToRoomRateMap, propertyId);
    }

    @Override
    public HashMap<Integer, Double> getRoomTypeToRoomRateMap(String checkInDate) {
        String listRoomRateQuery = queryObj.getRoomTypeToRoomRateMap(checkInDate);
        HashMap<Integer, Double> roomTypeToRoomRateMap = new HashMap<>();
        String listRoomRateJSON = graphQLUtility.graphQLQueryExecutor(listRoomRateQuery);
//        logger.info("roomTypeToRoomRateMapJSON: {}", bodyString);
        Gson gson = new Gson();
//        final String listRoomRateRoomTypeMappingsKey = "listRoomRateRoomTypeMappings";
//        final String roomTypeIdKey = "room_type_id";
//        final String roomRateKey = "room_rate";
//        final String basicNightlyRateKey = "basic_nightly_rate";
//        JsonArray listRoomRateRoomTypeMappings = data.get(listRoomRateRoomTypeMappingsKey).getAsJsonArray();
//        for(JsonElement roomTypeRoomRateElement: listRoomRateRoomTypeMappings){
//            JsonObject roomTypeRoomRate = roomTypeRoomRateElement.getAsJsonObject();
//            Integer roomTypeId = roomTypeRoomRate.get(roomTypeIdKey).getAsInt();
//            JsonObject roomRate = roomTypeRoomRate.get(roomRateKey).getAsJsonObject();
//            Double basicNightlyRate = roomRate.get(basicNightlyRateKey).getAsDouble();
//            roomTypeToRoomRateMap.put(roomTypeId, basicNightlyRate);
//        }

        ArrayList<ListRoomRateDTO> listRoomRateDTOS = mapper.toListRoomRateDTOs(listRoomRateJSON, gson);
        logger.debug("Printing listRoomRateDTOS: {}", listRoomRateDTOS);
        for(ListRoomRateDTO roomRateDTO: listRoomRateDTOS){
            logger.debug("Printing roomTypes inside: {}", roomRateDTO.getRoomTypes());
            for(ListRoomRateRoomTypeDTO roomRateRoomTypeDTO: roomRateDTO.getRoomTypes()){
                Integer roomTypeId = roomRateRoomTypeDTO.getRoomTypeId().intValue();
                roomTypeToRoomRateMap.put(roomTypeId, roomRateDTO.getBasicNightlyRate());
            }
        }
        return roomTypeToRoomRateMap;
    }

    @Override
    public String getTenantNameByTenantId(Integer tenantId) {
        String query = queryObj.getTenantNameByTenantId(tenantId);
        String body = graphQLUtility.graphQLQueryExecutor(query);
        logger.debug("Received body after executing query {} : {}",query,body);
        return body;
    }

    @Override
    public ArrayList<PromotionDTO> getPromotionsByMinimumDaysOfStay(String checkInDate, String checkOutDate) {
        LocalDate checkInLocalDate = graphQLUtility.getLocalDateFromString(checkInDate);
        LocalDate checkOutLocalDate = graphQLUtility.getLocalDateFromString(checkOutDate);
        DayOfWeek checkInDayOfWeek = checkInLocalDate.getDayOfWeek();
        Long duration = DAYS.between(checkInLocalDate, checkOutLocalDate);
        String getPromotionsByDurationQuery = queryObj.getPromotionsByMinimumDaysOfStay(duration);
        String promotionsJsonString = graphQLUtility.graphQLQueryExecutor(getPromotionsByDurationQuery);
        ArrayList<PromotionDTO> promotionDTOList = promotionMapper.toDTOList(promotionsJsonString, gson);
        promotionDTOList = filterStandardRatesInPromotions(promotionDTOList);
        for(Integer index = 0; index<promotionDTOList.size(); index++){
            PromotionDTO promotionDTO = promotionDTOList.get(index);
            String title = promotionDTO.getTitle();
            if(title.equals("Long weekend discount") || title.equals("Weekend discount")){
                logger.info("inside title {}", title);
                if(!graphQLUtility.isWeekendSpanning(checkInDayOfWeek.getValue(), duration)) {
                    promotionDTOList.remove(index.intValue());
                    index--;
                }
            }
        }
        return promotionDTOList.stream().sorted(Comparator.comparingDouble(PromotionDTO::getPriceFactor)).collect(Collectors.toCollection(ArrayList::new));
    }

    public ArrayList<PromotionDTO> filterStandardRatesInPromotions(ArrayList<PromotionDTO> promotionDTOList){
        ArrayList<PromotionDTO> standardRates = new ArrayList<>();
        HashSet<String> standardRatesTitles = GraphQL.standardRatesTitles();
        for(Integer index = 0; index<promotionDTOList.size(); index++){
            PromotionDTO promotionDTO = promotionDTOList.get(index);
            if(standardRatesTitles.contains(promotionDTO.getTitle())){
                standardRates.add(promotionDTO);
            }
        }
        return standardRates;
    }

    @Override
    public List<NightlyRatesDTO> getBasicNightlyRates(Long propertyId){
        String query = queryObj.getNightlyRates(propertyId);
        String body = graphQLUtility.graphQLQueryExecutor(query);
        logger.info("Received body after executing query {} : {}",query,body);
        Gson gson = new Gson();
        return NightlyRatesMapper.toDTOList(body, gson);
    }
}
