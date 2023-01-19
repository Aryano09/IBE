package team5.ibe.services;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;
import team5.ibe.constants.Query;
import team5.ibe.entities.TenantConfiguration;
import team5.ibe.entities.TenantConfigurationTheme;
import team5.ibe.models.TenantConfigurationDTO;
import team5.ibe.models.TenantPropertiesDTO;
import team5.ibe.models.TenantThemeRequest;
import team5.ibe.models.mappers.TenantConfigurationMapper;
import team5.ibe.models.mappers.TenantConfigurationThemeMapper;
import team5.ibe.models.mappers.TenantPropertiesMapper;
import team5.ibe.repositories.TenantConfigurationRepository;
import team5.ibe.repositories.TenantConfigurationThemeRepository;
import team5.ibe.utility.GraphQLUtility;

import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@Transactional
@ComponentScan({"team5.ibe.constants"})
public class ConfigurationServiceImplementation implements ConfigurationService {
    @Autowired
    private TenantPropertiesMapper tenantPropertiesMapper;
    @Autowired
    private Query queryObject;
    @Autowired
    private TenantConfigurationRepository tenantConfigurationRepository;
    @Autowired
    private TenantConfigurationThemeRepository tenantConfigurationThemeRepository;
    @Autowired
    private GraphQLUtility graphQLUtility;
    @Autowired
    private TenantConfigurationMapper tenantConfigurationMapper;
    @Autowired
    private TenantConfigurationThemeMapper tenantConfigurationThemeMapper;
    private Logger logger = LoggerFactory.getLogger(ConfigurationServiceImplementation.class);
    @Override
    public TenantConfigurationDTO getTenantConfigurationByTenantId(Long id) {
        TenantConfiguration tenantConfiguration = tenantConfigurationRepository.findById(id).get();
        TenantConfigurationDTO tenantConfigurationDTO = tenantConfigurationMapper.toDTO(tenantConfiguration);
        return tenantConfigurationDTO;
    }

    @Override
    public List<TenantPropertiesDTO> getPropertiesByTenantId(Long id) {
        String query = queryObject.getPropertiesByTenantId(id);
        String bodyString = graphQLUtility.graphQLQueryExecutor(query);
        return tenantPropertiesMapper.toDTOList(bodyString);
    }

    @Override
    public void loadTenants() {
        logger.info("inside");
        String query = queryObject.loadTenants();
        String bodyString = graphQLUtility.graphQLQueryExecutor(query);
        Gson gson = new Gson();
        JsonObject body = gson.fromJson(bodyString, JsonObject.class);
        logger.info("Received body after executing query {} : {}",query,body);
        JsonObject bodyData = body.get("data").getAsJsonObject();
        JsonArray bodyDataListTenants = bodyData.get("listTenants").getAsJsonArray();
        TenantConfiguration tenantConfiguration;
        for(JsonElement tenantElement: bodyDataListTenants){
            JsonObject tenant = tenantElement.getAsJsonObject();
            tenantConfiguration = tenantConfigurationMapper.defaultConfigurationEntity(tenant);
            tenantConfigurationRepository.save(tenantConfiguration);
        }
    }

    @Override
    public void insertTheme(TenantThemeRequest themeRequest) {
        TenantConfigurationTheme tenantConfigurationTheme = tenantConfigurationThemeMapper.fromDTO(themeRequest);
        tenantConfigurationThemeRepository.save(tenantConfigurationTheme);
    }

    @Override
    public TenantConfigurationTheme getTenantThemeById(Long id) {
        return tenantConfigurationThemeRepository.getTenantThemeByTenantId(id);
    }
}
