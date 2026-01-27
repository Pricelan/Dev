package de.priceland_digital.shop_backend.component.mapper;

import org.springframework.stereotype.Component;
import de.priceland_digital.shop_backend.entity.Kunde;

import de.priceland_digital.shop_backend.service.dto.antwort.KundenAntwort;

// Mapper-Klasse für Kunden-Entitäten und DTOs
@Component
public class KundenMapper {

// Kunden-Entität in Kunden-Antwort-DTO umwandeln
public KundenAntwort toAntwort(Kunde k) {
    return new KundenAntwort(
         k.getId(),
         k.getVorname(),
         k.getNachname(),
         k.getEmail(),
         k.getStrasse(),
         k.getHausnummer(),
         k.getPlz(),
         k.getOrt(),         
         k.getTelefonnummer()

    );
}
}