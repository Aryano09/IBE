package team5.ibe.models.graphql;

import com.google.gson.annotations.SerializedName;
import lombok.*;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PromotionDTO {
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
        return "PromotionDTO{" +
                "minimumDaysOfStay=" + minimumDaysOfStay +
                ", priceFactor=" + priceFactor +
                ", description='" + description + '\'' +
                ", title='" + title + '\'' +
                '}';
    }
}
