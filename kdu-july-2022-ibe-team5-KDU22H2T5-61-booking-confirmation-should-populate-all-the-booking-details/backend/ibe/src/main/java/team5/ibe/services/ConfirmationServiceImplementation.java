package team5.ibe.services;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import team5.ibe.constants.Query;
import team5.ibe.entities.Booking;
import team5.ibe.entities.Guest;
import team5.ibe.models.graphql.PromotionDTO;
import team5.ibe.models.rds.ConfirmationDTO;
import team5.ibe.models.rds.Mapper;
import team5.ibe.repositories.BookingRepository;
import team5.ibe.repositories.GuestRepository;
import team5.ibe.utility.EncryptionUtility;
import team5.ibe.utility.GraphQLUtility;

import javax.crypto.BadPaddingException;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;
import java.security.InvalidAlgorithmParameterException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class ConfirmationServiceImplementation implements ConfirmationService {
    private final Logger logger = LoggerFactory.getLogger(RoomServiceImplementation.class);
    private final static Mapper mapper = new Mapper();
    private final static Gson gson = new Gson();

    @Autowired
    private BookingRepository bookingRepository;
    @Autowired
    private GuestRepository guestRepository;

    @Autowired
    private Query query;
    @Autowired
    private GraphQLUtility graphQLUtility;
    @Autowired
    private EncryptionUtility encryptionUtility;

    @Override
    public ConfirmationDTO getBooking(String encryptedBookingId) {
        encryptedBookingId = encryptedBookingId.replace(' ', '+');
        Booking bookings = bookingRepository.getBookingByIdEncrypted(encryptedBookingId);
        logger.info("bookings: {}", bookings);
        ConfirmationDTO booking = mapper.toConfirmationDTO(bookings);
        String promotionByIdQuery = query.getPromotionById(booking.getPromotionId());
        String promotionByIdJSON = graphQLUtility.graphQLQueryExecutor(promotionByIdQuery);
        JsonObject body = gson.fromJson(promotionByIdJSON, JsonObject.class);
        JsonObject data = body.get("data").getAsJsonObject();
        JsonObject getPromotion = data.get("getPromotion").getAsJsonObject();
        PromotionDTO promotionDTO = gson.fromJson(getPromotion.toString(), PromotionDTO.class);
        booking.setPromotionDTO(promotionDTO);
        return booking;
    }

    @Override
    public List<ConfirmationDTO> getAllBookingsByUserEmail(String email) {
        List<Booking> bookings = bookingRepository.getAllBookingsByUserEmail(email);
        logger.info("bookings\n {}", bookings);
        List<ConfirmationDTO> confirmationDTOS = new ArrayList<>();
        bookings.stream().forEach(obj ->
                confirmationDTOS.add(mapper.toConfirmationDTO(obj)));
        return confirmationDTOS;
    }
}
