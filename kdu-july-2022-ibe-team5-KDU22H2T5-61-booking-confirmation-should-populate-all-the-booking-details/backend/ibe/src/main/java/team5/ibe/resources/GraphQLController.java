package team5.ibe.resources;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;
import team5.ibe.models.RoomTypeDTO;
import team5.ibe.models.graphql.PromotionDTO;
import team5.ibe.services.GraphQLService;
import team5.ibe.services.GraphQLServiceImplementation;
import team5.ibe.utility.GraphQLUtility;

import javax.annotation.PostConstruct;
import java.nio.charset.StandardCharsets;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.*;
import java.time.format.TextStyle;
import java.util.*;
import java.time.temporal.ChronoUnit;

import static java.time.temporal.ChronoUnit.DAYS;

@RestController
@CrossOrigin
@RequestMapping("/api/graphql")
@Slf4j
public class GraphQLController {
    private final Logger logger = LoggerFactory.getLogger(GraphQLController.class);
    @Autowired
    private GraphQLService graphQLService;
    @GetMapping({"/tenant/{tenantId}/name", "/tenant/{tenantId}/name/"})
    public ResponseEntity<Object> getTenantNameByTenantId(@PathVariable(name = "tenantId") Integer tenantId){
        logger.debug("Request to get tenant name of tenant with id {}", tenantId);
        String body = graphQLService.getTenantNameByTenantId(tenantId);
        System.out.println(body);
        Gson gson = new Gson();
        Object response = gson.fromJson(body, Object.class);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    @GetMapping({"/property/{propertyId}/search/rooms","/property/{propertyId}/search/rooms/"})
    public ResponseEntity<Object> getAvailableRooms(@PathVariable(name = "propertyId") Integer propertyId,
                                                    @RequestParam(name = "checkInDate") String checkInDate,
                                                    @RequestParam(name = "checkOutDate") String checkOutDate,
                                                    @RequestParam(name = "guests") Integer maxCapacity,
                                                    @RequestParam(name = "beds") Integer beds,
                                                    @RequestParam(name = "rooms") Integer rooms) throws ParseException, JsonProcessingException {
        List<RoomTypeDTO> roomTypes = graphQLService.getAvailableRooms(propertyId, checkInDate, checkOutDate, maxCapacity, beds, rooms);
        return new ResponseEntity<>(roomTypes, HttpStatus.OK);
    }

    @GetMapping({"/promotions","/promotions/"})
    public ResponseEntity<Object> getPromotionsByMinimumDaysOfStay(@RequestParam(name = "checkInDate")String checkInDate, @RequestParam(name = "checkOutDate") String checkOutDate){
        List<PromotionDTO> promotionDTOList = graphQLService.getPromotionsByMinimumDaysOfStay(checkInDate, checkOutDate);
        return new ResponseEntity<>(promotionDTOList, HttpStatus.OK);
    }
}
