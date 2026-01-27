package de.priceland_digital.shop_backend.controller;

import de.priceland_digital.shop_backend.service.ZahlungsAbwicklung;
import de.priceland_digital.shop_backend.service.dto.anfrage.ZahlungsAnfrage;
import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

// Controller für Zahlungsabwicklung im Onlineshop
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/zahlungen")
public class ZahlungsController {

    private final ZahlungsAbwicklung zahlungsAbwicklung;
   
    // Bestellung bezahlen
    @PostMapping("/bestellungen/{bestellId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void bezahleBestellung(
            @PathVariable Long bestellId,
            @RequestBody ZahlungsAnfrage anfrage
    ) {
        zahlungsAbwicklung.bestellungBezahlen(
                bestellId,
                anfrage.getZahlungsMethode()
        );
    }
}