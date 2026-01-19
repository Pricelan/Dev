package de.priceland_digital.shop_backend.service.dto.antwort;


import java.math.BigDecimal;

public record BestellPositionAntwort(
        Long id,
        SoftwareAntwort software,
        Integer menge,
        BigDecimal einzelpreis  
) {}