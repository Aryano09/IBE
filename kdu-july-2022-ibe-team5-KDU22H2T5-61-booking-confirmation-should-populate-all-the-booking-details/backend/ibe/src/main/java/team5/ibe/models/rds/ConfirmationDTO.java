package team5.ibe.models.rds;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import team5.ibe.entities.BillingInfo;
import team5.ibe.entities.BookingStatus;
import team5.ibe.entities.Guest;
import team5.ibe.models.graphql.PromotionDTO;

import java.io.Serializable;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ConfirmationDTO implements Serializable {
    private Long bookingId;
    private String encryptedBookingId;
    private Double amountDueAtResort;
    private Long adultCount;
    private Long childCount;
    private Long roomCount;
    private String roomTypeName;
    private String checkInDate;
    private String checkOutDate;
    private Long promotionId;
    private Double nightlyRate;
    private Double subtotal;
    private Double taxSurchargeFeeTotal;
    private Double totalCost;
    private GuestDTO guestDTO;
    private BillingInfoDTO billingInfoDTO;
    private Long roomTypeId;
    private Long duration;
    private BookingStatusDTO bookingStatusDTO;
    private PromotionDTO promotionDTO;
    private String paymentCardNumber;
}
