package team5.ibe.models.rds;

import com.google.gson.annotations.SerializedName;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class DealPackageDTO implements Serializable {
    @SerializedName(value = "promotion_id")
    private Long promotionId;
    @SerializedName(value = "minimum_days_of_stay")
    private Long minimumDaysOfStay;
    @SerializedName(value = "price_factor")
    private Double priceFactor;
    @SerializedName(value = "promotion_description")
    private String description;
    @SerializedName(value = "promotion_title")
    private String title;

    @Override
    public String toString() {
        return "DealPackageDTO{" +
                "minimumDaysOfStay=" + minimumDaysOfStay +
                ", priceFactor=" + priceFactor +
                ", description='" + description + '\'' +
                ", title='" + title + '\'' +
                '}';
    }
}
