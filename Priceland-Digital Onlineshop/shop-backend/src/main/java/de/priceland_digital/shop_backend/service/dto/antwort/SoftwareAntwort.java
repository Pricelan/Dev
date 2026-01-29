package de.priceland_digital.shop_backend.service.dto.antwort;
import de.priceland_digital.shop_backend.status.Kategorie;


import java.math.BigDecimal;


// Antwort DTO für eine Software
public record SoftwareAntwort (

    Long softwareId,
    String name,
    String version,
    BigDecimal preis,
    String softwareBeschreibung,
    String downloadLink,
    Kategorie kategorieListe,
    String herstellerName
    
) {}


 
