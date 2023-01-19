package team5.ibe.entities;

import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.io.Serializable;

@Entity
@Table(name = "bookings")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Booking  {
    @Id
    @Column(name = "id")
    private Long id;

    @Column(name = "payment_card_number")
    @NotBlank(message = "payment_card_number can not be blank")
    @NotNull(message = "payment_card_number can not be null")
    private String paymentCardNumber;

    @Column(name = "amount_due_at_resort")
    @NotNull(message = "amount_due_at_resort can not be null")
    private Double amountDueAtResort;

    @Column(name = "adult_count")
    @NotNull(message = "adult_count can not be null")
    private Long adultCount;

    @Column(name = "check_in_date")
    @NotBlank(message = "check_in_date can not be blank")
    @NotNull(message = "check_in_date can not be null")
    private String checkInDate;

    @Column(name = "check_out_date")
    @NotBlank(message = "check_out_date can not be blank")
    @NotNull(message = "check_out_date can not be null")
    private String checkOutDate;

    @Column(name = "child_count")
    @NotNull(message = "child_count can not be null")
    private Long childCount;

    @Column(name = "property_id")
    @NotNull(message = "property_id can not be null")
    @Min(5)
    @Max(5)
    private Long propertyId;

    @Column(name = "total_cost")
    @NotNull(message = "total_cost can not be null")
    private Double totalCost;

    @Column(name = "room_type_id")
    private Long roomTypeId;

    @Column(name = "promotion_id")
    private Long promotionId;

    @Column(name = "price_per_room")
    private Double pricePerRoom;

    @Column(name = "duration")
    private Long duration;

    @Column(name = "subtotal")
    private Double subtotal;

    @Column(name = "due_now")
    private Double dueNow;

    @Column(name = "occupancy_tax")
    private Double occupancyTax;

    @Column(name = "total_resort_fee")
    private Double totalResortFee;

    @Column(name = "tax_surcharge_fee_total")
    private Double taxSurchargeFeeTotal;

    @Column(name = "room_count")
    private Long roomCount;

    @Column(name = "room_type_name")
    private String roomTypeName;

    @Column(name = "encrypted_booking_id")
    private String encryptedBookingId;

    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private Guest guest;

    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private BillingInfo billingInfo;

    @Override
    public String toString() {
        return "\nBooking{" +
                "id=" + id +
                ", paymentCardNumber='" + paymentCardNumber + '\'' +
                ", amountDueAtResort=" + amountDueAtResort +
                ", adultCount=" + adultCount +
                ", checkInDate='" + checkInDate + '\'' +
                ", checkOutDate='" + checkOutDate + '\'' +
                ", childCount=" + childCount +
                ", propertyId=" + propertyId +
                ", totalCost=" + totalCost +
                ", roomTypeId=" + roomTypeId +
                ", promotionId=" + promotionId +
                ", pricePerRoom=" + pricePerRoom +
                ", duration=" + duration +
                ", subtotal=" + subtotal +
                ", dueNow=" + dueNow +
                ", occupancyTax=" + occupancyTax +
                ", totalResortFee=" + totalResortFee +
                ", taxSurchargeFeeTotal=" + taxSurchargeFeeTotal +
                ", roomCount=" + roomCount +
                ", roomTypeName='" + roomTypeName + '\'' +
                ", encryptedBookingId='" + encryptedBookingId + '\'' +
                ", statusId=" + bookingStatus.getStatus()+
                "}\n";
    }

    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
//    @MapsId
    @JoinColumn(name = "status_id")
    private BookingStatus bookingStatus;
}
