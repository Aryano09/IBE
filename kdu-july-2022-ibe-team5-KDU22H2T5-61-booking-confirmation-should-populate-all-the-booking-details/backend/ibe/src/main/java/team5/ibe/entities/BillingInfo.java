package team5.ibe.entities;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.io.Serializable;

@Entity
@Table(name = "billing_info")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BillingInfo implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "first_name")
    @NotBlank(message = "First name can not be blank")
    @NotNull(message = "First name can not be null")
    private String firstName;

    @Column(name = "last_name")
    @NotBlank(message = "Last name can not be blank")
    @NotNull(message = "Last name can not be null")
    private String lastName;

    @Column(name = "mailing_address_1")
    @NotBlank(message = "mailing_address_1 can not be blank")
    @NotNull(message = "mailing_address_1 can not be null")
    private String mailingAddress1;

    @Column(name = "mailing_address_2")
    @NotBlank(message = "mailing_address_2 can not be blank")
    @NotNull(message = "mailing_address_2 can not be null")
    private String mailingAddress2;

    @Column(name = "country")
    @NotBlank(message = "country can not be blank")
    @NotNull(message = "country can not be null")
    private String country;

    @Column(name = "city")
    @NotBlank(message = "city can not be blank")
    @NotNull(message = "city can not be null")
    private String city;

    @Column(name = "state")
    @NotBlank(message = "state can not be blank")
    @NotNull(message = "state can not be null")
    private String state;

    @Column(name = "zip")
    @NotNull(message = "zip can not be null")
    private Long zip;

    @Column(name = "phone")
    private Long phone;

    @Column(name = "email")
    @NotBlank(message = "Email can not be blank")
    @Email(regexp = "[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,3}",
            flags = Pattern.Flag.CASE_INSENSITIVE)
    private String email;

    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private Guest guest;
}
