package de.priceland_digital.shop_backend.exceptions;

// Ausnahme für den Fall, dass ein Kunde bereits existiert
public class CustomerAlreadyExistsException extends RuntimeException {
    
    public CustomerAlreadyExistsException(String message) {
        super(message);
    }   
    
}
