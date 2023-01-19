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
@Table(name = "concurrent_booking_threads")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ConcurrentBookingThread implements Serializable {
    @Id
    @Column(name = "propertyId_roomTypeId_date")
    private String key;
}
