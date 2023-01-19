package team5.ibe.services;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import team5.ibe.constants.Query;
import team5.ibe.entities.BillingInfo;
import team5.ibe.entities.Guest;
import team5.ibe.models.rds.BillingInfoDTO;
import team5.ibe.models.rds.GuestDTO;
import team5.ibe.models.rds.Mapper;
import team5.ibe.repositories.BillingInfoRepository;
import team5.ibe.repositories.GuestRepository;
import team5.ibe.utility.GraphQLUtility;

import javax.validation.ConstraintViolationException;

@Service
public class GuestServiceImplementation implements GuestService{
    @Autowired
    private GraphQLUtility graphQLUtility;
    @Autowired
    private GuestRepository guestRepository;
    @Autowired
    private BillingInfoRepository billingInfoRepository;

    private static final Logger logger = LoggerFactory.getLogger(GuestServiceImplementation.class);
    @Override
    public Long createGuest(GuestDTO guestDTO) {
        try{
            String createGuestQuery = Query.createGuest(guestDTO.getFirstName() + " " + guestDTO.getLastName());
            String createGuestQueryJSON = graphQLUtility.graphQLQueryExecutor(createGuestQuery);
            Gson gson = new Gson();
            JsonObject body = gson.fromJson(createGuestQueryJSON, JsonObject.class);
            JsonObject data = body.get("data").getAsJsonObject();
            JsonObject createGuest = data.get("createGuest").getAsJsonObject();
            Long guestId = createGuest.get("guest_id").getAsLong();
            Guest guest = Mapper.fromGuestDTO(guestDTO, guestId);
            guestRepository.save(guest);
            return guest.getId();
        }catch (ConstraintViolationException constraintViolationException){
            logger.info("Exception message: {}", constraintViolationException.getMessage());
            logger.info("Constraint violated: {}", constraintViolationException.getConstraintViolations());
            return Long.valueOf(-1);
        }
    }

    @Override
    public Long createBillingInfo(BillingInfoDTO billingInfoDTO) {
        try {
            BillingInfo billingInfo = Mapper.fromBillingInfoDTO(billingInfoDTO);
            billingInfo.setGuest(guestRepository.getGuestById(billingInfoDTO.getGuestId()).get(0));
            billingInfoRepository.save(billingInfo);
            return billingInfo.getId();
        }
        catch (ConstraintViolationException constraintViolationException){
            logger.info("Exception message: {}", constraintViolationException.getMessage());
            logger.info("Constraint violated: {}", constraintViolationException.getConstraintViolations());
            return Long.valueOf(-1);
        }
    }
}
