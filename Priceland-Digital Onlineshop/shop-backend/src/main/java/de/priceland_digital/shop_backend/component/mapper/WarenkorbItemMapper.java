package de.priceland_digital.shop_backend.component.mapper;

import de.priceland_digital.shop_backend.entity.WarenkorbItem;
import de.priceland_digital.shop_backend.service.dto.antwort.WarenkorbItemAntwort;

// Mapper-Klasse für Warenkorb-Item-Entitäten und DTOs
public class WarenkorbItemMapper {

    // Warenkorb-Item-Entität in Warenkorb-Item-Antwort-DTO umwandeln
    public static WarenkorbItemAntwort toAntwort(WarenkorbItem item) {
        return new WarenkorbItemAntwort(
                item.getId(),
                SoftwareMapper.toAntwort(item.getSoftware()),
                item.getMenge()
        );
    }
}