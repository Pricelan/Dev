package de.priceland_digital.shop_backend.component.mapper;
import org.springframework.stereotype.Component;

import de.priceland_digital.shop_backend.entity.Download;
import de.priceland_digital.shop_backend.service.dto.antwort.DownloadAntwort;

// Mapper-Klasse für Download-Entitäten und DTOs
@Component
public class DownloadMapper {

    // Download-Entität in Download-Antwort-DTO umwandeln
    public DownloadAntwort toAntwort(Download d) {
        return new DownloadAntwort(
            d.getSoftware().getId(),
            d.getSoftware().getName(),
            d.getSoftware().getVersion(),
            d.getLizenzKey(),
            d.getDownloadLink(),
            d.getZeitpunkt().toLocalDate(),
            d.getIpAdresse()
        );
          
    }   

    
}
