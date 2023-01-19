package team5.ibe.models.emailjs;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TemplateParamDTO implements Serializable {
    private String booking_id;
    private String guest_first_name;
    private String guest_last_name;
    private String url;
    private String room_type_name;
    private String check_in_date;
    private String check_out_date;
    private Double nightly_rate;
    private Long room_count;
    private Double subtotal;
    private Double tax;
    private Double due_at_resort;
    private Double total_cost;
    private String guest_email;

    @Override
    public String toString() {
        return "{\"booking_id\":"+booking_id+",\"guest_first_name\":\""+guest_first_name+"\",\"guest_last_name\":\""+guest_last_name+"\",\"url\":\""+url+"\",\"room_type_name\":\""+room_type_name+"\",\"check_in_date\":\""+check_in_date+"\",\"check_out_date\":\""+check_out_date+"\",\"nightly_rate\":"+nightly_rate+",\"room_count\":"+room_count+",\"subtotal\":"+subtotal+",\"tax\":"+tax+",\"due_at_resort\":"+due_at_resort+",\"total_cost\":"+total_cost+",\"guest_email\":\""+guest_email+"\"}";
    }
}