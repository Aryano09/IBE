package team5.ibe.entities;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.io.Serializable;

@Entity
@Table(name = "bookings_otp")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BookingOTP implements Serializable {
    @Id
    @Column(name = "booking_id")
    private Long bookingId;

    @Column(name = "otp")
    private Long otp;

    @Column(name = "chances_left")
    private Long chancesLeft;
}
