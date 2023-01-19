package team5.ibe.resources;

import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import team5.ibe.services.ConfirmationService;

import javax.crypto.BadPaddingException;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;
import java.security.InvalidAlgorithmParameterException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;

@RestController
@CrossOrigin
@RequestMapping("/Confirmation")
@Slf4j
public class ConfirmationController {
    private final Logger logger = LoggerFactory.getLogger(GraphQLController.class);
    @Autowired
    private ConfirmationService confirmationService;

    @GetMapping({"/Booking","/Booking/"})
    public ResponseEntity<Object> getBookingDetails(@RequestParam("BookingId") String encryptedBookingId) throws InvalidAlgorithmParameterException, NoSuchPaddingException, IllegalBlockSizeException, NoSuchAlgorithmException, BadPaddingException, InvalidKeyException {
        return new ResponseEntity<>(confirmationService.getBooking(encryptedBookingId), HttpStatus.OK);
    }

    @GetMapping({"/Booking/User","/Booking/User/"})
    public ResponseEntity<Object> getAllBookingsByUserEmail(@RequestParam("email") String email){
        return new ResponseEntity<>(confirmationService.getAllBookingsByUserEmail(email), HttpStatus.OK);
    }
}
