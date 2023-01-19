package team5.ibe.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import team5.ibe.entities.BillingInfo;

import java.util.List;

@Repository
public interface BillingInfoRepository extends JpaRepository<BillingInfo, Long> {
    @Query(value = "select * from billing_info where id=:billingInfoId", nativeQuery = true)
    public List<BillingInfo> getBillingInfoById(@Param("billingInfoId")Long id);
}
