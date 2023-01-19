package team5.ibe.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "room_types", uniqueConstraints = {@UniqueConstraint(name = "UniqueTenantAndPropertyAndRoomType", columnNames = {"tenant_id","property_id","room_type_id"})})
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class RoomType implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "tenant_id")
    private Long tenantId;
    @Column(name = "property_id")
    private Long propertyId;
    @Column(name = "room_type_id")
    private Long roomTypeId;

    @Column(name = "description_id", insertable = false, updatable = false)
    private Long descriptionId;

//    @JsonBackReference
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "description_id")
    private Description description;

    @Override
    public String toString() {
        return "RoomType{" +
                "id=" + id +
                ", tenantId=" + tenantId +
                ", propertyId=" + propertyId +
                ", roomTypeId=" + roomTypeId +
                ", description=" + description +
                '}';
    }

    //    @JsonIgnore
    @ManyToMany
    @JoinTable(name = "room_type_amenities",
    joinColumns = @JoinColumn(name = "room_type_id"),
    inverseJoinColumns = @JoinColumn(name = "amenity_id"))
    private Set<Amenity> amenities;
}
