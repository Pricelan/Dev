package de.priceland_digital.shop_backend.service.dto.antwort;

public record CheckoutAntwort(
        String gastToken,    
        GastAntwort gast     
) {
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


