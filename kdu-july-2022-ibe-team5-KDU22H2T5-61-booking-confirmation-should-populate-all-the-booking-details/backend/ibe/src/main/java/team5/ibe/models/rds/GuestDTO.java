package team5.ibe.models.rds;

import com.google.gson.annotations.SerializedName;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class GuestDTO implements Serializable {
    private String firstName;
    private String lastName;
    private Long phone;
    private String email;
}
