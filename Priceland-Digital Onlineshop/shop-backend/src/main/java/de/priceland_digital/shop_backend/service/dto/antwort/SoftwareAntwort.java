package de.priceland_digital.shop_backend.service.dto.antwort;
import de.priceland_digital.shop_backend.status.KategorieListe;


import java.math.BigDecimal;



public record SoftwareAntwort (

    Long softwareId,
    String name,
    String version,
    BigDecimal preis,
    String softwareBeschreibung,
    String downloadLink,
    KategorieListe kategorieListe,
    String herstellerName
)
{ 
}
 
