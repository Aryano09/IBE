package team5.ibe.models.rds;

import team5.ibe.entities.*;
import team5.ibe.models.graphql.BookingDTO;

public class Mapper {

    public static Guest fromGuestDTO(GuestDTO guestDTO, Long guestId){
        return Guest.builder()
                .id(guestId)
                .firstName(guestDTO.getFirstName())
                .lastName(guestDTO.getLastName())
                .email(guestDTO.getEmail())
                .phone(guestDTO.getPhone())
                .build();
    }

    public static BillingInfo fromBillingInfoDTO(BillingInfoDTO billingInfoDTO){
        return BillingInfo.builder()
                .firstName(billingInfoDTO.getFirstName())
                .lastName(billingInfoDTO.getLastName())
                .mailingAddress1(billingInfoDTO.getMailingAddress1())
                .mailingAddress2(billingInfoDTO.getMailingAddress2())
                .country(billingInfoDTO.getCountry())
                .city(billingInfoDTO.getCity())
                .state(billingInfoDTO.getState())
                .zip(billingInfoDTO.getZip())
                .phone(billingInfoDTO.getPhone())
                .email(billingInfoDTO.getEmail())
                .build();
    }

    public static Booking fromBookingDTO(BookingDTO bookingDTO, Guest guest, BookingStatus bookingStatus, BillingInfo billingInfo, Long bookingId){
        return Booking.builder()
                .id(bookingId)
                .propertyId(bookingDTO.getPropertyId())
                .paymentCardNumber(bookingDTO.getPaymentCardNumber())
                .roomTypeId(bookingDTO.getRoomTypeId())
                .checkInDate(bookingDTO.getCheckInDate())
                .checkOutDate(bookingDTO.getCheckOutDate())
                .adultCount(bookingDTO.getAdultCount())
                .amountDueAtResort(bookingDTO.getAmountDueAtResort())
                .childCount(bookingDTO.getChildCount())
                .guest(guest)
                .promotionId(bookingDTO.getPromotionId())
                .pricePerRoom(bookingDTO.getPricePerRoom())
                .duration(bookingDTO.getDuration())
                .subtotal(bookingDTO.getSubtotal())
                .dueNow(bookingDTO.getDueNow())
                .occupancyTax(bookingDTO.getOccupancyTax())
                .totalResortFee(bookingDTO.getTotalResortFee())
                .taxSurchargeFeeTotal(bookingDTO.getTaxSurchargeFeeTotal())
                .bookingStatus(bookingStatus)
                .totalCost(bookingDTO.getTotalCost())
                .billingInfo(billingInfo)
                .roomCount(bookingDTO.getRoomCount())
                .roomTypeName(bookingDTO.getRoomTypeName())
                .build();
    }

    public GuestDTO toGuestDTO (Guest guest){
        return GuestDTO.builder()
                .firstName(guest.getFirstName())
                .lastName(guest.getLastName())
                .phone(guest.getPhone())
                .email(guest.getEmail())
                .build();
    }

    public BillingInfoDTO toBillingInfoDTO(BillingInfo billingInfo ,Long guestId){
        return BillingInfoDTO.builder()
                .firstName(billingInfo.getFirstName())
                .lastName(billingInfo.getLastName())
                .mailingAddress1(billingInfo.getMailingAddress1())
                .mailingAddress2(billingInfo.getMailingAddress2())
                .country(billingInfo.getCountry())
                .state(billingInfo.getState())
                .city(billingInfo.getCity())
                .zip(billingInfo.getZip())
                .phone(billingInfo.getPhone())
                .email(billingInfo.getEmail())
                .guestId(guestId)
                .build();
    }

    public BookingStatusDTO toBookingStatusDTO(BookingStatus bookingStatus){
        return BookingStatusDTO.builder()
                .id(bookingStatus.getId())
                .status(bookingStatus.getStatus())
                .isDeactivated(bookingStatus.getIsDeactivated())
                .build();
    }

    public ConfirmationDTO toConfirmationDTO(Booking booking){
        return ConfirmationDTO.builder()
                .bookingId(booking.getId())
                .encryptedBookingId(booking.getEncryptedBookingId())
                .adultCount(booking.getAdultCount())
                .childCount(booking.getChildCount())
                .roomCount(booking.getRoomCount())
                .roomTypeId(booking.getRoomTypeId())
                .roomTypeName(booking.getRoomTypeName())
                .checkInDate(booking.getCheckInDate())
                .checkOutDate(booking.getCheckOutDate())
                .promotionId(booking.getPromotionId())
                .nightlyRate(booking.getPricePerRoom())
                .subtotal(booking.getSubtotal())
                .amountDueAtResort(booking.getAmountDueAtResort())
                .taxSurchargeFeeTotal(booking.getTaxSurchargeFeeTotal())
                .totalCost(booking.getTotalCost())
                .guestDTO(toGuestDTO(booking.getGuest()))
                .billingInfoDTO(toBillingInfoDTO(booking.getBillingInfo(),booking.getGuest().getId()))
                .bookingStatusDTO(toBookingStatusDTO((booking.getBookingStatus())))
                .duration(booking.getDuration())
                .paymentCardNumber(booking.getPaymentCardNumber())
                .build();
    }

    public RoomTypeReview fromRoomTypeReviewDTO(RoomTypeReviewDTO roomTypeReviewDTO){
        return RoomTypeReview.builder()
                .roomTypeId(roomTypeReviewDTO.getRoomTypeId())
                .description(roomTypeReviewDTO.getDescription())
                .rating(roomTypeReviewDTO.getRating())
                .username(roomTypeReviewDTO.getUsername())
                .build();
    }

    public RoomTypeReviewDTO toRoomTypeReviewDTO(RoomTypeReview roomTypeReview){
        return RoomTypeReviewDTO.builder()
                .roomTypeId(roomTypeReview.getRoomTypeId())
                .description(roomTypeReview.getDescription())
                .rating(roomTypeReview.getRating())
                .username(roomTypeReview.getUsername())
                .build();
    }
}
