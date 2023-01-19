package team5.ibe.models.graphql;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import team5.ibe.models.rds.BillingInfoDTO;
import team5.ibe.models.rds.GuestDTO;

import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BookingDTO implements Serializable {
    private Long propertyId;
    private Long roomTypeId;
    private Long roomCount;
    private String checkInDate;
    private String checkOutDate;
    private Long adultCount;
    private Double amountDueAtResort;
    private Long childCount;
    private Long guestId;
    private Long promotionId;
    private Long statusId;
    private Double totalCost;
    private Long billingInfoId;
    private Double pricePerRoom;
    private Long duration;
    private Double subtotal;
    private Double dueNow;
    private Double occupancyTax;
    private Double totalResortFee;
    private Double taxSurchargeFeeTotal;
    private GuestDTO guestDTO;
    private BillingInfoDTO billingInfoDTO;
    private String roomTypeName;
    private String paymentCardNumber;
}
