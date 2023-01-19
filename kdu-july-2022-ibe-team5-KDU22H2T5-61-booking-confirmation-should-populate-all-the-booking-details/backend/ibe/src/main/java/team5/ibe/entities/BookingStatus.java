package team5.ibe.entities;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.io.Serializable;

@Entity
@Table(name = "booking_statuses")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BookingStatus implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "status_id")
    private Long id;

    @Column(name = "status")
    @NotBlank(message = "status can not be blank")
    @NotNull(message = "status can not be null")
    private String status;

    @Column(name = "is_deactivated")
    @NotNull(message = "is_deactivated can not be null")
    private Boolean isDeactivated;
}
