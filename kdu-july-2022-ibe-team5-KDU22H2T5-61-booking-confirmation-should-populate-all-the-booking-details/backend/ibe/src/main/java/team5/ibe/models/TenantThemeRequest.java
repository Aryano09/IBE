package team5.ibe.models;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TenantThemeRequest implements Serializable {
    private String primaryColor;
    private String secondaryColor;
    private String backgroundColor;
    private String background;
}
