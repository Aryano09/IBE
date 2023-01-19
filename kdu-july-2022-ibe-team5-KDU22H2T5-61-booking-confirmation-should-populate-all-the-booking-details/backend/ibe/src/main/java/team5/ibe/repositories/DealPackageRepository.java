package team5.ibe.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import team5.ibe.entities.DealPackage;

import java.util.List;

@Repository
public interface DealPackageRepository extends JpaRepository<DealPackage, Long> {
    @Query(value = "select * from deals_and_packages where minimum_days_of_stay <= :duration and is_deactivated = false", nativeQuery = true)
    public List<DealPackage> getDealsByMinimumDaysOfStay(@Param("duration")Long duration);
}
