package team5.ibe.models.mappers;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import team5.ibe.models.TenantPropertiesDTO;

import java.util.ArrayList;
import java.util.List;

@Component
public class TenantPropertiesMapper {
    private final Logger logger = LoggerFactory.getLogger(TenantPropertiesMapper.class);
    public TenantPropertiesDTO toDTO(JsonElement property){
        return TenantPropertiesDTO.builder()
                .propertyName(property.getAsJsonObject().get("property_name").getAsString())
                .propertyId(property.getAsJsonObject().get("property_id").getAsLong())
                .build();
    }

    public List<TenantPropertiesDTO> toDTOList(String bodyString){
        ArrayList<TenantPropertiesDTO> tenantProperties = new ArrayList<>();
        Gson gson = new Gson();
        JsonObject body = gson.fromJson(bodyString, JsonObject.class);
        JsonObject data = body.get("data").getAsJsonObject();
        JsonArray listProperties = data.get("listProperties").getAsJsonArray();
        for(JsonElement property: listProperties){
            TenantPropertiesDTO tenantPropertiesDTO = this.toDTO(property);
            tenantProperties.add(tenantPropertiesDTO);
        }
        return tenantProperties;
    }
}
