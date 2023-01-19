package team5.ibe.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import team5.ibe.entities.TenantConfiguration;

import java.util.List;

@Repository
public interface TenantConfigurationRepository extends JpaRepository<TenantConfiguration, Long> {
    @Query(value = "select * from tenant_configuration where tenant_configuration.id = :id", nativeQuery = true)
    public TenantConfiguration getTenantsById(String id);
}
