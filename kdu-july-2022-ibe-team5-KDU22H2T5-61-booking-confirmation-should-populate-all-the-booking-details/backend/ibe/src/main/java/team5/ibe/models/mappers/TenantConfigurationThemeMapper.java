package team5.ibe.models.mappers;

import org.springframework.stereotype.Component;
import team5.ibe.entities.TenantConfigurationTheme;
import team5.ibe.models.TenantThemeRequest;

@Component
public class TenantConfigurationThemeMapper {

    public TenantConfigurationTheme fromDTO(TenantThemeRequest themeRequest){
        return TenantConfigurationTheme.builder()
                .primaryColor(themeRequest.getPrimaryColor())
                .secondaryColor(themeRequest.getSecondaryColor())
                .backgroundColor(themeRequest.getBackgroundColor())
                .background(themeRequest.getBackground())
                .build();
    }
}
