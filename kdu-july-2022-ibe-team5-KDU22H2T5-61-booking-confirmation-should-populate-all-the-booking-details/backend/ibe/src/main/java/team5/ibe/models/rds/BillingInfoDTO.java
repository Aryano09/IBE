package team5.ibe.models.rds;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BillingInfoDTO implements Serializable {
    private String firstName;
    private String lastName;
    private String mailingAddress1;
    private String mailingAddress2;
    private String country;
    private String city;
    private String state;
    private Long zip;
    private Long phone;
    private String email;
    private Long guestId;
}
