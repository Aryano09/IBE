package team5.ibe.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import team5.ibe.entities.Guest;

import java.util.List;

@Repository
public interface GuestRepository extends JpaRepository<Guest, Long> {
    @Query(value = "select * from guests where id=:guestId", nativeQuery = true)
    public List<Guest> getGuestById(@Param("guestId")Long guestId);

    @Query(value = "select id from guests where email=:email", nativeQuery = true)
    public List<Long> findGuestIdsByEmail(@Param("email")String email);
}
