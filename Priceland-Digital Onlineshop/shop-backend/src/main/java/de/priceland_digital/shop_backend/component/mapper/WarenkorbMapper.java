package de.priceland_digital.shop_backend.component.mapper;

import de.priceland_digital.shop_backend.entity.Warenkorb;
import de.priceland_digital.shop_backend.service.dto.antwort.*;
import java.util.List;

// Mapper-Klasse für Warenkorb-Entitäten und DTOs
public class WarenkorbMapper {

    // Warenkorb-Entität in Warenkorb-Antwort-DTO umwandeln    
    public static WarenkorbAntwort toAntwort(Warenkorb warenkorb) {
        List<WarenkorbItemAntwort> positionen =
                warenkorb.getPositionen().stream()
                        .map(WarenkorbItemMapper::toAntwort) 
                        .toList();

        int gesamtMenge = positionen.stream()
                .mapToInt(WarenkorbItemAntwort::menge)
                .sum();

        var gesamtPreis = positionen.stream()
                .map(p -> p.software().preis().multiply(
                        java.math.BigDecimal.valueOf(p.menge())))
                .reduce(java.math.BigDecimal.ZERO, java.math.BigDecimal::add);

        return new WarenkorbAntwort(
                warenkorb.getId(),
                positionen,
                gesamtMenge,
                gesamtPreis
        );
    }
   
}