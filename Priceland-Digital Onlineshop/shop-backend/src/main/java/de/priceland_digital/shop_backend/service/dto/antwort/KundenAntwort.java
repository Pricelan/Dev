package de.priceland_digital.shop_backend.service.dto.antwort;



public record KundenAntwort(
        
    Long id,
    String vorname,
    String nachname,
    String email,
    String strasse,
    String hausnummer,
    String plz,
    String ort,
    String telefonnummer
    

)
{
    
}
