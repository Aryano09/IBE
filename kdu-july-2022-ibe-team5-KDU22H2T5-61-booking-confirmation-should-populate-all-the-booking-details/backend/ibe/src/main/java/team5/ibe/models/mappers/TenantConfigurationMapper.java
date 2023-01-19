package team5.ibe.models.mappers;

import com.google.gson.JsonObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import team5.ibe.entities.TenantConfiguration;
import team5.ibe.models.TenantConfigurationDTO;
import team5.ibe.repositories.TenantConfigurationThemeRepository;

@Component
public class TenantConfigurationMapper {
    @Autowired
    TenantConfigurationThemeRepository tenantConfigurationThemeRepository;

    public TenantConfigurationDTO toDTO(TenantConfiguration tenantConfiguration){
        return TenantConfigurationDTO.builder()
                .showGuests(tenantConfiguration.getShowGuests())
                .showAdults(tenantConfiguration.getShowAdults())
                .showTeens(tenantConfiguration.getShowTeens())
                .showKids(tenantConfiguration.getShowKids())
                .showAccessibleRoom(tenantConfiguration.getShowAccessibleRoom())
                .showPromoCode(tenantConfiguration.getShowPromoCode())
                .roomLimit(tenantConfiguration.getRoomLimit())
                .resortFeePerRoomPerDay(tenantConfiguration.getResortFeePerRoomPerDay())
                .occupancyTaxRate(tenantConfiguration.getOccupancyTaxRate())
                .build();
    }

    public TenantConfiguration defaultConfigurationEntity(JsonObject tenant){
        final String tenantIdKey = "tenant_id";
        final String tenantNameKey = "tenant_name";
        return TenantConfiguration.builder()
                .id(tenant.get(tenantIdKey).getAsLong())
                .tenantName(tenant.get(tenantNameKey).getAsString())
                .showGuests(true)
                .showAdults(true)
                .showTeens(true)
                .showKids(true)
                .showAccessibleRoom(true)
                .showPromoCode(true)
                .roomLimit(4)
                .theme(tenantConfigurationThemeRepository.findById(Long.valueOf(1)).get())
                .build();
    }
}
