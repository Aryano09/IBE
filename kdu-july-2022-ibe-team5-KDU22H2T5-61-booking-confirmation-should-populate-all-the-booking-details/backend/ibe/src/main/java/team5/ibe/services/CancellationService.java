package team5.ibe.services;

import team5.ibe.models.emailjs.CancellationOTP;

public interface CancellationService {
    String sendOTP(CancellationOTP cancellationOTP);

    String cancelBooking(Long bookingId, Long otp);
}
