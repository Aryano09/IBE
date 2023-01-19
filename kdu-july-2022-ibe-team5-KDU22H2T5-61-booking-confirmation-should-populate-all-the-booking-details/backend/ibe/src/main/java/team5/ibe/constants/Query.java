package team5.ibe.constants;

import org.springframework.stereotype.Component;
import team5.ibe.entities.DealPackage;
import team5.ibe.models.graphql.BookingDTO;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.stream.Collectors;

@Component
public class Query {
    public String getPropertiesByTenantId(Long id) {
        return "query MyQuery {\n" +
                "  listProperties(where: {tenant_id: {equals: " + id + "}}) {\n" +
                "    property_name\n" +
                "    property_id\n" +
                "  }\n" +
                "}";
    }

    public String loadTenants() {
        return "query MyQuery {\n" +
                "  listTenants {\n" +
                "    tenant_id\n" +
                "    tenant_name\n" +
                "  }\n" +
                "}\n";
    }

    public String getAvailableRooms(String checkInDate, String checkOutDate, Integer maxCapacity, Integer propertyId) {
        return "query MyQuery {\n" +
                "  listRoomAvailabilities(where: {booking_id: {equals: 0}, date: {gte: \"" + checkInDate + "\", lte: \"" + checkOutDate + "\"}, room: {room_type: {max_capacity: {gte: " + maxCapacity + "}}}, property_id: {equals: " + propertyId + "}}, orderBy: {date: ASC}) {\n" +
                "    property_id\n" +
                "    booking_id\n" +
                "    availability_id\n" +
                "    date\n" +
                "    room_id\n" +
                "    room {\n" +
                "      room_number\n" +
                "      room_type_id\n" +
                "      room_type {\n" +
                "        area_in_square_feet\n" +
                "        double_bed\n" +
                "        max_capacity\n" +
                "        room_type_name\n" +
                "        single_bed\n" +
                "      }\n" +
                "    }\n" +
                "  }\n" +
                "}";
    }

    public String getRoomTypeToRoomRateMap(String checkInDate) {
//        return "query MyQuery {\n" +
//                "  listRoomRateRoomTypeMappings(orderBy: {room_type_id: ASC}, where: {room_rate: {date: {equals: \"" + checkInDate + "\"}}}) {\n" +
//                "    room_type_id\n" +
//                "    room_rate {\n" +
//                "      room_rate_id\n" +
//                "      date\n" +
//                "      basic_nightly_rate\n" +
//                "    }\n" +
//                "  }\n" +
//                "}\n";
        return "query MyQuery {\n" +
                "  listRoomRates(where: {date: {equals: \""+ checkInDate +"\"}}) {\n" +
                "    basic_nightly_rate\n" +
                "    date\n" +
                "    room_rate_id\n" +
                "    room_types {\n" +
                "      room_type_id\n" +
                "      room_rate_id\n" +
                "    }\n" +
                "  }\n" +
                "}\n";
    }

    public String getTenantNameByTenantId(Integer tenantId) {
        return "query MyQuery {\n" +
                "        getTenant(where: {tenant_id: " + tenantId + "}) {\n" +
                "          tenant_name\n" +
                "        }\n" +
                "      }";
    }

    public String getPromotionsByMinimumDaysOfStay(Long duration) {
        return "query MyQuery {\n" +
                "  listPromotions(where: {minimum_days_of_stay: {lte: " + duration + "}, is_deactivated: {equals: false}}) {\n" +
                "    minimum_days_of_stay\n" +
                "    price_factor\n" +
                "    promotion_description\n" +
                "    promotion_id\n" +
                "    promotion_title\n" +
                "    is_deactivated\n" +
                "  }\n" +
                "}";
    }

    public static String getRoomRatesByPropertyId(Long propertyId) {
        return "query MyQuery {\n" +
                "  listRoomTypes(where: {property_id: {equals: " + propertyId +"}}) {\n" +
                "    room_type_id\n" +
                "    room_rates {\n" +
                "      room_rate {\n" +
                "        basic_nightly_rate\n" +
                "        date\n" +
                "      }\n" +
                "    }\n" +
                "    room_type_name\n" +
                "  }\n" +
                "}\n";
    }

    public static String getRoomIdsByRoomTypeId(Long roomTypeId, Long propertyId){
        return "query MyQuery {\n" +
                "  listRooms(where: {property_id: {equals: "+propertyId+"}, room_type_id: {equals: "+roomTypeId+"}}) {\n" +
                "    room_id\n" +
                "    room_number\n" +
                "    room_available {\n" +
                "      date\n" +
                "      booking_id\n" +
                "      availability_id\n" +
                "    }\n" +
                "  }\n" +
                "}";
    }

    public static String getAllPromotions(){
        return "query MyQuery {\n" +
                "  listPromotions {\n" +
                "    is_deactivated\n" +
                "    minimum_days_of_stay\n" +
                "    price_factor\n" +
                "    promotion_description\n" +
                "    promotion_id\n" +
                "    promotion_title\n" +
                "  }\n" +
                "}";
    }

    public static String createPromotion(DealPackage dealPackage){
        return "mutation MyMutation {\n" +
                "  createPromotion(data: {promotion_title: \""+dealPackage.getTitle()+"\", promotion_description: \""+dealPackage.getDescription()+"\", price_factor: "+dealPackage.getPriceFactor()+", minimum_days_of_stay: "+dealPackage.getMinimumDaysOfStay()+", is_deactivated: "+dealPackage.getIsDeactivated()+"}) {\n" +
                "    promotion_title\n" +
                "    promotion_id\n" +
                "    promotion_description\n" +
                "    price_factor\n" +
                "    minimum_days_of_stay\n" +
                "    is_deactivated\n" +
                "  }\n" +
                "}\n";
    }

    public static String createManyBookings(BookingDTO bookingDTO){
        Integer amountDueAtResort = Integer.valueOf(bookingDTO.getAmountDueAtResort().intValue());
        Integer totalCost = Integer.valueOf(bookingDTO.getTotalCost().intValue());
        return "mutation MyMutation {\n" +
                "  createManyBookings(data: {adult_count: "+bookingDTO.getAdultCount()+", amount_due_at_resort: "+amountDueAtResort+", check_in_date: \""+bookingDTO.getCheckInDate()+"\", check_out_date: \""+bookingDTO.getCheckOutDate()+"\", child_count: "+bookingDTO.getChildCount()+", guest_id: "+bookingDTO.getGuestId()+", promotion_id: "+bookingDTO.getPromotionId()+", property_id: "+bookingDTO.getPropertyId()+", status_id: "+bookingDTO.getStatusId()+", total_cost: "+totalCost+"}) {\n" +
                "    count\n" +
                "  }\n" +
                "}";
    }

    public static String createGuest(String name){
        return "mutation MyMutation {\n" +
                "  createGuest(data: {guest_name: \""+name+"\"}) {\n" +
                "    guest_id\n" +
                "    guest_name\n" +
                "  }\n" +
                "}";
    }

    public static String getBookingId(BookingDTO bookingDTO){
        return "query MyQuery {\n" +
                "  listBookings(where: {guest_id: {equals: "+bookingDTO.getGuestId()+"}, adult_count: {equals: "+bookingDTO.getAdultCount()+"}, amount_due_at_resort: {equals: "+bookingDTO.getAmountDueAtResort().intValue()+"}, check_in_date: {equals: \""+bookingDTO.getCheckInDate()+"\"}, check_out_date: {equals: \""+bookingDTO.getCheckOutDate()+"\"}, child_count: {equals: "+bookingDTO.getChildCount()+"}, promotion_id: {equals: "+bookingDTO.getPromotionId()+"}, property_id: {equals: "+bookingDTO.getPropertyId()+"}, status_id: {equals: "+bookingDTO.getStatusId()+"}, total_cost: {equals: "+bookingDTO.getTotalCost().intValue()+"}}) {\n" +
                "    booking_id\n" +
                "  }\n" +
                "}\n";
    }

    public static String updateRoomAvailability(Long bookingId, HashSet<Long> bookingAvailabilityIds){
        String bookingAvailabilityIdsString = "[";
        ArrayList<Long> bookingAvailabilityIdsList = bookingAvailabilityIds.stream().collect(Collectors.toCollection(ArrayList::new));
        Integer index;
        for(index = 0; index<bookingAvailabilityIdsList.size()-1; index++){
            bookingAvailabilityIdsString += bookingAvailabilityIdsList.get(index).toString() + ",";
        }
        bookingAvailabilityIdsString +=  bookingAvailabilityIdsList.get(index).toString() + "]";
        return "mutation MyMutation {\n" +
                "  updateManyRoomAvailabilities(data: {booking_id: "+bookingId+"}, where: {availability_id: {in: "+bookingAvailabilityIdsString+"}}) {\n" +
                "    count\n" +
                "  }\n" +
                "}\n";
    }

    public String getNightlyRates(Long propertyId){
        return "query MyQuery {\n" +
                "  listRoomTypes(where: {property_id: {equals: "+propertyId+"}, room_type_id: {equals: "+(propertyId*6)+"}}) {\n" +
                "    room_rates {\n" +
                "      room_rate {\n" +
                "        basic_nightly_rate\n" +
                "        date\n" +
                "      }\n" +
                "    }\n" +
                "  }\n" +
                "}";
    }

    public String getPromotionById(Long promotionId){
        return "query MyQuery {\n" +
                "  getPromotion(where: {promotion_id: " + promotionId + "}) {\n" +
                "    is_deactivated\n" +
                "    minimum_days_of_stay\n" +
                "    price_factor\n" +
                "    promotion_description\n" +
                "    promotion_id\n" +
                "    promotion_title\n" +
                "  }\n" +
                "}";
    }

    public static String updateBookingAsCancelled(Long bookingId){
        return "mutation MyMutation {\n" +
                "  updateBooking(data: {status_id: 2}, where: {booking_id: "+bookingId+"}) {\n" +
                "    adult_count\n" +
                "    amount_due_at_resort\n" +
                "    booking_id\n" +
                "    check_in_date\n" +
                "    check_out_date\n" +
                "    child_count\n" +
                "    guest_id\n" +
                "    promotion_id\n" +
                "    property_id\n" +
                "    status_id\n" +
                "    total_cost\n" +
                "  }\n" +
                "}";
    }
}
