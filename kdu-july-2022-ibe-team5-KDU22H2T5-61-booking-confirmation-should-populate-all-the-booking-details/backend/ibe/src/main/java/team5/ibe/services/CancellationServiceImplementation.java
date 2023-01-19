package team5.ibe.services;

import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;
import team5.ibe.constants.EnvironmentVariables;
import team5.ibe.constants.Query;
import team5.ibe.entities.BookingAvailability;
import team5.ibe.entities.BookingOTP;
import team5.ibe.models.emailjs.CancellationOTP;
import team5.ibe.repositories.BookingAvailabilityRepository;
import team5.ibe.repositories.BookingOTPRepository;
import team5.ibe.repositories.BookingRepository;
import team5.ibe.utility.GraphQLUtility;

import java.util.HashSet;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CancellationServiceImplementation implements CancellationService{
    @Autowired
    private EnvironmentVariables environmentVariables;
    @Autowired
    private BookingOTPRepository bookingOTPRepository;
    @Autowired
    private BookingAvailabilityRepository bookingAvailabilityRepository;
    @Autowired
    private BookingRepository bookingRepository;
    @Autowired
    private GraphQLUtility graphQLUtility;
    private static final Logger logger = LoggerFactory.getLogger(BookingServiceImplementation.class);
    private static final RestTemplate restTemplate = new RestTemplate();
    @Override
    @Transactional
    public String sendOTP(CancellationOTP cancellationOTP) {
        Double f = Math.random()/Math.nextDown(1.0);
        Double x = 10000*(1.0-f) + 99999*f;
        Long otp = x.longValue();
        logger.info("env: {}", environmentVariables.toString());
        String url = environmentVariables.getUrlEmailJs();
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        JSONObject template_params = new JSONObject();
        template_params.put("otp", otp);
        template_params.put("to_email", cancellationOTP.getTo_email());
        JSONObject payload = new JSONObject();
        payload.put("lib_version",environmentVariables.getLibVersionEmailJs());
        payload.put("user_id",environmentVariables.getUserIdEmailJs());
        payload.put("service_id",environmentVariables.getServiceIdEmailJs());
        payload.put("template_id",environmentVariables.getTemplateIdOtpEmailJs());
        payload.put("template_params",template_params);
        payload.put("accessToken",environmentVariables.getAccessTokenEmailJs());
        HttpEntity<String> request = new HttpEntity<String>(payload.toString(), headers);
        String response = restTemplate.exchange(url, HttpMethod.POST, request, String.class).getBody();
        bookingOTPRepository.updateBookingOTP(cancellationOTP.getBooking_id(), otp);
        return response;
    }

    @Override
    @Transactional
    public String cancelBooking(Long bookingId, Long otp) {
        List<BookingOTP> bookingOTPList = bookingOTPRepository.getBookingOTPById(bookingId);

        if(bookingOTPList.size() == 0) return "No OTP found for the booking";

        BookingOTP bookingOTP = bookingOTPList.get(0);
        Long chancesLeft = bookingOTP.getChancesLeft();
        Long actualOTP = bookingOTP.getOtp();
        if(chancesLeft>0){
            if(otp.longValue() != actualOTP.longValue()){
                bookingOTPRepository.decrementChancesLeftById(bookingId);
                chancesLeft = chancesLeft - 1;
                return chancesLeft.toString();
            }
            else {
                List<BookingAvailability> bookingAvailabilityList = bookingAvailabilityRepository.getBookingAvailabilitiesById(bookingId);
                HashSet<Long> availabilityIds = bookingAvailabilityList.stream().map(obj -> obj.getAvailabilityId()).collect(Collectors.toCollection(HashSet::new));
                bookingRepository.updateBookingStatusAsCancelledById(bookingId);
                updateCancellationInAppsync(bookingId, availabilityIds);
                return "CANCELLED";
            }
        }
        return "0";
    }

    private void updateCancellationInAppsync(Long bookingId, HashSet<Long> availabilityIds){
        String updateRoomAvailabilityQuery = Query.updateRoomAvailability(Long.valueOf(0), availabilityIds);
        String updateRoomAvailabilityJSON = graphQLUtility.graphQLQueryExecutor(updateRoomAvailabilityQuery);
        String updateBookingAsCancelledQuery = Query.updateBookingAsCancelled(bookingId);
        String updateBookingAsCancelledJSON  = graphQLUtility.graphQLQueryExecutor(updateBookingAsCancelledQuery);
    }
}
