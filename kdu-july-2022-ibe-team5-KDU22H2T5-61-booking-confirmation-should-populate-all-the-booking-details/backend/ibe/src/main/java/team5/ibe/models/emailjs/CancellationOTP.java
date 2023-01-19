package team5.ibe.models.emailjs;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CancellationOTP implements Serializable {
    private Long booking_id;
    private String to_email;
}
