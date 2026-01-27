package de.priceland_digital.shop_backend.service;

import de.priceland_digital.shop_backend.persistence.BestellRepository;
import de.priceland_digital.shop_backend.status.ZahlungsMethode;
import jakarta.transaction.Transactional;
import de.priceland_digital.shop_backend.exceptions.OrderNotFoundException;
import de.priceland_digital.shop_backend.entity.Zahlung;
import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;


@Service
@RequiredArgsConstructor // Generiert den Konstruktor für final Felder
@Transactional
public class ZahlungsAbwicklung {

    private final BestellRepository bestellRepo;

    
    // Bestelung aufrufen, Zahlung erstellen, Zahlung verknüpfen, Bestellstatus aktualisieren
    public void bestellungBezahlen(Long bestellId, ZahlungsMethode zahlungsMethode) {
        var bestellung = bestellRepo.findById(bestellId)
            .orElseThrow(() -> new OrderNotFoundException("Bestellung mit ID " + bestellId + " existiert nicht."));

        var gesamtpreis = bestellung.berechneGesamtpreis();

        Zahlung zahlung = new Zahlung(gesamtpreis);
        zahlung.setZahlungsMethode(zahlungsMethode);
        
        
        zahlung.bezahlen(); 

        bestellung.verknuepfeZahlung(zahlung);
        bestellung.naechsteStatus();

        bestellRepo.save(bestellung);
    }
}
