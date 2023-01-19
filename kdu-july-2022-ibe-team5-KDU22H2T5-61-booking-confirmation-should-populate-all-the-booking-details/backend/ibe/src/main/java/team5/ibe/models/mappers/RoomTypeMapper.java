package team5.ibe.models.mappers;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import team5.ibe.entities.*;
import team5.ibe.models.RoomTypeDTO;
import team5.ibe.repositories.*;

import java.util.*;
import java.util.stream.Collectors;

@Component
public class RoomTypeMapper {
    @Autowired
    private RoomTypeImagesRepository roomTypeImagesRepository;
    @Autowired
    private RoomTypeRepository roomTypeRepository;
    @Autowired
    private AmenityRepository amenityRepository;
    @Autowired
    private RoomTypeAmenityRepository roomTypeAmenityRepository;
    @Autowired
    private DescriptionRepository descriptionRepository;

    private final static Logger logger = LoggerFactory.getLogger(RoomTypeMapper.class);

    public RoomTypeDTO toDTO(String roomTypeName, Double roomTypeArea, Integer roomTypeMaxCapacity, Integer roomTypeSingleBeds, Integer roomTypeDoubleBeds, HashMap<Integer, Double> roomTypeToRoomRateMap, Integer roomTypeId){
        return RoomTypeDTO.builder()
                .roomTypeId(roomTypeId)
                .name(roomTypeName)
                .area(roomTypeArea)
                .maxCapacity(roomTypeMaxCapacity)
                .singleBed(roomTypeSingleBeds)
                .doubleBed(roomTypeDoubleBeds)
                .basicNightlyRate(roomTypeToRoomRateMap.get(roomTypeId))
                .imageUrls(null)
                .build();
    }

    public List<RoomTypeDTO> toDTOList(String bodyString, Integer beds, String checkInDate, HashMap<Integer, Integer> roomTypeAvailableCountOnCheckIn, Integer rooms, HashMap<Integer, Double> roomTypeToRoomRateMap, Integer propertyId){
        List<RoomTypeDTO> roomTypes = new ArrayList<>();
        Set<String> roomTypeNames = new HashSet<>();
        List<Integer> roomTypeIds = new ArrayList<>();
        HashMap<String, Integer> roomTypeNameToIdMap = new HashMap<>();
        Gson gson = new Gson();
        JsonObject body = gson.fromJson(bodyString, JsonObject.class);
        JsonObject data = body.get("data").getAsJsonObject();
        final String listRoomAvailabilitiesKey = "listRoomAvailabilities";
        final String roomKey = "room";
        final String roomTypeKey = "room_type";
        final String roomTypeDoubleBedsKey = "double_bed";
        final String roomTypeSingleBedsKey = "single_bed";
        final String roomTypeAreaKey = "area_in_square_feet";
        final String roomTypeMaxCapacityKey = "max_capacity";
        final String roomTypeNameKey = "room_type_name";
        final String roomTypeIdKey = "room_type_id";
        final String dateKey = "date";
        JsonArray listRoomAvailabilities = data.get(listRoomAvailabilitiesKey).getAsJsonArray();
        logger.debug("Printing listRoomAvailabilities: {}", listRoomAvailabilities);
        for(JsonElement roomAvailability: listRoomAvailabilities){
            JsonObject availability = roomAvailability.getAsJsonObject();
            JsonObject room = availability.get(roomKey).getAsJsonObject();
            JsonObject roomType = room.get(roomTypeKey).getAsJsonObject();
            Integer roomTypeDoubleBeds = roomType.get(roomTypeDoubleBedsKey).getAsInt();
            Integer roomTypeSingleBeds = roomType.get(roomTypeSingleBedsKey).getAsInt();
            if((roomTypeSingleBeds + roomTypeDoubleBeds) >= beds){
                Double roomTypeArea = roomType.get(roomTypeAreaKey).getAsDouble();
                Integer roomTypeMaxCapacity = roomType.get(roomTypeMaxCapacityKey).getAsInt();
                String roomTypeName = roomType.get(roomTypeNameKey).getAsString();
                Integer roomTypeId = room.get(roomTypeIdKey).getAsInt();
                if(availability.get(dateKey).getAsString().equals(checkInDate)){
                    if(roomTypeAvailableCountOnCheckIn.containsKey(roomTypeId)){
                        roomTypeAvailableCountOnCheckIn.put(roomTypeId, roomTypeAvailableCountOnCheckIn.get(roomTypeId) + 1);
                    }
                    else{
                        roomTypeAvailableCountOnCheckIn.put(roomTypeId, 1);
                    }
                }
                logger.debug("Present roomTypeAvailableCountOnCheckIn: {}", roomTypeAvailableCountOnCheckIn);
                logger.debug("Present roomTypeId: {}\n", roomTypeId);
                if(roomTypeAvailableCountOnCheckIn.containsKey(roomTypeId) && roomTypeAvailableCountOnCheckIn.get(roomTypeId)>=rooms && !roomTypeNames.contains(roomTypeName)){
                    RoomTypeDTO roomTypeDTO = this.toDTO(roomTypeName, roomTypeArea, roomTypeMaxCapacity, roomTypeSingleBeds, roomTypeDoubleBeds, roomTypeToRoomRateMap, roomTypeId);
                    roomTypeNames.add(roomTypeName);
                    roomTypeIds.add(roomTypeId);
                    roomTypeNameToIdMap.put(roomTypeName, roomTypeId);
                    roomTypes.add(roomTypeDTO);
                }
            }
        }
        logger.debug("roomTypeNames: {}", roomTypeNames);
        logger.debug("roomTypeIds: {}", roomTypeIds);
        logger.debug("roomTypeNameToIdMap: {}", roomTypeNameToIdMap);
        logger.debug("roomTypes: {}", roomTypes);

        Long time;

        time = System.currentTimeMillis();
        List<RoomType> roomTypesList = roomTypeRepository.getFilteredRoomTypes(Long.valueOf(1), propertyId.longValue(), roomTypeIds);
        Set<Long> roomTypesIds = new HashSet<>();
        roomTypesList.stream().forEach(obj -> roomTypesIds.add(obj.getId()));
        logger.debug("roomTypesList: {}", roomTypesList);
        logger.debug("roomTypesIds: {}", roomTypesIds);
        System.out.println("room types fetch time : " + (System.currentTimeMillis() - time));

        time = System.currentTimeMillis();
        List<RoomTypeImages> roomTypeImagesList = roomTypeImagesRepository.getRoomTypeImagesByRoomTypeIds(roomTypesIds);
        logger.debug("roomTypeImagesList: {}", roomTypeImagesList);
        System.out.println("images fetch time : " + (System.currentTimeMillis() - time));

        time = System.currentTimeMillis();
        List<RoomTypeAmenity> roomTypeAmenityList = roomTypeAmenityRepository.getRoomTypeAmenities(roomTypesIds);
        logger.debug("roomTypeAmenityList: {}", roomTypeAmenityList);
        System.out.println("room type amenity fetch time : " + (System.currentTimeMillis() - time));

        time = System.currentTimeMillis();
        List<Description> descriptionList = descriptionRepository.getAllDescriptions();
        logger.info("descriptionList: {}", descriptionList);
        System.out.println("descriptions fetch time: " + (System.currentTimeMillis() - time));

        for(RoomTypeDTO roomTypeDTO: roomTypes){
            System.out.println("NEW OBJ\n");
            Integer id = roomTypeNameToIdMap.get(roomTypeDTO.getName());
            time = System.currentTimeMillis();
            RoomType roomType = roomTypesList.stream().filter(obj -> obj.getRoomTypeId()==id.longValue()).collect(Collectors.toList()).get(0);
            System.out.println("room type filter time : " + (System.currentTimeMillis() - time));

            time = System.currentTimeMillis();
            List<String> imageUrls = roomTypeImagesList.stream().filter(obj -> obj.getRoomTypeId() == roomType.getId()).map(obj -> obj.getImageUrl()).collect(Collectors.toList());
            roomTypeDTO.setImageUrls(imageUrls);
            System.out.println("images set time : " + (System.currentTimeMillis() - time));

            time = System.currentTimeMillis();
            roomTypeDTO.setAmenityIds(roomTypeAmenityList.stream().filter(obj -> obj.getRoomTypeId()==roomType.getId()).map(obj -> obj.getAmenityId()).collect(Collectors.toList()));
            System.out.println("amenities set time : " + (System.currentTimeMillis() - time));

            time = System.currentTimeMillis();
            Long descriptionId = roomType.getDescriptionId();
            roomTypeDTO.setDescription(descriptionList.stream().filter(obj -> obj.getId()==descriptionId).map(obj -> obj.getDescription()).collect(Collectors.toList()).get(0));
            System.out.println("description set time : " + (System.currentTimeMillis() - time));
        }
        return roomTypes;
    }
}
