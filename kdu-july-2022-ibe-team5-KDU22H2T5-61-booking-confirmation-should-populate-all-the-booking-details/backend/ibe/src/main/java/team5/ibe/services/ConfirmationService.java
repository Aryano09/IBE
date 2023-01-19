package team5.ibe.services;

import team5.ibe.models.rds.ConfirmationDTO;

import javax.crypto.BadPaddingException;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;
import java.security.InvalidAlgorithmParameterException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.util.List;

public interface ConfirmationService {
    ConfirmationDTO getBooking(String encryptedBookingId) throws InvalidAlgorithmParameterException, NoSuchPaddingException, IllegalBlockSizeException, NoSuchAlgorithmException, BadPaddingException, InvalidKeyException;

    List<ConfirmationDTO> getAllBookingsByUserEmail(String email);
}
