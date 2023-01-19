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
public class ConfigurationServiceTest {
    private final Logger logger = LoggerFactory.getLogger(ConfigurationControllerTest.class);

    @Autowired
    TenantConfigurationThemeRepository tenantConfigurationThemeRepository;
    @Autowired
    TenantConfigurationRepository tenantConfigurationRepository;

    @MockBean
    ConfigurationService configurationServiceMock;
    @Autowired
    ConfigurationController configurationController;

    @BeforeAll
    public void init(){
        TenantConfigurationTheme tenantConfigurationTheme = TenantConfigurationTheme.builder()
                .primaryColor("red")
                .secondaryColor("blue")
                .backgroundColor("green")
                .background("rgb")
                .build();
        tenantConfigurationThemeRepository.save(tenantConfigurationTheme);

        TenantConfiguration tenantConfiguration = TenantConfiguration.builder()
                .tenantName("tenant1")
                .roomLimit(3)
                .showGuests(true)
                .showAdults(true)
                .showTeens(true)
                .showKids(false)
                .showAccessibleRoom(true)
                .showPromoCode(false)
                .theme(tenantConfigurationTheme)
                .build();
        tenantConfigurationRepository.save(tenantConfiguration);
    }

    @Test
    public void loadTenantsTest() throws Exception {
        Assertions.assertEquals("Successfully loaded all the tenants", configurationController.loadTenants().getBody());
    }

    @Test
    public void getPropertiesByTenantIdTest() throws Exception {
        String expectedOutput = "[TenantPropertiesDTO(propertyName=Team 1 Hotel, propertyId=1), TenantPropertiesDTO(propertyName=Team 2 Hotel, propertyId=2), TenantPropertiesDTO(propertyName=Team 3 Hotel, propertyId=3), TenantPropertiesDTO(propertyName=Team 4 Hotel, propertyId=4), TenantPropertiesDTO(propertyName=Team 5 Hotel, propertyId=5), TenantPropertiesDTO(propertyName=Team 6 Hotel, propertyId=6), TenantPropertiesDTO(propertyName=Team 7 Hotel, propertyId=7), TenantPropertiesDTO(propertyName=Team 8 Hotel, propertyId=8)]";
        Long id = tenantConfigurationRepository.findAll().stream().findFirst().get().getId();

        when(configurationServiceMock.getPropertiesByTenantId(id)).thenReturn(Arrays.asList(new TenantPropertiesDTO("Team 1 Hotel", Long.valueOf(1)), new TenantPropertiesDTO("Team 2 Hotel", Long.valueOf(2)), new TenantPropertiesDTO("Team 3 Hotel", Long.valueOf(3)), new TenantPropertiesDTO("Team 4 Hotel", Long.valueOf(4)), new TenantPropertiesDTO("Team 5 Hotel", Long.valueOf(5)), new TenantPropertiesDTO("Team 6 Hotel", Long.valueOf(6)), new TenantPropertiesDTO("Team 7 Hotel", Long.valueOf(7)), new TenantPropertiesDTO("Team 8 Hotel", Long.valueOf(8))));

        Assertions.assertEquals(expectedOutput, configurationController.getPropertiesByTenantId(id).getBody().toString());
    }
}
