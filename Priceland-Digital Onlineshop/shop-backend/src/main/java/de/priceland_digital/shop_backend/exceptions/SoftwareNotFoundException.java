package de.priceland_digital.shop_backend.exceptions;

// Ausnahme für den Fall, dass eine Software nicht gefunden wird
public class SoftwareNotFoundException  extends RuntimeException{

     public SoftwareNotFoundException(String message) {
        super(message);
        
}
}
