package team5.ibe.resources;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import team5.ibe.models.rds.BillingInfoDTO;
import team5.ibe.models.rds.GuestDTO;
import team5.ibe.services.GuestService;

@RestController
@RequestMapping("/api/guest")
@CrossOrigin
public class GuestController {
    @Autowired
    private GuestService guestService;

    @PostMapping({"","/"})
    public ResponseEntity<Object> createGuest(@RequestBody GuestDTO guestDTO){
        Long guestId =  guestService.createGuest(guestDTO);
        if(guestId != -1)
        return new ResponseEntity<>(guestId, HttpStatus.OK);
        else return new ResponseEntity<>("Error detected", HttpStatus.BAD_REQUEST);
    }

    @PostMapping({"/billing","/billing/"})
    public ResponseEntity<Object> createBillingInfo(@RequestBody BillingInfoDTO billingInfoDTO){
        Long billingInfoId = guestService.createBillingInfo(billingInfoDTO);
        if(billingInfoId != -1)
            return new ResponseEntity<>(billingInfoId, HttpStatus.OK);
        else return new ResponseEntity<>("Error detected", HttpStatus.BAD_REQUEST);
    }
}
