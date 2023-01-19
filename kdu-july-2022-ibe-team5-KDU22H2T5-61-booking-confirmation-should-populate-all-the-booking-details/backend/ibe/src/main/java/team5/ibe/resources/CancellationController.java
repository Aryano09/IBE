package team5.ibe.resources;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import team5.ibe.models.emailjs.CancellationOTP;
import team5.ibe.services.CancellationService;

@RestController
@CrossOrigin
@RequestMapping("/cancellation")
@Slf4j
public class CancellationController {
    @Autowired
    private CancellationService cancellationService;

    @PostMapping({"/otp", "/otp/"})
    public ResponseEntity<Object> sendOTP(@RequestBody CancellationOTP cancellationOTP){
        return new ResponseEntity<>(cancellationService.sendOTP(cancellationOTP), HttpStatus.OK);
    }

    @PostMapping({"/otp/booking/{bookingId}/cancel", "/otp/booking/{bookingId}/cancel/"})
    public ResponseEntity<Object> cancelBooking(@PathVariable("bookingId")Long bookingId, @RequestParam("otp")Long otp){
        return new ResponseEntity<>(cancellationService.cancelBooking(bookingId, otp), HttpStatus.OK);
    }

}
