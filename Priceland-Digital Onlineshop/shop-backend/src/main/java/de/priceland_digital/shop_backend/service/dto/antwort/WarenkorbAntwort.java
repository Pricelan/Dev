package de.priceland_digital.shop_backend.service.dto.antwort;


import java.math.BigDecimal;
import java.util.List;

// Antwort DTO für den Warenkorb
public record WarenkorbAntwort(

    Long warenkorbId,
    List<WarenkorbItemAntwort> positionen,
    int gesamtmenge,
    BigDecimal gesamtpreis
    
   ) {}

