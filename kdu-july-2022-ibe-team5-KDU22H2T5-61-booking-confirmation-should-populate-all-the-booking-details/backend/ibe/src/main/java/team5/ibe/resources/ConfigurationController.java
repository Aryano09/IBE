package team5.ibe.resources;

import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import team5.ibe.entities.TenantConfigurationTheme;
import team5.ibe.models.TenantConfigurationDTO;
import team5.ibe.models.TenantPropertiesDTO;
import team5.ibe.models.TenantThemeRequest;
import team5.ibe.repositories.TenantConfigurationRepository;
import team5.ibe.repositories.TenantConfigurationThemeRepository;
import team5.ibe.services.ConfigurationService;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/config")
@Slf4j
public class ConfigurationController {
    private final Logger logger = LoggerFactory.getLogger(ConfigurationController.class);
    @Autowired
    private ConfigurationService configurationService;
    @PostMapping({"/tenants","/tenants/"})
    public ResponseEntity<Object> loadTenants(){
        logger.debug("Request to load tenants from GraphQL into RDS");
        configurationService.loadTenants();
        return new ResponseEntity<>("Successfully loaded all the tenants", HttpStatus.OK);
    }

    @GetMapping({"/tenants/{id}/properties","/tenants/{id}/properties/"})
    public ResponseEntity<Object> getPropertiesByTenantId(@PathVariable("id")Long id){
        logger.debug("Request to get list of properties for a particular tenant from GraphQL");
        List<TenantPropertiesDTO> tenantPropertiesDTOList =  configurationService.getPropertiesByTenantId(id);
        return new ResponseEntity<>(tenantPropertiesDTOList, HttpStatus.OK);
    }

    @PostMapping({"/tenants/theme", "/tenants/theme/"})
    public void insertTheme(@RequestBody TenantThemeRequest themeRequest){
        logger.debug("Request to get insert a new theme into RDS");
        configurationService.insertTheme(themeRequest);
    }

    @GetMapping({"/tenants/{id}/theme", "/tenants/{id}/theme/"})
    public ResponseEntity<Object> getTenantThemeById(@PathVariable("id")Long id){
        logger.debug("Request to get theme for a particular tenant from RDS");
        TenantConfigurationTheme theme = configurationService.getTenantThemeById(id);
        logger.debug("Fetched theme for {} : {}",id,theme.toString());
        return new ResponseEntity<>(theme, HttpStatus.OK);
    }

    @GetMapping({"/tenants/{id}", "/tenants/{id}/"})
    public ResponseEntity<Object> getTenantConfigurationByTenantId(@PathVariable("id")Long id){
        logger.debug("Request to get configuration for a particular tenant from RDS");
        TenantConfigurationDTO tenantConfigurationDTO = configurationService.getTenantConfigurationByTenantId(id);
        return new ResponseEntity<>(tenantConfigurationDTO, HttpStatus.OK);
    }
}
