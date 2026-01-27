package de.priceland_digital.shop_backend.service.dto.antwort;

// Antwort DTO für ein Warenkorb-Item
public record WarenkorbItemAntwort(

    Long itemId,
    SoftwareAntwort software,
    int menge

) {}
    

