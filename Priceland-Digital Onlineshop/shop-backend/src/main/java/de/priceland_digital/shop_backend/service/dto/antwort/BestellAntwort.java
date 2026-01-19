package de.priceland_digital.shop_backend.service.dto.antwort;

import java.math.BigDecimal;



import de.priceland_digital.shop_backend.status.BestellStatus;
import java.time.LocalDateTime;


import java.util.List;

public record BestellAntwort(
        Long id,
        String käuferName,
        BigDecimal gesamtpreis,
        BestellStatus status,
        LocalDateTime erstelltAm,
        ZahlungsAntwort zahlung,
        List<BestellPositionAntwort> positionen
) {

    

}
