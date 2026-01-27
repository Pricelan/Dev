package de.priceland_digital.shop_backend.component.mapper;

import de.priceland_digital.shop_backend.entity.Bestellposition;
import de.priceland_digital.shop_backend.service.dto.antwort.BestellPositionAntwort;
import java.util.List;
import org.springframework.stereotype.Component;

// Mapper-Klasse für Bestellposition-Entitäten und DTOs
@Component
public class BestellPositionMapper {

   // Bestellposition-Entität in Bestellposition-Antwort-DTO umwandeln
   public static BestellPositionAntwort toAntwort(Bestellposition pos) {
    return new BestellPositionAntwort(
            pos.getId(),
            SoftwareMapper.toAntwort(pos.getSoftware()),
            pos.getMenge(),
            pos.getEinzelpreis()
    );
}
    // Liste von Bestellposition-Entitäten in Liste von Bestellposition-Antwort-DTOs umwandeln
    public static List<BestellPositionAntwort> toAntwortListe(List<Bestellposition> positionen) {
        if (positionen == null) return List.of();
        return positionen.stream()
                .map(BestellPositionMapper::toAntwort)
                .toList();
    }
}