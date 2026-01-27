package de.priceland_digital.shop_backend.exceptions;

// Ausnahme für den Fall, dass ein Download verboten ist
public class ForbiddenDownloadException extends RuntimeException {
    
    public ForbiddenDownloadException(String message) {
        super(message);
    }
    
}
