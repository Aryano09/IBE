package team5.ibe.services;

import org.springframework.stereotype.Service;
import team5.ibe.entities.TenantConfigurationTheme;
import team5.ibe.models.TenantConfigurationDTO;
import team5.ibe.models.TenantPropertiesDTO;
import team5.ibe.models.TenantThemeRequest;

import java.util.List;


public interface ConfigurationService {

    TenantConfigurationDTO getTenantConfigurationByTenantId(Long id);

    List<TenantPropertiesDTO> getPropertiesByTenantId(Long id);

    void loadTenants();

    void insertTheme(TenantThemeRequest themeRequest);

    TenantConfigurationTheme getTenantThemeById(Long id);
}
