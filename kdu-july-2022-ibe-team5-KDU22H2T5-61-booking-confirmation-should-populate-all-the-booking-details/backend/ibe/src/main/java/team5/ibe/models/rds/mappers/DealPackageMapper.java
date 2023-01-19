package team5.ibe.models.rds.mappers;

import team5.ibe.entities.DealPackage;
import team5.ibe.models.rds.DealPackageDTO;

public class DealPackageMapper {
    public DealPackageDTO toDTO(DealPackage dealPackage, Long promotionId){
        return DealPackageDTO.builder()
                .promotionId(promotionId)
                .description(dealPackage.getDescription())
                .minimumDaysOfStay(dealPackage.getMinimumDaysOfStay())
                .priceFactor(dealPackage.getPriceFactor())
                .title(dealPackage.getTitle())
                .build();
    }
}
