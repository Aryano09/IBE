package team5.ibe.entities;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;

@Entity
@Table(name="tenant_configuration")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TenantConfiguration {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "tenant_name")
    private String tenantName;

    @Column(name = "show_guests")
    private Boolean showGuests = true;

    @Column(name = "show_adults")
    private Boolean showAdults = true;

    @Column(name = "show_teens")
    private Boolean showTeens = true;

    @Column(name = "show_kids")
    private Boolean showKids = true;

    @Column(name = "show_accessible_room")
    private Boolean showAccessibleRoom = true;

    @Column(name = "show_promo_code")
    private Boolean showPromoCode = true;

    @Column(name = "room_limit")
    private Integer roomLimit;

    @Column(name = "resort_fee_per_room_per_day")
    private Double resortFeePerRoomPerDay;

    @Column(name = "occupancy_tax_rate")
    private Double occupancyTaxRate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "theme_id", nullable = false)
    @JsonIgnore
    private TenantConfigurationTheme theme;
}
