package team5.ibe.entities;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "bookings_availability_ids")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BookingAvailability implements Serializable {
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private Long id;

    @Column(name = "booking_id")
    private Long bookingId;

    @Column(name = "availability_id")
    private Long availabilityId;
}
