package de.priceland_digital.shop_backend.service.dto.antwort;

import java.time.LocalDateTime;
import java.math.BigDecimal;

import de.priceland_digital.shop_backend.status.ZahlungsMethode;
import de.priceland_digital.shop_backend.status.ZahlungsStatus;

// Antwort DTO für eine Zahlung
public record ZahlungsAntwort(

        BigDecimal betrag,
        ZahlungsStatus status,
        ZahlungsMethode methode,
        LocalDateTime zeitpunkt

) {}




