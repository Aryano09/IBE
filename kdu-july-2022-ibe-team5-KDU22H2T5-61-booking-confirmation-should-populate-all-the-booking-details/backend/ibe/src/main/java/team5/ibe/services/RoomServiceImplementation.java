package team5.ibe.services;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import team5.ibe.constants.Query;
import team5.ibe.entities.Amenity;
import team5.ibe.entities.DealPackage;
import team5.ibe.entities.RoomTypeImages;
import team5.ibe.entities.RoomTypeReview;
import team5.ibe.models.RoomTypeImagesDTO;
import team5.ibe.models.graphql.*;
import team5.ibe.models.graphql.Mapper;
import team5.ibe.models.mappers.RoomTypeImagesMapper;
import team5.ibe.models.rds.*;
import team5.ibe.models.rds.mappers.AmenityMapper;
import team5.ibe.models.rds.mappers.DealPackageMapper;
import team5.ibe.repositories.AmenityRepository;
import team5.ibe.repositories.DealPackageRepository;
import team5.ibe.repositories.RoomTypeImagesRepository;
import team5.ibe.repositories.RoomTypeReviewsRepository;
import team5.ibe.utility.GraphQLUtility;

import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

import static java.time.temporal.ChronoUnit.DAYS;

@Service
public class RoomServiceImplementation implements RoomService{
    private final Logger logger = LoggerFactory.getLogger(RoomServiceImplementation.class);
    private static DealPackageMapper dealPackageMapper = new DealPackageMapper();
    @Autowired
    private RoomTypeImagesRepository roomTypeImagesRepository;
    @Autowired
    private RoomTypeImagesMapper roomTypeImagesMapper;
    @Autowired
    private AmenityRepository amenityRepository;
    @Autowired
    private DealPackageRepository dealPackageRepository;
    @Autowired
    private GraphQLUtility graphQLUtility;
    @Autowired
    private RoomTypeReviewsRepository roomTypeReviewsRepository;

    private static AmenityMapper amenityMapper = new AmenityMapper();
    private static Mapper mapper = new Mapper();
    private static team5.ibe.models.rds.Mapper rdsMapper = new team5.ibe.models.rds.Mapper();
    @Override
    public void insertRoomTypeImagesList(List<RoomTypeImagesDTO> roomTypeImagesDTOList) {
        for(RoomTypeImagesDTO roomTypeImagesDTO: roomTypeImagesDTOList){
            for(String imageUrl: roomTypeImagesDTO.getImageUrls()){
                RoomTypeImages roomTypeImages = roomTypeImagesMapper.fromDTO(roomTypeImagesDTO, imageUrl);
                logger.debug("Inserting roomTypeImage\n{}", roomTypeImages);
                roomTypeImagesRepository.save(roomTypeImages);
            }
        }
    }

    @Override
    public List<AmenityDTO> getAllAmenities() {
        List<Amenity> amenityList = amenityRepository.getAllAmenities();
        List<AmenityDTO> amenityDTOList = new ArrayList<>();
        amenityList.stream().forEach(obj -> amenityDTOList.add(amenityMapper.toDTO(obj)));
        return amenityDTOList;
    }

    @Override
    public LinkedHashMap<String, List<DealPackageDTO>> getDealsByMinimumDaysOfStay(String checkInDate, String checkOutDate) {
        LocalDate checkInLocalDate = graphQLUtility.getLocalDateFromString(checkInDate);
        LocalDate checkOutLocalDate = graphQLUtility.getLocalDateFromString(checkOutDate);
        Long duration = DAYS.between(checkInLocalDate, checkOutLocalDate);
        List<DealPackage> dealPackageList = dealPackageRepository.getDealsByMinimumDaysOfStay(duration);
        HashMap<String, Long> promotionTitleToIdMap = syncPromotionsOnGraphQL(dealPackageList);
        logger.info("promotionTitleToIdMap", promotionTitleToIdMap);
        dealPackageList = dealPackageList.stream().sorted(Comparator.comparingDouble(DealPackage::getPriceFactor)).collect(Collectors.toCollection(ArrayList::new));
        LinkedHashMap<String, List<DealPackageDTO>> dealPackageDTOLinkedHashMap = new LinkedHashMap<>();
//        final String kidsDealsKey = "kids";
//        final String mealDealsKey = "meals";
//        dealPackageDTOLinkedHashMap.put(kidsDealsKey, new ArrayList<>());
//        dealPackageDTOLinkedHashMap.put(mealDealsKey, new ArrayList<>());
        for(DealPackage dealPackage: dealPackageList){
            String category = dealPackage.getCategory();
            if(dealPackageDTOLinkedHashMap.containsKey(category) == false){
                dealPackageDTOLinkedHashMap.put(category, new ArrayList<>());
            }
            DealPackageDTO dealPackageDTO = dealPackageMapper.toDTO(dealPackage, promotionTitleToIdMap.get(dealPackage.getTitle()));
            if(dealPackageDTO.getTitle().toLowerCase().contains("dining")) {
                dealPackageDTOLinkedHashMap.get(category).add(dealPackageDTO);
            }
            else if(dealPackageDTO.getTitle().toLowerCase().contains("kids")) {
                dealPackageDTOLinkedHashMap.get(category).add(dealPackageDTO);
            }
        }
        return dealPackageDTOLinkedHashMap;
    }

    public HashMap<String, Long> syncPromotionsOnGraphQL(List<DealPackage> dealPackageList){
        String getAllPromotionsQuery = Query.getAllPromotions();
        String getAllPromotionsJSON = graphQLUtility.graphQLQueryExecutor(getAllPromotionsQuery);
        HashMap<String, Long> promotionTitleToIdMap = new HashMap<>();
        ArrayList<PromotionDTO> promotionDTOS = mapper.toPromotionsDTOList(getAllPromotionsJSON, new Gson());
        for(Integer index = 0; index<promotionDTOS.size(); index++){
            PromotionDTO promotionDTO = promotionDTOS.get(index);
            promotionTitleToIdMap.put(promotionDTO.getTitle(), promotionDTO.getPromotionId());
        }
        for(DealPackage dealPackage: dealPackageList){
            if(promotionTitleToIdMap.containsKey(dealPackage.getTitle()) == false){
                String createPromotionQuery = Query.createPromotion(dealPackage);
                String createPromotionQueryJSON = graphQLUtility.graphQLQueryExecutor(createPromotionQuery);
                Gson gson = new Gson();
                JsonObject body = gson.fromJson(createPromotionQueryJSON, JsonObject.class);
                JsonObject data = body.get("data").getAsJsonObject();
                JsonObject createPromotion = data.get("createPromotion").getAsJsonObject();
                PromotionDTO promotionDTO = gson.fromJson(createPromotion.toString(), PromotionDTO.class);
                promotionTitleToIdMap.put(promotionDTO.getTitle(), promotionDTO.getPromotionId());
            }
        }
        return promotionTitleToIdMap;
    }

    @Override
    public LinkedHashMap<String, LinkedHashMap<String, Double>> getRoomRatesByPropertyId(Long propertyId) {
        String query = Query.getRoomRatesByPropertyId(propertyId);
        String responseJson = graphQLUtility.graphQLQueryExecutor(query);
        ArrayList<RoomTypeRoomRateDTO> roomTypeRoomRateDTOS = mapper.getRoomTypeRoomRateDtoList(responseJson);
        LinkedHashMap<String, LinkedHashMap<String, Double>> roomTypeNameToRoomRateByDateMap = new LinkedHashMap<>();
        for(RoomTypeRoomRateDTO roomTypeRoomRateDTO: roomTypeRoomRateDTOS){
            LinkedHashMap<String, Double> dateToRoomRateMap = new LinkedHashMap<>();
            for(RoomRateDTO roomRateDTO: roomTypeRoomRateDTO.getRoomRates()){
                RoomRateDetailsDTO roomRateDetailsDTO = roomRateDTO.getRoomRateDetails();
                dateToRoomRateMap.put(roomRateDetailsDTO.getDate(), roomRateDetailsDTO.getBasicNightlyRate());
            }
            roomTypeNameToRoomRateByDateMap.put(roomTypeRoomRateDTO.getRoomTypeName(), dateToRoomRateMap);
        }
        return roomTypeNameToRoomRateByDateMap;
    }

    @Override
    public String insertReviewByRoomTypeId(RoomTypeReviewDTO roomTypeReviewDTO) {
        RoomTypeReview roomTypeReview = rdsMapper.fromRoomTypeReviewDTO(roomTypeReviewDTO);
        try {
            roomTypeReviewsRepository.save(roomTypeReview);
//            return "Review inserted successfully";
            return "OK";
        }
        catch (Exception e){
            logger.info("Exception: {}", e.getMessage());
//            return "Problem occurred in inserting review";
            return "ERROR";
        }

    }

    @Override
    public RoomTypeReviewsAggregate getReviewsByRoomTypeId(Long roomTypeId) {
        RoomTypeReviewsAggregate roomTypeReviewsAggregate = new RoomTypeReviewsAggregate();
        List<Double> ratingsCountPercentage = roomTypeReviewsAggregate.getRatingsCountPercentage();
        List<RoomTypeReview> roomTypeReviewList = roomTypeReviewsRepository.getReviewsByRoomTypeId(roomTypeId);
        Long totalReviews = Long.valueOf(roomTypeReviewList.size());
        for(int i=1; i<=5; i++){
            int finalI = i;
            Long count = Long.valueOf(roomTypeReviewList.stream().filter(obj -> obj.getRating().intValue() == finalI).collect(Collectors.toList()).size());
            Double percentage = count.doubleValue() / totalReviews.doubleValue();
            if(percentage > 0){
                ratingsCountPercentage.set(i-1, (percentage * 100D));
            }
            else {
                ratingsCountPercentage.set(i-1, 0.0);
            }
        }
        List<RoomTypeReviewDTO> roomTypeReviewDTOList = roomTypeReviewList.stream().map(obj -> rdsMapper.toRoomTypeReviewDTO(obj)).collect(Collectors.toList());
        roomTypeReviewsAggregate.setRoomTypeReviewDTOList(roomTypeReviewDTOList);
        return roomTypeReviewsAggregate;
    }

    @Override
    public HashMap<Long, RoomTypeRatingDTO> getRoomTypeRatings() {
        HashMap<Long, RoomTypeRatingDTO> roomTypeRatingDTOHashMap = new HashMap<>();
        List<RoomTypeReview> roomTypeReviewList = roomTypeReviewsRepository.getAllRoomTypeReviews();
        for(RoomTypeReview roomTypeReview: roomTypeReviewList){
            Long roomTypeId = roomTypeReview.getRoomTypeId();
            if(roomTypeRatingDTOHashMap.containsKey(roomTypeId) == false){
                RoomTypeRatingDTO roomTypeRatingDTO = RoomTypeRatingDTO.builder()
                        .roomTypeId(roomTypeId)
                        .averageRating(roomTypeReview.getRating().doubleValue())
                        .count(Long.valueOf(1))
                        .build();
                roomTypeRatingDTOHashMap.put(roomTypeId, roomTypeRatingDTO);
            }
            else {
                Double oldRating = roomTypeRatingDTOHashMap.get(roomTypeId).getAverageRating();
                Long oldCount = roomTypeRatingDTOHashMap.get(roomTypeId).getCount();
                RoomTypeRatingDTO roomTypeRatingDTO = RoomTypeRatingDTO.builder()
                        .roomTypeId(roomTypeId)
                        .averageRating(roomTypeReview.getRating().doubleValue() + oldRating)
                        .count(oldCount + 1)
                        .build();
                roomTypeRatingDTOHashMap.put(roomTypeId, roomTypeRatingDTO);
            }
        }
        for(Map.Entry<Long, RoomTypeRatingDTO> roomTypeRatingDTO: roomTypeRatingDTOHashMap.entrySet()){
            roomTypeRatingDTO.getValue().setAverageRating(roomTypeRatingDTO.getValue().getAverageRating()/roomTypeRatingDTO.getValue().getCount());
        }
        return roomTypeRatingDTOHashMap;
    }
}
