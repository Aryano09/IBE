package team5.ibe.services;

import team5.ibe.models.rds.BillingInfoDTO;
import team5.ibe.models.rds.GuestDTO;

public interface GuestService {
    Long createGuest(GuestDTO guestDTO);

    Long createBillingInfo(BillingInfoDTO billingInfoDTO);
}
