package team5.ibe.entities;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.io.Serializable;

@Entity
@Table(name = "guests")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Guest implements Serializable {
    @Id
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

    @Column(name = "phone")
    private Long phone;

    @Column(name = "email")
    @NotBlank(message = "Email can not be blank")
    @Email(regexp = "[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,3}",
            flags = Pattern.Flag.CASE_INSENSITIVE)
    private String email;
}
