package team5.ibe.resources;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import team5.ibe.models.emailjs.TemplateParamDTO;
import team5.ibe.models.graphql.BookingDTO;
import team5.ibe.services.BookingService;

import javax.crypto.BadPaddingException;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;
import java.security.InvalidAlgorithmParameterException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;

@RestController
@RequestMapping("/api/booking")
@CrossOrigin
public class BookingController {
    @Autowired
    private BookingService bookingService;

    @PostMapping({"","/"})
    public ResponseEntity<Object> createBooking(@RequestBody BookingDTO bookingDTO) throws InvalidAlgorithmParameterException, NoSuchPaddingException, IllegalBlockSizeException, NoSuchAlgorithmException, BadPaddingException, InvalidKeyException, InterruptedException {
        String[] bookingIdList = bookingService.createBooking(bookingDTO);
        if(bookingIdList[0].equals(Long.valueOf(-1).toString())){
            return new ResponseEntity<>(bookingIdList, HttpStatus.ACCEPTED);
        }
        return new ResponseEntity<>(bookingIdList, HttpStatus.OK);
    }

    @PostMapping({"/email", "/email/"})
    public ResponseEntity<Object> sendEmail(@RequestBody TemplateParamDTO templateParams) throws InvalidAlgorithmParameterException, NoSuchPaddingException, IllegalBlockSizeException, NoSuchAlgorithmException, BadPaddingException, InvalidKeyException {
        return new ResponseEntity<>(bookingService.sendEmail(templateParams), HttpStatus.OK);
    }
}