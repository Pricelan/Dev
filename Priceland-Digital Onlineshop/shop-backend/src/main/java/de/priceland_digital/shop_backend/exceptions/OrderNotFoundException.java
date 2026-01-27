package de.priceland_digital.shop_backend.exceptions;

// Ausnahme für den Fall, dass eine Bestellung nicht gefunden wird
public class OrderNotFoundException extends RuntimeException{

        public OrderNotFoundException(String message) {
        super(message);
        
    }   


    
}
