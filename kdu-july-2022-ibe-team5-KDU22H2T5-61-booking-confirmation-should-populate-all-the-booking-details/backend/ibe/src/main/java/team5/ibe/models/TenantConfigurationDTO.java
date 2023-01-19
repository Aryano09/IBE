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
public class TenantConfigurationDTO implements Serializable {
    private Boolean showGuests;
    private Boolean showAdults;
    private Boolean showTeens;
    private Boolean showKids;
    private Boolean showAccessibleRoom;
    private Boolean showPromoCode;
    private Integer roomLimit;
    private Double resortFeePerRoomPerDay;
    private Double occupancyTaxRate;
}
