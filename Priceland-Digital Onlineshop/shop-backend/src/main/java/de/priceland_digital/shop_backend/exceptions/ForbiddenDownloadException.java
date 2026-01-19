package de.priceland_digital.shop_backend.exceptions;

public class ForbiddenDownloadException extends RuntimeException {
    public ForbiddenDownloadException(String message) {
        super(message);
    }
    
}
