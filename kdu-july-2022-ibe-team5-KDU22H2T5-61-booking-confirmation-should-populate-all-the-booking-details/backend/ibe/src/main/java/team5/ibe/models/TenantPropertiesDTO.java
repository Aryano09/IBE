package team5.ibe.models;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TenantPropertiesDTO implements Serializable {
    private String propertyName;
    private Long propertyId;
}
