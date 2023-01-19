package team5.ibe;

import com.google.gson.Gson;
import org.junit.jupiter.api.*;
import org.junit.runner.RunWith;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.Assert;
import team5.ibe.entities.TenantConfiguration;
import team5.ibe.entities.TenantConfigurationTheme;
import team5.ibe.models.RoomTypeDTO;
import team5.ibe.models.TenantPropertiesDTO;
import team5.ibe.repositories.TenantConfigurationRepository;
import team5.ibe.repositories.TenantConfigurationThemeRepository;
import team5.ibe.resources.ConfigurationController;
import team5.ibe.resources.GraphQLController;
import team5.ibe.services.ConfigurationService;
import team5.ibe.services.GraphQLService;

import java.util.Arrays;
import java.util.List;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@Transactional
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
@RunWith(SpringRunner.class)
public class GraphQLServiceTest {
    private final Logger logger = LoggerFactory.getLogger(ConfigurationControllerTest.class);

    @MockBean
    GraphQLService graphQLServiceMock;
    @Autowired
    GraphQLController graphQLController;

    @org.junit.Test
    public void getAvailableRoomsTest() throws Exception {
        String expectedOutput = "[RoomTypeDTO(roomTypeId=1, area=410.0, doubleBed=2, maxCapacity=4, name=SUPER_DELUXE, singleBed=0, basicNightlyRate=100.0, imageUrls=[url(https://ibe-t5-static.s3.amazonaws.com/super_deluxe_1.jpg), url(https://ibe-t5-static.s3.amazonaws.com/super_deluxe_2.jpg), url(https://ibe-t5-static.s3.amazonaws.com/super_deluxe_3.jpg)], description=description, amenityIds=[1, 1, 1]), RoomTypeDTO(roomTypeId=1, area=350.0, doubleBed=1, maxCapacity=4, name=FAMILY_DELUXE, singleBed=2, basicNightlyRate=90.0, imageUrls=[url(https://ibe-t5-static.s3.amazonaws.com/family_deluxe_1.jpg), url(https://ibe-t5-static.s3.amazonaws.com/family_deluxe_2.jpg), url(https://ibe-t5-static.s3.amazonaws.com/family_deluxe_3.jpg)])], description=description, amenityIds=[1, 1, 1]), RoomTypeDTO(roomTypeId=1, area=450.0, doubleBed=2, maxCapacity=4, name=GRAND_DELUXE, singleBed=1, basicNightlyRate=110.0, imageUrls=[url(https://ibe-t5-static.s3.amazonaws.com/grand_deluxe_1.jpeg), url(https://ibe-t5-static.s3.amazonaws.com/grand_deluxe_2.jpeg), url(https://ibe-t5-static.s3.amazonaws.com/grand_deluxe_3.jpeg)], description=description, amenityIds=[1, 1, 1])]";

        when(graphQLServiceMock.getAvailableRooms(1, "2022-09-22T00:00:00.000Z", "2022-09-24T00:00:00.000Z", 4, 2, 2)).thenReturn(
                Arrays.asList(
                        new RoomTypeDTO(1,410.0, 2, 4, "SUPER_DELUXE", 0, 100.0, Arrays.asList("url(https://ibe-t5-static.s3.amazonaws.com/super_deluxe_1.jpg)", "url(https://ibe-t5-static.s3.amazonaws.com/super_deluxe_2.jpg)", "url(https://ibe-t5-static.s3.amazonaws.com/super_deluxe_3.jpg)"), "description", Arrays.asList(Long.valueOf(1),Long.valueOf(1),Long.valueOf(1))),

                        new RoomTypeDTO(1,350.0, 1, 4, "FAMILY_DELUXE", 2, 90.0, Arrays.asList("url(https://ibe-t5-static.s3.amazonaws.com/family_deluxe_1.jpg)", "url(https://ibe-t5-static.s3.amazonaws.com/family_deluxe_2.jpg)", "url(https://ibe-t5-static.s3.amazonaws.com/family_deluxe_3.jpg)])"), "description", Arrays.asList(Long.valueOf(1),Long.valueOf(1),Long.valueOf(1))),

                        new RoomTypeDTO(1,450.0, 2, 4, "GRAND_DELUXE", 1, 110.0, Arrays.asList("url(https://ibe-t5-static.s3.amazonaws.com/grand_deluxe_1.jpeg)", "url(https://ibe-t5-static.s3.amazonaws.com/grand_deluxe_2.jpeg)", "url(https://ibe-t5-static.s3.amazonaws.com/grand_deluxe_3.jpeg)"), "description", Arrays.asList(Long.valueOf(1),Long.valueOf(1),Long.valueOf(1)))));

        Assertions.assertEquals(expectedOutput, graphQLController.getAvailableRooms(1,"2022-09-22T00:00:00.000Z", "2022-09-24T00:00:00.000Z", 4, 2, 2 ).getBody().toString());
    }

    @org.junit.Test
    public void getTenantNameByTenantId() throws Exception{
        when(graphQLServiceMock.getTenantNameByTenantId(1)).thenReturn("{\"data\":{\"getTenant\":{\"tenant_name\":\"kdu-hotels\"}}}");

        String expectedOutput = "{data={getTenant={tenant_name=kdu-hotels}}}";

        Assertions.assertEquals(expectedOutput, graphQLController.getTenantNameByTenantId(1).getBody().toString());
    }
}
