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
@Table(name = "booking_threads")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BookingThread implements Serializable {
    @Id
    @Column(name = "room_type_id")
    private Long roomTypeId;

    @Column(name = "in_use")
    private Boolean inUse;
}
