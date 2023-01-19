package team5.ibe.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import team5.ibe.models.ErrorDTO;

@ControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(NullPointerException.class)
    public ResponseEntity<ErrorDTO> handleNullPointerExceptions(){
        return new ResponseEntity<ErrorDTO>(new ErrorDTO("NULL_VALUE", "Some operation was performed on a null object"), HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
