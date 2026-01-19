package de.priceland_digital.shop_backend.service.dto.antwort;

import java.time.LocalDate;

public record DownloadAntwort (
    Long softwareId,
    String softwareName,
    String version,
    String lizenzKey,
    String downloadLink,
    LocalDate downloadDatum,
    String ipAdresse
) {
    
}
