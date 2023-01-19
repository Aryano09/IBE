package team5.ibe.entities;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "deals_and_packages")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DealPackage implements Serializable {
    @Id
    @Column(name = "promotion_id")
    private Long id;
    @Column(name = "is_deactivated")
    private Boolean isDeactivated;
    @Column(name = "minimum_days_of_stay")
    private Long minimumDaysOfStay;
    @Column(name = "price_factor")
    private Double priceFactor;
    @Column(name = "promotion_description")
    private String description;
    @Column(name = "promotion_title", unique = true)
    private String title;
    @Column(name = "category")
    private String category;
}
