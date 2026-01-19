package de.priceland_digital.shop_backend.service;

import de.priceland_digital.shop_backend.persistence.BestellRepository;
import de.priceland_digital.shop_backend.status.ZahlungsMethode;
import jakarta.transaction.Transactional;
import de.priceland_digital.shop_backend.exceptions.OrderNotFoundException;
import de.priceland_digital.shop_backend.entity.Zahlung;
import org.springframework.stereotype.Service;


@Transactional
@Service
public class ZahlungsAbwicklung {

    private final BestellRepository bestellRepo;
    

 public ZahlungsAbwicklung(BestellRepository bestellRepo) {
        this.bestellRepo = bestellRepo;
 }


public void bestellungBezahlen(Long bestellId, ZahlungsMethode zahlungsMethode) {
 var bestellung = bestellRepo.findById(bestellId)
 .orElseThrow(() -> new OrderNotFoundException (("bestellung mit ID " + bestellId + " existiert nicht.")));

var gesamtpreis = bestellung.berechneGesamtpreis();


Zahlung zahlung = new Zahlung(gesamtpreis);
zahlung.setZahlungsMethode(zahlungsMethode);
zahlung.bezahlen();

bestellung.verknuepfeZahlung(zahlung);
bestellung.naechsteStatus();

bestellRepo.save(bestellung);

}


}
