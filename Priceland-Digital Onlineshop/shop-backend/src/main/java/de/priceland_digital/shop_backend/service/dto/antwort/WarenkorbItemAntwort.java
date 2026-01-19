package de.priceland_digital.shop_backend.service.dto.antwort;

public record WarenkorbItemAntwort(

    Long itemId,
    SoftwareAntwort software,
    int menge) {
}
