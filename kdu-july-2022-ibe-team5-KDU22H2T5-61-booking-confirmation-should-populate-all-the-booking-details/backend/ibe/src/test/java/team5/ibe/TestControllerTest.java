package team5.ibe;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.transaction.annotation.Transactional;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@Transactional
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public class TestControllerTest {

    private final Logger logger = LoggerFactory.getLogger(TestControllerTest.class);

    @Autowired
    private MockMvc mockMvc;

    @Test
    public void getEnvTest() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/api/test")).andExpect(status().isOk());
    }

    @Test
    public void getAppNameTest() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/api/test/appname")).andExpect(status().isOk());
    }
}
