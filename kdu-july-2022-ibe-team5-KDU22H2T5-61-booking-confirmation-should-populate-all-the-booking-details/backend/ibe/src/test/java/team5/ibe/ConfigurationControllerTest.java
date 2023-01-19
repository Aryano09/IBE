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
public class ConfigurationControllerTest {
    private final Logger logger = LoggerFactory.getLogger(ConfigurationControllerTest.class);
    @Autowired
    private MockMvc mockMvc;

    @Autowired
    TenantConfigurationThemeRepository tenantConfigurationThemeRepository;
    @Autowired
    TenantConfigurationRepository tenantConfigurationRepository;

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
    public void insertThemeTest() throws Exception{
        String json = "{\n" +
                "    \"primaryColor\":\"green\",\n" +
                "    \"secondaryColor\":\"yello\",\n" +
                "    \"backgroundColor\":\"red\",\n" +
                "    \"background\":\"\"\n" +
                "}";
        mockMvc.perform(MockMvcRequestBuilders.post("/api/config/tenants/theme").contentType(MediaType.APPLICATION_JSON).content(json).accept(MediaType.APPLICATION_JSON)).andExpect(status().isOk());
    }

    @Test
    public void getTenantThemeByIdTest() throws Exception{
        String expectedJson = "{\"id\":1,\"primaryColor\":\"red\",\"secondaryColor\":\"blue\",\"backgroundColor\":\"green\",\"background\":\"rgb\",\"hibernateLazyInitializer\":{}}";
        Long id = tenantConfigurationRepository.findAll().stream().findFirst().get().getId();
        MvcResult result = mockMvc.perform(MockMvcRequestBuilders.get("/api/config/tenants/"+id+"/theme").accept(MediaType.APPLICATION_JSON)).andDo(print())
                .andExpect(status().isOk())
                .andReturn();
        String actualJson = result.getResponse().getContentAsString();

        Assertions.assertEquals(expectedJson, actualJson);
    }

    @Test
    public void getTenantConfigurationByTenantIdTest() throws Exception{
        Long id = tenantConfigurationRepository.findAll().stream().findFirst().get().getId();
        String expectedJson = "{\"showGuests\":true,\"showAdults\":true,\"showTeens\":true,\"showKids\":false,\"showAccessibleRoom\":true,\"showPromoCode\":false,\"roomLimit\":3,\"resortFeePerRoomPerDay\":null,\"occupancyTaxRate\":null}";
        MvcResult result = mockMvc.perform(MockMvcRequestBuilders.get("/api/config/tenants/"+id).accept(MediaType.APPLICATION_JSON)).andDo(print())
                .andExpect(status().isOk())
                .andReturn();
        String actualJson = result.getResponse().getContentAsString();

        Assertions.assertEquals(expectedJson, actualJson);
    }
}
