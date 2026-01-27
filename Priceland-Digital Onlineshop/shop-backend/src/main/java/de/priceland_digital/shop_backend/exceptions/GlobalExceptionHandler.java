package de.priceland_digital.shop_backend.exceptions;

import java.util.HashMap;
import java.util.Map;
import java.time.LocalDateTime;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;


// Globaler Ausnahme-Handler für die Anwendung
@RestControllerAdvice
public class GlobalExceptionHandler  {

    // Hilfsmethode zum Erstellen einer standardisierten Antwort
    private ResponseEntity<Map<String, Object>> buildResponse(HttpStatus status, String message) {
    Map<String, Object> body = new HashMap<>();
    body.put("timestamp", LocalDateTime.now());
    body.put("status", status.value());
    body.put("error", status.getReasonPhrase());
    body.put("message", message);

    return new ResponseEntity<>(body, status);
    }
    
    // Ausnahme-Handler-Methoden für verschiedene Ausnahmetypen
    @ExceptionHandler
     public ResponseEntity<Map<String, Object>> handleSoftwareNotFoundException(SoftwareNotFoundException ex) {
         return buildResponse(HttpStatus.NOT_FOUND, ex.getMessage());
    }

    @ExceptionHandler
     public ResponseEntity<Map<String, Object>> handleHerstellerNotFoundException(HerstellerNotFoundException ex) {
         return buildResponse(HttpStatus.NOT_FOUND, ex.getMessage());
    }
    
    @ExceptionHandler
     public ResponseEntity<Map<String, Object>> handleOrdnerNotFoundException(OrderNotFoundException ex) {
         return buildResponse(HttpStatus.NOT_FOUND, ex.getMessage());
    }
    

    @ExceptionHandler(CustomerNotFoundException.class)
    public ResponseEntity<Map<String, Object>> handleCustomerNotFoundException(CustomerNotFoundException ex) {
      return buildResponse(HttpStatus.NOT_FOUND, ex.getMessage());

    }

    @ExceptionHandler(CustomerAlreadyExistsException.class)
    public ResponseEntity<Map<String, Object>> handleCustomerAlreadyExistsException(CustomerAlreadyExistsException ex) {
         return buildResponse(HttpStatus.CONFLICT, ex.getMessage());
    }

    @ExceptionHandler(IllegalStateException.class)
    public ResponseEntity<Map<String, Object>> handleIllegalState(IllegalStateException ex) {
        return buildResponse(HttpStatus.CONFLICT, ex.getMessage());
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<Map<String, Object>> handleIllegalArgument(IllegalArgumentException ex) {
        return buildResponse(HttpStatus.BAD_REQUEST, ex.getMessage());
    }

    @ExceptionHandler(ForbiddenDownloadException.class)
    public ResponseEntity<Map<String, Object>> handleForbiddenDownloadException(ForbiddenDownloadException ex) {
        return buildResponse(HttpStatus.FORBIDDEN, ex.getMessage());
    }

  
}
