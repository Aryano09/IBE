package team5.ibe.services;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.CannotAcquireLockException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import team5.ibe.constants.EnvironmentVariables;
import team5.ibe.constants.Query;
import team5.ibe.entities.*;
import team5.ibe.models.emailjs.TemplateParamDTO;
import team5.ibe.models.graphql.BookingDTO;
import team5.ibe.models.graphql.Mapper;
import team5.ibe.models.graphql.RoomAvailableDTO;
import team5.ibe.models.graphql.RoomDTO;
import team5.ibe.repositories.*;
import team5.ibe.utility.EncryptionUtility;
import team5.ibe.utility.GraphQLUtility;
import team5.ibe.utility.LockByKey;

import javax.crypto.BadPaddingException;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;
import javax.crypto.SecretKey;
import javax.crypto.spec.IvParameterSpec;
import java.security.InvalidAlgorithmParameterException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.sql.SQLIntegrityConstraintViolationException;
import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class BookingServiceImplementation implements BookingService {
    @Autowired
    private GraphQLUtility graphQLUtility;
    @Autowired
    private GuestRepository guestRepository;
    @Autowired
    private BillingInfoRepository billingInfoRepository;
    @Autowired
    private BookingStatusRepository bookingStatusRepository;
    @Autowired
    private BookingRepository bookingRepository;
    @Autowired
    private BookingAvailabilityRepository bookingAvailabilityRepository;
    @Autowired
    private GuestService guestService;
    @Autowired
    private EnvironmentVariables environmentVariables;
    @Autowired
    private EncryptionUtility encryptionUtility;
    @Autowired
    private BookingThreadRepository bookingThreadRepository;
    @Autowired
    private ConcurrentBookingThreadRepository concurrentBookingThreadRepository;

    private static final Mapper mapper = new Mapper();
    private static final team5.ibe.models.rds.Mapper rdsMapper = new team5.ibe.models.rds.Mapper();
    private static final Logger logger = LoggerFactory.getLogger(BookingServiceImplementation.class);

    private static final RestTemplate restTemplate = new RestTemplate();

//    private void updateBookingThread(Long roomTypeId) throws InterruptedException {
//        boolean flag = true;
//        while (flag){
//            try{
////                bookingThreadRepository.save(BookingThread.builder().roomTypeId(roomTypeId).inUse(true).build());
//                bookingThreadRepository.insertNewRecord(roomTypeId, true);
//                logger.info("Writing thread for room type id: {}", roomTypeId);
//                flag = false;
//            }
//            catch (DataIntegrityViolationException e){
//                logger.info("Waiting thread for room type id: {}", roomTypeId);
//                flag = true;
//            }
//            catch (CannotAcquireLockException e){
//                logger.info("Waiting thread for room type id: {}", roomTypeId);
//                flag = true;
//            }
//        }
////        logger.info("thread for bookingThreadRepository.existsById(roomTypeId): {}", bookingThreadRepository.existsById(roomTypeId));
////        while(bookingThreadRepository.existsById(roomTypeId)){
////            logger.info("Waiting thread for room type id: {}", roomTypeId);
////            Thread.sleep(1000);
////        }
////
////        bookingThreadRepository.save(BookingThread.builder().roomTypeId(roomTypeId).inUse(true).build());
////        logger.info("Writing thread for room type id: {}", roomTypeId);
//
//    }
    private void updateConcurrentBookingThread(String key) throws InterruptedException {
        boolean flag = true;
        while (flag){
            try{
    //                bookingThreadRepository.save(BookingThread.builder().roomTypeId(roomTypeId).inUse(true).build());
                concurrentBookingThreadRepository.insertNewRecord(key);
                logger.info("Writing thread for key: {}", key);
                flag = false;
            }
            catch (DataIntegrityViolationException e){
                logger.info("Waiting thread for key: {}", key);
                flag = true;
            }
            catch (CannotAcquireLockException e){
                logger.info("Waiting thread for for key: {}", key);
                flag = true;
            }
        }
    //        logger.info("thread for bookingThreadRepository.existsById(roomTypeId): {}", bookingThreadRepository.existsById(roomTypeId));
    //        while(bookingThreadRepository.existsById(roomTypeId)){
    //            logger.info("Waiting thread for room type id: {}", roomTypeId);
    //            Thread.sleep(1000);
    //        }
    //
    //        bookingThreadRepository.save(BookingThread.builder().roomTypeId(roomTypeId).inUse(true).build());
    //        logger.info("Writing thread for room type id: {}", roomTypeId);

    }
    @Override
    public String[] createBooking(BookingDTO bookingDTO) throws InvalidAlgorithmParameterException, NoSuchPaddingException, IllegalBlockSizeException, NoSuchAlgorithmException, BadPaddingException, InvalidKeyException, InterruptedException {
        String key = bookingDTO.getPropertyId().toString()+":"+bookingDTO.getRoomTypeId().toString();
        String lockKey = bookingDTO.getPropertyId().toString()+":"+bookingDTO.getRoomTypeId().toString();
//        LockByKey lockByKey = new LockByKey();
        String encryptedBookingId;
        Long bookingId;
//        Optional<BookingThread> optionalBookingThread = bookingThreadRepository.findById(bookingDTO.getRoomTypeId());
//        if(optionalBookingThread.isPresent()){
//            while (optionalBookingThread.get().getInUse().equals(true)){
//                Thread.sleep(1000);
//            }
//        }
        LocalDate checkInLocalDate = graphQLUtility.getLocalDateFromString(bookingDTO.getCheckInDate());
        LocalDate checkOutLocalDate = graphQLUtility.getLocalDateFromString(bookingDTO.getCheckOutDate());
        LocalDate date = checkInLocalDate;
        String dateISO = graphQLUtility.getStringFromLocalDate(date);
        String checkOutDateISO = graphQLUtility.getStringFromLocalDate(checkOutLocalDate);
        logger.debug("dateISO: {}\tcheckOutDateISO: {}", dateISO, checkOutDateISO);
        LinkedHashSet<String> stayDurationDates = new LinkedHashSet<>();
        while (dateISO.equals(checkOutDateISO) == false) {
            stayDurationDates.add(dateISO);
            updateConcurrentBookingThread(lockKey+":"+dateISO);
            date = date.plusDays(1);
            dateISO = graphQLUtility.getStringFromLocalDate(date);
        }
        try {
//            updateBookingThread(bookingDTO.getRoomTypeId());
//            bookingThreadRepository.updateThreadByRoomTypeId(bookingDTO.getRoomTypeId(), true);
//            lockByKey.lock(key);
            Long guestId = guestService.createGuest(bookingDTO.getGuestDTO());
            bookingDTO.setGuestId(guestId);
            bookingDTO.getBillingInfoDTO().setGuestId(guestId);
            bookingDTO.setBillingInfoId(guestService.createBillingInfo(bookingDTO.getBillingInfoDTO()));
            String roomIdsByRoomTypeIdQuery = Query.getRoomIdsByRoomTypeId(bookingDTO.getRoomTypeId(), bookingDTO.getPropertyId());
            String roomIdsByRoomTypeIdJSON = graphQLUtility.graphQLQueryExecutor(roomIdsByRoomTypeIdQuery);
            ArrayList<RoomDTO> rooms = mapper.getRoomsFromListRoomsJSON(roomIdsByRoomTypeIdJSON);
//            logger.info("{}", rooms.stream().map(obj -> obj.getRoomNumber()).collect(Collectors.toList()));
//            LocalDate checkInLocalDate = graphQLUtility.getLocalDateFromString(bookingDTO.getCheckInDate());
//            LocalDate checkOutLocalDate = graphQLUtility.getLocalDateFromString(bookingDTO.getCheckOutDate());
//            LocalDate date = checkInLocalDate;
//            String dateISO = graphQLUtility.getStringFromLocalDate(date);
//            String checkOutDateISO = graphQLUtility.getStringFromLocalDate(checkOutLocalDate);
//            logger.debug("dateISO: {}\tcheckOutDateISO: {}", dateISO, checkOutDateISO);
//            LinkedHashSet<String> stayDurationDates = new LinkedHashSet<>();
//            while (dateISO.equals(checkOutDateISO) == false) {
//                stayDurationDates.add(dateISO);
//                date = date.plusDays(1);
//                dateISO = graphQLUtility.getStringFromLocalDate(date);
//            }
            logger.debug("stayDurationDates: {}", stayDurationDates);
            List<RoomDTO> availableRoomsResult = new ArrayList<>();
            HashSet<Long> bookingAvailabilityIds = new HashSet<>();
            for (RoomDTO room : rooms) {
                HashSet<Long> roomAvailabilityIds = new HashSet<>();
                boolean flag = true;
                for (RoomAvailableDTO roomAvailableDTO : room.getRoomAvailableDTOList()) {
                    String getDateWithoutZ = roomAvailableDTO.getDate().trim().split("\\.")[0];
                    String getDate = getDateWithoutZ + "Z";
                    if (stayDurationDates.contains(getDate) && roomAvailableDTO.getBookingId() != 0) {
                        flag = false;
                        break;
                    }
                    if (stayDurationDates.contains(getDate)) {
                        roomAvailabilityIds.add(roomAvailableDTO.getAvailabilityId());
                    }
                }
                logger.debug("roomAvailabilityIds: {}", roomAvailabilityIds);
                if (flag == true) {
                    availableRoomsResult.add(room);
                    bookingAvailabilityIds.addAll(roomAvailabilityIds);
                } else {
                    bookingAvailabilityIds.removeAll(roomAvailabilityIds);
                }
                if (availableRoomsResult.size() == bookingDTO.getRoomCount()) break;
            }
            if (availableRoomsResult.size() != bookingDTO.getRoomCount()) {
//                lockByKey.unlock(key);
                logger.info("Required no of rooms not available.");
//                bookingThreadRepository.updateThreadByRoomTypeId(bookingDTO.getRoomTypeId(), false);
//                bookingThreadRepository.deleteThreadByRoomTypeId(bookingDTO.getRoomTypeId());
                stayDurationDates.stream().forEach(obj -> {
                    concurrentBookingThreadRepository.deleteRecordByKey(lockKey+":"+obj);
                    logger.info("Deleted thread for key: {}", lockKey+obj);
                });
//                logger.info("Deleted thread for room type id: {}", bookingDTO.getRoomTypeId());
                return new String[]{Long.valueOf(-1).toString(), Long.valueOf(-1).toString()};
            }
            logger.debug("availableRoomsResult: {}", availableRoomsResult.stream().map(obj -> obj.getRoomNumber()).collect(Collectors.toList()));
            logger.debug("bookingAvailabilityIds: {}", bookingAvailabilityIds);
            String createManyBookingsQuery = Query.createManyBookings(bookingDTO);
            logger.debug("createManyBookingsQuery: {}", createManyBookingsQuery);
            String createManyBookingsQueryJSON = graphQLUtility.graphQLQueryExecutor(createManyBookingsQuery);
            logger.debug("createManyBookingsQueryJSON: {}", createManyBookingsQueryJSON);
            String getBookingIdQuery = Query.getBookingId(bookingDTO);
            String getBookingIdQueryJSON = graphQLUtility.graphQLQueryExecutor(getBookingIdQuery);
            Gson gson = new Gson();
            JsonObject body = gson.fromJson(getBookingIdQueryJSON, JsonObject.class);
            logger.debug("body: {}", body);
            JsonObject data = body.get("data").getAsJsonObject();
            JsonArray listBookings = data.get("listBookings").getAsJsonArray();
            bookingId = listBookings.get(0).getAsJsonObject().get("booking_id").getAsLong();
            String updateRoomAvailabilityQuery = Query.updateRoomAvailability(bookingId, bookingAvailabilityIds);
            logger.debug("updateRoomAvailabilityQuery: {}", updateRoomAvailabilityQuery);
            String updateRoomAvailabilityQueryJSON = graphQLUtility.graphQLQueryExecutor(updateRoomAvailabilityQuery);
            logger.debug("updateRoomAvailabilityQueryJSON: {}", updateRoomAvailabilityQueryJSON);
            encryptedBookingId = encryptionUtility.encrypt(bookingId.toString());
            updateBookingInRDS(bookingDTO, bookingId, encryptedBookingId);
            updateBookingAvailabilityInRDS(bookingAvailabilityIds, bookingId);
//            return new String[]{encryptedBookingId, bookingId.toString()};
        }finally {
//            lockByKey.unlock(key);
//            bookingThreadRepository.updateThreadByRoomTypeId(bookingDTO.getRoomTypeId(), false);
//            bookingThreadRepository.deleteThreadByRoomTypeId(bookingDTO.getRoomTypeId());
            stayDurationDates.stream().forEach(obj -> {
                concurrentBookingThreadRepository.deleteRecordByKey(lockKey+":"+obj);
                logger.info("Deleted thread for key: {}", lockKey+":"+obj);
            });
//            logger.info("Deleted thread for room type id: {}", bookingDTO.getRoomTypeId());
        }
        return new String[]{encryptedBookingId, bookingId.toString()};
    }

    @Override
    public String sendEmail(TemplateParamDTO templateParams) throws InvalidAlgorithmParameterException, NoSuchPaddingException, IllegalBlockSizeException, NoSuchAlgorithmException, BadPaddingException, InvalidKeyException {
        logger.info("env: {}", environmentVariables.toString());
        String url = environmentVariables.getUrlEmailJs();
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        JSONObject template_params = new JSONObject();
        template_params.put("booking_id", templateParams.getBooking_id());
        template_params.put("guest_first_name", templateParams.getGuest_first_name());
        template_params.put("guest_last_name", templateParams.getGuest_last_name());
        template_params.put("url", templateParams.getUrl());
        template_params.put("room_type_name", templateParams.getRoom_type_name());
        template_params.put("check_in_date", templateParams.getCheck_in_date());
        template_params.put("check_out_date", templateParams.getCheck_out_date());
        template_params.put("nightly_rate", templateParams.getNightly_rate());
        template_params.put("room_count", templateParams.getRoom_count());
        template_params.put("subtotal", templateParams.getSubtotal());
        template_params.put("tax", templateParams.getTax());
        template_params.put("due_at_resort", templateParams.getDue_at_resort());
        template_params.put("total_cost", templateParams.getTotal_cost());
        template_params.put("guest_email", templateParams.getGuest_email());
        JSONObject payload = new JSONObject();
        payload.put("lib_version",environmentVariables.getLibVersionEmailJs());
        payload.put("user_id",environmentVariables.getUserIdEmailJs());
        payload.put("service_id",environmentVariables.getServiceIdEmailJs());
        payload.put("template_id",environmentVariables.getTemplateIdEmailJs());
        payload.put("template_params",template_params);
        payload.put("accessToken",environmentVariables.getAccessTokenEmailJs());
        HttpEntity<String> request = new HttpEntity<String>(payload.toString(), headers);
        return restTemplate.exchange(url, HttpMethod.POST, request, String.class).getBody();
    }

    public String getMaskedCardNumber(String unmaskedCardNumber){
        String mask = "xxxx-xxxx-xxxx-####";
        int index = 0;
        StringBuilder maskedNumber = new StringBuilder();
        for (int i = 0; i < mask.length(); i++) {
            char c = mask.charAt(i);
            if (c == '#') {
                maskedNumber.append(unmaskedCardNumber.charAt(index));
                index++;
            } else if (c == 'x') {
                maskedNumber.append(c);
                index++;
            } else {
                maskedNumber.append(c);
            }
        }
        return maskedNumber.toString();
    }

    public void updateBookingInRDS(BookingDTO bookingDTO, Long bookingId, String encryptedBookingId) throws InvalidAlgorithmParameterException, NoSuchPaddingException, IllegalBlockSizeException, NoSuchAlgorithmException, BadPaddingException, InvalidKeyException {
        Guest guest = guestRepository.getGuestById(bookingDTO.getGuestId()).get(0);
        BillingInfo billingInfo = billingInfoRepository.getBillingInfoById(bookingDTO.getBillingInfoId()).get(0);
        BookingStatus bookingStatus = bookingStatusRepository.getBookingStatusById(bookingDTO.getStatusId()).get(0);
        bookingDTO.setPaymentCardNumber(getMaskedCardNumber(bookingDTO.getPaymentCardNumber()));
        Booking booking = rdsMapper.fromBookingDTO(bookingDTO, guest, bookingStatus, billingInfo, bookingId);
//        booking.setId(bookingId);
//        bookingRepository.createBooking(booking.getId(), booking.getAdultCount(), booking.getAmountDueAtResort(), booking.getBillingInfo().getId(), booking.getCheckInDate(), booking.getCheckOutDate(), booking.getChildCount(), booking.getGuest().getId(), booking.getPaymentCardNumber(), booking.getPromotionId(), booking.getPricePerRoom(), booking.getDuration(), booking.getSubtotal(), booking.getDueNow(), booking.getOccupancyTax(), booking.getTotalResortFee(), booking.getTaxSurchargeFeeTotal(), booking.getPropertyId(), booking.getRoomTypeId(), booking.getTotalCost(), booking.getBookingStatus().getId(), booking.getRoomCount(), booking.getRoomTypeName(), encryptedBookingId);
        booking.setEncryptedBookingId(encryptedBookingId);
        bookingRepository.save(booking);
    }

    public void updateBookingAvailabilityInRDS(HashSet<Long> bookingAvailabilityIds, Long bookingId) {
        for (Long availabilityId : bookingAvailabilityIds) {
            BookingAvailability bookingAvailability = BookingAvailability.builder()
                    .bookingId(bookingId)
                    .availabilityId(availabilityId)
                    .build();
            bookingAvailabilityRepository.save(bookingAvailability);
        }
    }

}
