package team5.ibe;

import com.google.gson.Gson;
import org.junit.jupiter.api.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.Assert;
import team5.ibe.entities.TenantConfiguration;
import team5.ibe.entities.TenantConfigurationTheme;
import team5.ibe.models.TenantPropertiesDTO;
import team5.ibe.repositories.TenantConfigurationRepository;
import team5.ibe.repositories.TenantConfigurationThemeRepository;
import team5.ibe.resources.ConfigurationController;
import team5.ibe.services.ConfigurationService;

import java.util.Arrays;
import java.util.List;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@Transactional
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public class RoomDTOControllerTest {
    private final Logger logger = LoggerFactory.getLogger(ConfigurationControllerTest.class);
    @Autowired
    private MockMvc mockMvc;

    @Test
    public void insertThemeTest() throws Exception{
        String json = "[\n" +
                "    {\n" +
                "        \"propertyId\": 1,\n" +
                "        \"roomTypeId\": 1,\n" +
                "        \"imageUrls\": [\n" +
                "            \"url(https://ibe-t5-static.s3.amazonaws.com/grand_deluxe_1.jpeg)\",\n" +
                "            \"url(https://ibe-t5-static.s3.amazonaws.com/grand_deluxe_2.jpeg)\",\n" +
                "            \"url(https://ibe-t5-static.s3.amazonaws.com/grand_deluxe_3.jpeg)\"\n" +
                "        ]\n" +
                "    },\n" +
                "    {\n" +
                "        \"propertyId\": 1,\n" +
                "        \"roomTypeId\": 2,\n" +
                "        \"imageUrls\": [\n" +
                "            \"url(https://ibe-t5-static.s3.amazonaws.com/super_deluxe_1.jpg)\",\n" +
                "            \"url(https://ibe-t5-static.s3.amazonaws.com/super_deluxe_2.jpg)\",\n" +
                "            \"url(https://ibe-t5-static.s3.amazonaws.com/super_deluxe_3.jpg)\"\n" +
                "        ]\n" +
                "    },\n" +
                "    {\n" +
                "        \"propertyId\": 1,\n" +
                "        \"roomTypeId\": 3,\n" +
                "        \"imageUrls\": [\n" +
                "            \"url(https://ibe-t5-static.s3.amazonaws.com/family_deluxe_1.jpg)\",\n" +
                "            \"url(https://ibe-t5-static.s3.amazonaws.com/family_deluxe_2.jpg)\",\n" +
                "            \"url(https://ibe-t5-static.s3.amazonaws.com/family_deluxe_3.jpg)\"\n" +
                "        ]\n" +
                "    },\n" +
                "    {\n" +
                "        \"propertyId\": 1,\n" +
                "        \"roomTypeId\": 4,\n" +
                "        \"imageUrls\": [\n" +
                "            \"url(https://ibe-t5-static.s3.amazonaws.com/couple_suite_1.jpg)\",\n" +
                "            \"url(https://ibe-t5-static.s3.amazonaws.com/couple_suite_2.jpg)\",\n" +
                "            \"url(https://ibe-t5-static.s3.amazonaws.com/couple_suite_3.jpg)\"\n" +
                "        ]\n" +
                "    },\n" +
                "    {\n" +
                "        \"propertyId\": 1,\n" +
                "        \"roomTypeId\": 5,\n" +
                "        \"imageUrls\": [\n" +
                "            \"url(https://ibe-t5-static.s3.amazonaws.com/garden_suite_1.jpg)\",\n" +
                "            \"url(https://ibe-t5-static.s3.amazonaws.com/garden_suite_2.jpg)\",\n" +
                "            \"url(https://ibe-t5-static.s3.amazonaws.com/garden_suite_3.jpg)\"\n" +
                "        ]\n" +
                "    },\n" +
                "    {\n" +
                "        \"propertyId\": 1,\n" +
                "        \"roomTypeId\": 6,\n" +
                "        \"imageUrls\": [\n" +
                "            \"url(https://ibe-t5-static.s3.amazonaws.com/standard_suite_1.jpg)\",\n" +
                "            \"url(https://ibe-t5-static.s3.amazonaws.com/standard_suite_2.jpg)\",\n" +
                "            \"url(https://ibe-t5-static.s3.amazonaws.com/standard_suite_3.jpg)\"\n" +
                "        ]\n" +
                "    },\n" +
                "    {\n" +
                "        \"propertyId\": 2,\n" +
                "        \"roomTypeId\": 7,\n" +
                "        \"imageUrls\": [\n" +
                "            \"url(https://ibe-t5-static.s3.amazonaws.com/super_deluxe_1.jpg)\",\n" +
                "            \"url(https://ibe-t5-static.s3.amazonaws.com/super_deluxe_2.jpg)\",\n" +
                "            \"url(https://ibe-t5-static.s3.amazonaws.com/super_deluxe_3.jpg)\"\n" +
                "        ]\n" +
                "    },\n" +
                "    {\n" +
                "        \"propertyId\": 2,\n" +
                "        \"roomTypeId\": 8,\n" +
                "        \"imageUrls\": [\n" +
                "            \"url(https://ibe-t5-static.s3.amazonaws.com/family_deluxe_1.jpg)\",\n" +
                "            \"url(https://ibe-t5-static.s3.amazonaws.com/family_deluxe_2.jpg)\",\n" +
                "            \"url(https://ibe-t5-static.s3.amazonaws.com/family_deluxe_3.jpg)\"\n" +
                "        ]\n" +
                "    },\n" +
                "    {\n" +
                "        \"propertyId\": 2,\n" +
                "        \"roomTypeId\": 9,\n" +
                "        \"imageUrls\": [\n" +
                "            \"url(https://ibe-t5-static.s3.amazonaws.com/couple_suite_1.jpg)\",\n" +
                "            \"url(https://ibe-t5-static.s3.amazonaws.com/couple_suite_2.jpg)\",\n" +
                "            \"url(https://ibe-t5-static.s3.amazonaws.com/couple_suite_3.jpg)\"\n" +
                "        ]\n" +
                "    },\n" +
                "    {\n" +
                "        \"propertyId\": 2,\n" +
                "        \"roomTypeId\": 10,\n" +
                "        \"imageUrls\": [\n" +
                "            \"url(https://ibe-t5-static.s3.amazonaws.com/garden_suite_1.jpg)\",\n" +
                "            \"url(https://ibe-t5-static.s3.amazonaws.com/garden_suite_2.jpg)\",\n" +
                "            \"url(https://ibe-t5-static.s3.amazonaws.com/garden_suite_3.jpg)\"\n" +
                "        ]\n" +
                "    },\n" +
                "    {\n" +
                "        \"propertyId\": 2,\n" +
                "        \"roomTypeId\": 11,\n" +
                "        \"imageUrls\": [\n" +
                "            \"url(https://ibe-t5-static.s3.amazonaws.com/grand_deluxe_1.jpeg)\",\n" +
                "            \"url(https://ibe-t5-static.s3.amazonaws.com/grand_deluxe_2.jpeg)\",\n" +
                "            \"url(https://ibe-t5-static.s3.amazonaws.com/grand_deluxe_3.jpeg)\"\n" +
                "        ]\n" +
                "    },\n" +
                "    {\n" +
                "        \"propertyId\": 2,\n" +
                "        \"roomTypeId\": 12,\n" +
                "        \"imageUrls\": [\n" +
                "            \"url(https://ibe-t5-static.s3.amazonaws.com/standard_suite_1.jpg)\",\n" +
                "            \"url(https://ibe-t5-static.s3.amazonaws.com/standard_suite_2.jpg)\",\n" +
                "            \"url(https://ibe-t5-static.s3.amazonaws.com/standard_suite_3.jpg)\"\n" +
                "        ]\n" +
                "    },\n" +
                "    {\n" +
                "        \"propertyId\": 3,\n" +
                "        \"roomTypeId\": 13,\n" +
                "        \"imageUrls\": [\n" +
                "            \"url(https://ibe-t5-static.s3.amazonaws.com/super_deluxe_1.jpg)\",\n" +
                "            \"url(https://ibe-t5-static.s3.amazonaws.com/super_deluxe_2.jpg)\",\n" +
                "            \"url(https://ibe-t5-static.s3.amazonaws.com/super_deluxe_3.jpg)\"\n" +
                "        ]\n" +
                "    },\n" +
                "    {\n" +
                "        \"propertyId\": 3,\n" +
                "        \"roomTypeId\": 14,\n" +
                "        \"imageUrls\": [\n" +
                "            \"url(https://ibe-t5-static.s3.amazonaws.com/family_deluxe_1.jpg)\",\n" +
                "            \"url(https://ibe-t5-static.s3.amazonaws.com/family_deluxe_2.jpg)\",\n" +
                "            \"url(https://ibe-t5-static.s3.amazonaws.com/family_deluxe_3.jpg)\"\n" +
                "        ]\n" +
                "    },\n" +
                "    {\n" +
                "        \"propertyId\": 3,\n" +
                "        \"roomTypeId\": 15,\n" +
                "        \"imageUrls\": [\n" +
                "            \"url(https://ibe-t5-static.s3.amazonaws.com/couple_suite_1.jpg)\",\n" +
                "            \"url(https://ibe-t5-static.s3.amazonaws.com/couple_suite_2.jpg)\",\n" +
                "            \"url(https://ibe-t5-static.s3.amazonaws.com/couple_suite_3.jpg)\"\n" +
                "        ]\n" +
                "    },\n" +
                "    {\n" +
                "        \"propertyId\": 3,\n" +
                "        \"roomTypeId\": 16,\n" +
                "        \"imageUrls\": [\n" +
                "            \"url(https://ibe-t5-static.s3.amazonaws.com/garden_suite_1.jpg)\",\n" +
                "            \"url(https://ibe-t5-static.s3.amazonaws.com/garden_suite_2.jpg)\",\n" +
                "            \"url(https://ibe-t5-static.s3.amazonaws.com/garden_suite_3.jpg)\"\n" +
                "        ]\n" +
                "    },\n" +
                "    {\n" +
                "        \"propertyId\": 3,\n" +
                "        \"roomTypeId\": 17,\n" +
                "        \"imageUrls\": [\n" +
                "            \"url(https://ibe-t5-static.s3.amazonaws.com/grand_deluxe_1.jpeg)\",\n" +
                "            \"url(https://ibe-t5-static.s3.amazonaws.com/grand_deluxe_2.jpeg)\",\n" +
                "            \"url(https://ibe-t5-static.s3.amazonaws.com/grand_deluxe_3.jpeg)\"\n" +
                "        ]\n" +
                "    },\n" +
                "    {\n" +
                "        \"propertyId\": 3,\n" +
                "        \"roomTypeId\": 18,\n" +
                "        \"imageUrls\": [\n" +
                "            \"url(https://ibe-t5-static.s3.amazonaws.com/standard_suite_1.jpg)\",\n" +
                "            \"url(https://ibe-t5-static.s3.amazonaws.com/standard_suite_2.jpg)\",\n" +
                "            \"url(https://ibe-t5-static.s3.amazonaws.com/standard_suite_3.jpg)\"\n" +
                "        ]\n" +
                "    },\n" +
                "    {\n" +
                "        \"propertyId\": 4,\n" +
                "        \"roomTypeId\": 19,\n" +
                "        \"imageUrls\": [\n" +
                "            \"url(https://ibe-t5-static.s3.amazonaws.com/super_deluxe_1.jpg)\",\n" +
                "            \"url(https://ibe-t5-static.s3.amazonaws.com/super_deluxe_2.jpg)\",\n" +
                "            \"url(https://ibe-t5-static.s3.amazonaws.com/super_deluxe_3.jpg)\"\n" +
                "        ]\n" +
                "    },\n" +
                "    {\n" +
                "        \"propertyId\": 4,\n" +
                "        \"roomTypeId\": 20,\n" +
                "        \"imageUrls\": [\n" +
                "            \"url(https://ibe-t5-static.s3.amazonaws.com/family_deluxe_1.jpg)\",\n" +
                "            \"url(https://ibe-t5-static.s3.amazonaws.com/family_deluxe_2.jpg)\",\n" +
                "            \"url(https://ibe-t5-static.s3.amazonaws.com/family_deluxe_3.jpg)\"\n" +
                "        ]\n" +
                "    },\n" +
                "    {\n" +
                "        \"propertyId\": 4,\n" +
                "        \"roomTypeId\": 21,\n" +
                "        \"imageUrls\": [\n" +
                "            \"url(https://ibe-t5-static.s3.amazonaws.com/couple_suite_1.jpg)\",\n" +
                "            \"url(https://ibe-t5-static.s3.amazonaws.com/couple_suite_2.jpg)\",\n" +
                "            \"url(https://ibe-t5-static.s3.amazonaws.com/couple_suite_3.jpg)\"\n" +
                "        ]\n" +
                "    },\n" +
                "    {\n" +
                "        \"propertyId\": 4,\n" +
                "        \"roomTypeId\": 22,\n" +
                "        \"imageUrls\": [\n" +
                "            \"url(https://ibe-t5-static.s3.amazonaws.com/garden_suite_1.jpg)\",\n" +
                "            \"url(https://ibe-t5-static.s3.amazonaws.com/garden_suite_2.jpg)\",\n" +
                "            \"url(https://ibe-t5-static.s3.amazonaws.com/garden_suite_3.jpg)\"\n" +
                "        ]\n" +
                "    },\n" +
                "    {\n" +
                "        \"propertyId\": 4,\n" +
                "        \"roomTypeId\": 23,\n" +
                "        \"imageUrls\": [\n" +
                "            \"url(https://ibe-t5-static.s3.amazonaws.com/grand_deluxe_1.jpeg)\",\n" +
                "            \"url(https://ibe-t5-static.s3.amazonaws.com/grand_deluxe_2.jpeg)\",\n" +
                "            \"url(https://ibe-t5-static.s3.amazonaws.com/grand_deluxe_3.jpeg)\"\n" +
                "        ]\n" +
                "    },\n" +
                "    {\n" +
                "        \"propertyId\": 4,\n" +
                "        \"roomTypeId\": 24,\n" +
                "        \"imageUrls\": [\n" +
                "            \"url(https://ibe-t5-static.s3.amazonaws.com/standard_suite_1.jpg)\",\n" +
                "            \"url(https://ibe-t5-static.s3.amazonaws.com/standard_suite_2.jpg)\",\n" +
                "            \"url(https://ibe-t5-static.s3.amazonaws.com/standard_suite_3.jpg)\"\n" +
                "        ]\n" +
                "    },\n" +
                "    {\n" +
                "        \"propertyId\": 5,\n" +
                "        \"roomTypeId\": 25,\n" +
                "        \"imageUrls\": [\n" +
                "            \"url(https://ibe-t5-static.s3.amazonaws.com/super_deluxe_1.jpg)\",\n" +
                "            \"url(https://ibe-t5-static.s3.amazonaws.com/super_deluxe_2.jpg)\",\n" +
                "            \"url(https://ibe-t5-static.s3.amazonaws.com/super_deluxe_3.jpg)\"\n" +
                "        ]\n" +
                "    },\n" +
                "    {\n" +
                "        \"propertyId\": 5,\n" +
                "        \"roomTypeId\": 26,\n" +
                "        \"imageUrls\": [\n" +
                "            \"url(https://ibe-t5-static.s3.amazonaws.com/family_deluxe_1.jpg)\",\n" +
                "            \"url(https://ibe-t5-static.s3.amazonaws.com/family_deluxe_2.jpg)\",\n" +
                "            \"url(https://ibe-t5-static.s3.amazonaws.com/family_deluxe_3.jpg)\"\n" +
                "        ]\n" +
                "    },\n" +
                "    {\n" +
                "        \"propertyId\": 5,\n" +
                "        \"roomTypeId\": 27,\n" +
                "        \"imageUrls\": [\n" +
                "            \"url(https://ibe-t5-static.s3.amazonaws.com/couple_suite_1.jpg)\",\n" +
                "            \"url(https://ibe-t5-static.s3.amazonaws.com/couple_suite_2.jpg)\",\n" +
                "            \"url(https://ibe-t5-static.s3.amazonaws.com/couple_suite_3.jpg)\"\n" +
                "        ]\n" +
                "    },\n" +
                "    {\n" +
                "        \"propertyId\": 5,\n" +
                "        \"roomTypeId\": 28,\n" +
                "        \"imageUrls\": [\n" +
                "            \"url(https://ibe-t5-static.s3.amazonaws.com/garden_suite_1.jpg)\",\n" +
                "            \"url(https://ibe-t5-static.s3.amazonaws.com/garden_suite_2.jpg)\",\n" +
                "            \"url(https://ibe-t5-static.s3.amazonaws.com/garden_suite_3.jpg)\"\n" +
                "        ]\n" +
                "    },\n" +
                "    {\n" +
                "        \"propertyId\": 5,\n" +
                "        \"roomTypeId\": 29,\n" +
                "        \"imageUrls\": [\n" +
                "            \"url(https://ibe-t5-static.s3.amazonaws.com/grand_deluxe_1.jpeg)\",\n" +
                "            \"url(https://ibe-t5-static.s3.amazonaws.com/grand_deluxe_2.jpeg)\",\n" +
                "            \"url(https://ibe-t5-static.s3.amazonaws.com/grand_deluxe_3.jpeg)\"\n" +
                "        ]\n" +
                "    },\n" +
                "    {\n" +
                "        \"propertyId\": 5,\n" +
                "        \"roomTypeId\": 30,\n" +
                "        \"imageUrls\": [\n" +
                "            \"url(https://ibe-t5-static.s3.amazonaws.com/standard_suite_1.jpg)\",\n" +
                "            \"url(https://ibe-t5-static.s3.amazonaws.com/standard_suite_2.jpg)\",\n" +
                "            \"url(https://ibe-t5-static.s3.amazonaws.com/standard_suite_3.jpg)\"\n" +
                "        ]\n" +
                "    },\n" +
                "    {\n" +
                "        \"propertyId\": 6,\n" +
                "        \"roomTypeId\": 31,\n" +
                "        \"imageUrls\": [\n" +
                "            \"url(https://ibe-t5-static.s3.amazonaws.com/grand_deluxe_1.jpeg)\",\n" +
                "            \"url(https://ibe-t5-static.s3.amazonaws.com/grand_deluxe_2.jpeg)\",\n" +
                "            \"url(https://ibe-t5-static.s3.amazonaws.com/grand_deluxe_3.jpeg)\"\n" +
                "        ]\n" +
                "    },\n" +
                "    {\n" +
                "        \"propertyId\": 6,\n" +
                "        \"roomTypeId\": 32,\n" +
                "        \"imageUrls\": [\n" +
                "            \"url(https://ibe-t5-static.s3.amazonaws.com/super_deluxe_1.jpg)\",\n" +
                "            \"url(https://ibe-t5-static.s3.amazonaws.com/super_deluxe_2.jpg)\",\n" +
                "            \"url(https://ibe-t5-static.s3.amazonaws.com/super_deluxe_3.jpg)\"\n" +
                "        ]\n" +
                "    },\n" +
                "    {\n" +
                "        \"propertyId\": 6,\n" +
                "        \"roomTypeId\": 33,\n" +
                "        \"imageUrls\": [\n" +
                "            \"url(https://ibe-t5-static.s3.amazonaws.com/family_deluxe_1.jpg)\",\n" +
                "            \"url(https://ibe-t5-static.s3.amazonaws.com/family_deluxe_2.jpg)\",\n" +
                "            \"url(https://ibe-t5-static.s3.amazonaws.com/family_deluxe_3.jpg)\"\n" +
                "        ]\n" +
                "    },\n" +
                "    {\n" +
                "        \"propertyId\": 6,\n" +
                "        \"roomTypeId\": 34,\n" +
                "        \"imageUrls\": [\n" +
                "            \"url(https://ibe-t5-static.s3.amazonaws.com/couple_suite_1.jpg)\",\n" +
                "            \"url(https://ibe-t5-static.s3.amazonaws.com/couple_suite_2.jpg)\",\n" +
                "            \"url(https://ibe-t5-static.s3.amazonaws.com/couple_suite_3.jpg)\"\n" +
                "        ]\n" +
                "    },\n" +
                "    {\n" +
                "        \"propertyId\": 6,\n" +
                "        \"roomTypeId\": 35,\n" +
                "        \"imageUrls\": [\n" +
                "            \"url(https://ibe-t5-static.s3.amazonaws.com/garden_suite_1.jpg)\",\n" +
                "            \"url(https://ibe-t5-static.s3.amazonaws.com/garden_suite_2.jpg)\",\n" +
                "            \"url(https://ibe-t5-static.s3.amazonaws.com/garden_suite_3.jpg)\"\n" +
                "        ]\n" +
                "    },\n" +
                "    {\n" +
                "        \"propertyId\": 6,\n" +
                "        \"roomTypeId\": 36,\n" +
                "        \"imageUrls\": [\n" +
                "            \"url(https://ibe-t5-static.s3.amazonaws.com/standard_suite_1.jpg)\",\n" +
                "            \"url(https://ibe-t5-static.s3.amazonaws.com/standard_suite_2.jpg)\",\n" +
                "            \"url(https://ibe-t5-static.s3.amazonaws.com/standard_suite_3.jpg)\"\n" +
                "        ]\n" +
                "    },\n" +
                "    {\n" +
                "        \"propertyId\": 7,\n" +
                "        \"roomTypeId\": 37,\n" +
                "        \"imageUrls\": [\n" +
                "            \"url(https://ibe-t5-static.s3.amazonaws.com/grand_deluxe_1.jpeg)\",\n" +
                "            \"url(https://ibe-t5-static.s3.amazonaws.com/grand_deluxe_2.jpeg)\",\n" +
                "            \"url(https://ibe-t5-static.s3.amazonaws.com/grand_deluxe_3.jpeg)\"\n" +
                "        ]\n" +
                "    },\n" +
                "    {\n" +
                "        \"propertyId\": 7,\n" +
                "        \"roomTypeId\": 38,\n" +
                "        \"imageUrls\": [\n" +
                "            \"url(https://ibe-t5-static.s3.amazonaws.com/super_deluxe_1.jpg)\",\n" +
                "            \"url(https://ibe-t5-static.s3.amazonaws.com/super_deluxe_2.jpg)\",\n" +
                "            \"url(https://ibe-t5-static.s3.amazonaws.com/super_deluxe_3.jpg)\"\n" +
                "        ]\n" +
                "    },\n" +
                "    {\n" +
                "        \"propertyId\": 7,\n" +
                "        \"roomTypeId\": 39,\n" +
                "        \"imageUrls\": [\n" +
                "            \"url(https://ibe-t5-static.s3.amazonaws.com/family_deluxe_1.jpg)\",\n" +
                "            \"url(https://ibe-t5-static.s3.amazonaws.com/family_deluxe_2.jpg)\",\n" +
                "            \"url(https://ibe-t5-static.s3.amazonaws.com/family_deluxe_3.jpg)\"\n" +
                "        ]\n" +
                "    },\n" +
                "    {\n" +
                "        \"propertyId\": 7,\n" +
                "        \"roomTypeId\": 40,\n" +
                "        \"imageUrls\": [\n" +
                "            \"url(https://ibe-t5-static.s3.amazonaws.com/couple_suite_1.jpg)\",\n" +
                "            \"url(https://ibe-t5-static.s3.amazonaws.com/couple_suite_2.jpg)\",\n" +
                "            \"url(https://ibe-t5-static.s3.amazonaws.com/couple_suite_3.jpg)\"\n" +
                "        ]\n" +
                "    },\n" +
                "    {\n" +
                "        \"propertyId\": 7,\n" +
                "        \"roomTypeId\": 41,\n" +
                "        \"imageUrls\": [\n" +
                "            \"url(https://ibe-t5-static.s3.amazonaws.com/garden_suite_1.jpg)\",\n" +
                "            \"url(https://ibe-t5-static.s3.amazonaws.com/garden_suite_2.jpg)\",\n" +
                "            \"url(https://ibe-t5-static.s3.amazonaws.com/garden_suite_3.jpg)\"\n" +
                "        ]\n" +
                "    },\n" +
                "    {\n" +
                "        \"propertyId\": 7,\n" +
                "        \"roomTypeId\": 42,\n" +
                "        \"imageUrls\": [\n" +
                "            \"url(https://ibe-t5-static.s3.amazonaws.com/standard_suite_1.jpg)\",\n" +
                "            \"url(https://ibe-t5-static.s3.amazonaws.com/standard_suite_2.jpg)\",\n" +
                "            \"url(https://ibe-t5-static.s3.amazonaws.com/standard_suite_3.jpg)\"\n" +
                "        ]\n" +
                "    },\n" +
                "    {\n" +
                "        \"propertyId\": 8,\n" +
                "        \"roomTypeId\": 43,\n" +
                "        \"imageUrls\": [\n" +
                "            \"url(https://ibe-t5-static.s3.amazonaws.com/grand_deluxe_1.jpeg)\",\n" +
                "            \"url(https://ibe-t5-static.s3.amazonaws.com/grand_deluxe_2.jpeg)\",\n" +
                "            \"url(https://ibe-t5-static.s3.amazonaws.com/grand_deluxe_3.jpeg)\"\n" +
                "        ]\n" +
                "    },\n" +
                "    {\n" +
                "        \"propertyId\": 8,\n" +
                "        \"roomTypeId\": 44,\n" +
                "        \"imageUrls\": [\n" +
                "            \"url(https://ibe-t5-static.s3.amazonaws.com/super_deluxe_1.jpg)\",\n" +
                "            \"url(https://ibe-t5-static.s3.amazonaws.com/super_deluxe_2.jpg)\",\n" +
                "            \"url(https://ibe-t5-static.s3.amazonaws.com/super_deluxe_3.jpg)\"\n" +
                "        ]\n" +
                "    },\n" +
                "    {\n" +
                "        \"propertyId\": 8,\n" +
                "        \"roomTypeId\": 45,\n" +
                "        \"imageUrls\": [\n" +
                "            \"url(https://ibe-t5-static.s3.amazonaws.com/family_deluxe_1.jpg)\",\n" +
                "            \"url(https://ibe-t5-static.s3.amazonaws.com/family_deluxe_2.jpg)\",\n" +
                "            \"url(https://ibe-t5-static.s3.amazonaws.com/family_deluxe_3.jpg)\"\n" +
                "        ]\n" +
                "    },\n" +
                "    {\n" +
                "        \"propertyId\": 8,\n" +
                "        \"roomTypeId\": 46,\n" +
                "        \"imageUrls\": [\n" +
                "            \"url(https://ibe-t5-static.s3.amazonaws.com/couple_suite_1.jpg)\",\n" +
                "            \"url(https://ibe-t5-static.s3.amazonaws.com/couple_suite_2.jpg)\",\n" +
                "            \"url(https://ibe-t5-static.s3.amazonaws.com/couple_suite_3.jpg)\"\n" +
                "        ]\n" +
                "    },\n" +
                "    {\n" +
                "        \"propertyId\": 8,\n" +
                "        \"roomTypeId\": 47,\n" +
                "        \"imageUrls\": [\n" +
                "            \"url(https://ibe-t5-static.s3.amazonaws.com/garden_suite_1.jpg)\",\n" +
                "            \"url(https://ibe-t5-static.s3.amazonaws.com/garden_suite_2.jpg)\",\n" +
                "            \"url(https://ibe-t5-static.s3.amazonaws.com/garden_suite_3.jpg)\"\n" +
                "        ]\n" +
                "    },\n" +
                "    {\n" +
                "        \"propertyId\": 8,\n" +
                "        \"roomTypeId\": 48,\n" +
                "        \"imageUrls\": [\n" +
                "            \"url(https://ibe-t5-static.s3.amazonaws.com/standard_suite_1.jpg)\",\n" +
                "            \"url(https://ibe-t5-static.s3.amazonaws.com/standard_suite_2.jpg)\",\n" +
                "            \"url(https://ibe-t5-static.s3.amazonaws.com/standard_suite_3.jpg)\"\n" +
                "        ]\n" +
                "    }\n" +
                "]";
        mockMvc.perform(MockMvcRequestBuilders.post("/api/config/room/types/images").contentType(MediaType.APPLICATION_JSON).content(json).accept(MediaType.APPLICATION_JSON)).andExpect(status().isOk());
    }
}
