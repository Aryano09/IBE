package team5.ibe.models.graphql;

import com.google.gson.annotations.SerializedName;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class NightlyRatesDTO {
    @SerializedName(value = "basic_nightly_rate")
    private Long basicNightlyRate;
    @SerializedName(value = "date")
    private String date;
}
