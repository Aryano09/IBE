package team5.ibe.resources;

import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import team5.ibe.models.RoomTypeImagesDTO;
import team5.ibe.models.rds.DealPackageDTO;
import team5.ibe.models.rds.RoomTypeReviewDTO;
import team5.ibe.services.RoomService;

import java.util.LinkedHashMap;
import java.util.List;

@RestController
@CrossOrigin
@Slf4j
@RequestMapping("/api/config/room")
public class RoomController {
    private final Logger logger = LoggerFactory.getLogger(RoomController.class);
    @Autowired
    private RoomService roomService;

    @PostMapping("/types/images")
    public void insertRoomTypeImagesList(@RequestBody List<RoomTypeImagesDTO> roomTypeImagesDTOList){
        roomService.insertRoomTypeImagesList(roomTypeImagesDTOList);
    }

    @GetMapping({"/amenities","/amenities/"})
    public ResponseEntity<Object> getAllAmenities(){
        return new ResponseEntity<>(roomService.getAllAmenities(), HttpStatus.OK);
    }

    @GetMapping({"/deals","/deals/"})
    public ResponseEntity<Object> getDealsByMinimumDaysOfStay(@RequestParam(name = "checkInDate")String checkInDate, @RequestParam(name = "checkOutDate") String checkOutDate){
        LinkedHashMap<String, List<DealPackageDTO>> dealPackageDTOLinkedHashMap = roomService.getDealsByMinimumDaysOfStay(checkInDate, checkOutDate);
        return new ResponseEntity<>(dealPackageDTOLinkedHashMap, HttpStatus.OK);
    }

    @GetMapping({"/property/{propertyId}/rates","/property/{propertyId}/rates/"})
    public ResponseEntity<Object> getRoomRatesByPropertyId(@PathVariable("propertyId")Long propertyId){
        return new ResponseEntity<>(roomService.getRoomRatesByPropertyId(propertyId), HttpStatus.OK);
    }

    @PostMapping({"/type/review","/type/review/"})
    public ResponseEntity<Object> insertReviewByRoomTypeId(@RequestBody RoomTypeReviewDTO roomTypeReviewDTO){
        String response = roomService.insertReviewByRoomTypeId(roomTypeReviewDTO);
        if(response.equals("OK"))
            return new ResponseEntity<>("Review inserted successfully", HttpStatus.OK);
        return new ResponseEntity<>("Problem occurred in inserting review", HttpStatus.INTERNAL_SERVER_ERROR);
    }
    @GetMapping({"/type/{roomTypeId}/reviews", "/type/{roomTypeId}/reviews/"})
    public ResponseEntity<Object> getReviewsByRoomTypeId(@PathVariable("roomTypeId")Long roomTypeId){
        return new ResponseEntity<>(roomService.getReviewsByRoomTypeId(roomTypeId), HttpStatus.OK);
    }

    @GetMapping({"/ratings", "/ratings/"})
    public ResponseEntity<Object> getRoomTypeRatings(){
        return new ResponseEntity<>(roomService.getRoomTypeRatings(), HttpStatus.OK);
    }
}
