package de.priceland_digital.shop_backend.component.mapper;

import de.priceland_digital.shop_backend.entity.Software;
import de.priceland_digital.shop_backend.service.dto.antwort.SoftwareAntwort;

// Mapper-Klasse für Software-Entitäten und DTOs
public class SoftwareMapper {

    // Software-Entität in Software-Antwort-DTO umwandeln
    public static SoftwareAntwort toAntwort(Software software) {
        return new SoftwareAntwort(
                software.getId(),
                software.getName(),
                software.getVersion(),
                software.getPreis(),
                software.getSoftwareBeschreibung(),
                software.getDownloadLink(),
                software.getKategorie(),
                software.getHersteller().getName()
        );
    }
    
}
