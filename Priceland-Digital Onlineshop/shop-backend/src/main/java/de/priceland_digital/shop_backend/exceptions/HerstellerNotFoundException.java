package de.priceland_digital.shop_backend.exceptions;

// Ausnahme für den Fall, dass ein Hersteller nicht gefunden wird
public class HerstellerNotFoundException extends RuntimeException {

     public HerstellerNotFoundException(String message) {
        super(message);
    }
    
    
}
