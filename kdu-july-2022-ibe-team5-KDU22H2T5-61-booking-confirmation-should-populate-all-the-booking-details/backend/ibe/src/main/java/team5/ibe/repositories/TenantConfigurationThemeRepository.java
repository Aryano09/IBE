package team5.ibe.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import team5.ibe.entities.TenantConfiguration;
import team5.ibe.entities.TenantConfigurationTheme;

@Repository
public interface TenantConfigurationThemeRepository extends JpaRepository<TenantConfigurationTheme, Long> {
    @Query(value = "select * from tenant_configuration_theme inner join tenant_configuration on tenant_configuration.theme_id = tenant_configuration_theme.id where tenant_configuration.id = :id", nativeQuery = true)
    public TenantConfigurationTheme getTenantThemeByTenantId(Long id);
}
