package de.priceland_digital.shop_backend.service.dto.antwort;

// Antwort DTO für den Checkout-Prozess
public record CheckoutAntwort(
        String gastToken,    
        GastAntwort gast     
) {
// Antwort DTO für einen Gast im Checkout-Prozess
    public record GastAntwort(
        String vorname,
        String nachname,
        String email,
        String strasse,
        String hausnummer,
        String plz,
        String ort,
        String telefonnummer
    ) {}
}


