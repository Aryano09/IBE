package team5.ibe.resources;

import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import team5.ibe.models.graphql.NightlyRatesDTO;
import team5.ibe.services.GraphQLService;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/calender")
@Slf4j
public class CalenderController {
    private final Logger logger = LoggerFactory.getLogger(GraphQLController.class);
    @Autowired
    private GraphQLService graphQLService;

    @GetMapping("/basicRates/property/{propertyId}")
    public ResponseEntity<List<NightlyRatesDTO>> getBasicRates(@PathVariable(name = "propertyId") Long propertyId){
        List<NightlyRatesDTO> nightlyRatesDTOArrayList = graphQLService.getBasicNightlyRates(propertyId);
        return new ResponseEntity<>(nightlyRatesDTOArrayList, HttpStatus.OK);
    }
}
