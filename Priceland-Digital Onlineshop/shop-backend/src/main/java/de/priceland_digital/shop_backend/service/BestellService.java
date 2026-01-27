package de.priceland_digital.shop_backend.service;


import de.priceland_digital.shop_backend.entity.Bestellposition;
import de.priceland_digital.shop_backend.entity.Bestellung;
import de.priceland_digital.shop_backend.entity.Kunde;
import de.priceland_digital.shop_backend.entity.Gast;
import de.priceland_digital.shop_backend.entity.Warenkorb;
import de.priceland_digital.shop_backend.entity.Zahlung;
import de.priceland_digital.shop_backend.exceptions.CustomerNotFoundException;
import de.priceland_digital.shop_backend.persistence.BestellRepository;
import de.priceland_digital.shop_backend.persistence.KundenRepository;
import de.priceland_digital.shop_backend.persistence.SoftwareRepository;
import de.priceland_digital.shop_backend.persistence.WarenkorbRepository;
import de.priceland_digital.shop_backend.service.dto.anfrage.PositionsAnfrage;
import de.priceland_digital.shop_backend.status.BestellStatus;
import de.priceland_digital.shop_backend.status.ZahlungsMethode;
import lombok.RequiredArgsConstructor;
import de.priceland_digital.shop_backend.persistence.GastRepository;

import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;



import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class BestellService {

    private final WarenkorbRepository warenkorbRepo;
    private final BestellRepository bestellRepo;
    private final KundenRepository kundenRepo;
    private final SoftwareRepository softwareRepo;
    private final GastRepository gastRepo;
  
    // Bestellung erstellen    
    public Bestellung erstelleBestellung(Long kundenId, List<PositionsAnfrage> positionen) {
    
    // Kunde anhand der ID finden
    var kunde = kundenRepo.findById(kundenId)
            .orElseThrow(() -> new CustomerNotFoundException("Kunde mit ID " + kundenId + " existiert nicht."));
    // Bestellpositionen erstellen
    var bestellpositionen = positionen.stream()
            .map(pos -> {
                var software = softwareRepo.findById(pos.getSoftwareId())
                        .orElseThrow(() -> new IllegalArgumentException(
                                "Software mit ID " + pos.getSoftwareId() + " existiert nicht."
                        ));

                if (pos.getMenge() <= 0) {
                    throw new IllegalArgumentException("Die Menge muss größer als 0 sein.");
                }

                return new Bestellposition(software, pos.getMenge(),software.getPreis());
                
            })
            .toList();
    // Bestellung erstellen
    var bestellung = new Bestellung(kunde, null, bestellpositionen);
       
    // Bestellung speichern   
    return bestellRepo.save(bestellung);

  
}

// Prüfen, ob eine Bestellung zu einem Kunden gehört
public boolean pruefeObBestellungZuKundeGehoert(Long bestellId, Long sessionKundeId) {
        // 1. Suche die Bestellung in der Datenbank
        return bestellRepo.findById(bestellId)
            .map(bestellung -> {
                // 2. Vergleiche die ID des Kunden der Bestellung mit der Session-ID
                // Wichtig: Wir vergleichen zwei Long-Werte mit .equals()
                return bestellung.getKunde().getId().equals(sessionKundeId);
            })
            .orElse(false); // Falls Bestellung nicht existiert -> false
    }

// Bestellung bezahlen
public Bestellung bezahleBestellung(Long id) {
    // 1. Bestellung laden
    Bestellung b = bestellRepo.findById(id).orElseThrow();
    
    // 2. Zahlung erstellen
    Zahlung z = new Zahlung(b.getGesamtpreis());
    
    // 3. Verknüpfung herstellen
    z.setBestellung(b); 
    b.setZahlung(z);    
    
    // 4. Status setzen
    z.bezahlen();
    b.setStatus(BestellStatus.BEZAHLT);
    
    // 5. Bestellung speichern
    return bestellRepo.save(b);
}

// Alle Bestellungen abrufen
@Transactional(readOnly = true)
public List<Bestellung> findeAlleBestellungen() {
    return bestellRepo.findAll();
}

// Checkout für angemeldeten Kunden
public Bestellung checkout(Warenkorb warenkorb, Kunde kunde, ZahlungsMethode zahlungsMethode) {
    if (warenkorb == null || warenkorb.getPositionen().isEmpty()) {
        throw new IllegalStateException("Warenkorb ist leer");
    }

    // 1. Neue Bestellung anlegen
    Bestellung bestellung = new Bestellung();
    bestellung.setKunde(kunde);
    bestellung.setGast(null); // Sicherstellen, dass Gast leer ist
    bestellung.setErstelltAm(LocalDateTime.now());
    
    // Gesamtpreis festlegen aus dem Warenkorb
    BigDecimal gesamtBetrag = warenkorb.getGesamtpreis();
    bestellung.setGesamtpreis(gesamtBetrag);

    // 2. Zahlung und Bestellstatus festlegen
    if (ZahlungsMethode.PAYPAL.equals(zahlungsMethode) || 
        ZahlungsMethode.KREDITKARTE.equals(zahlungsMethode)) {

        bestellung.setStatus(BestellStatus.BEZAHLT);
        
        Zahlung z = new Zahlung(gesamtBetrag);
        z.setBestellung(bestellung);
        z.bezahlen(); // Setzt den Status der Zahlung auf BEZAHLT
        bestellung.setZahlung(z);
        
    } else {
        // Andere Zahlungsmethoden (z.B. Rechnung)
        bestellung.setStatus(BestellStatus.IN_BEARBEITUNG);
    }

    // 3. Positionen übertragen
    List<Bestellposition> neuePositionen = warenkorb.getPositionen().stream()
        .map(item -> {
            Bestellposition bp = new Bestellposition(
                item.getSoftware(),
                item.getMenge(),
                item.getSoftware().getPreis()
            );
            bp.setBestellung(bestellung);
            return bp;
        }).toList();

    for (Bestellposition bp : neuePositionen) {
        bestellung.addPosition(bp);
    }

    // 4. Speichern
    Bestellung gespeicherteBestellung = bestellRepo.save(bestellung);

    // 5. Warenkorb leeren
    warenkorb.getPositionen().clear();
    warenkorbRepo.save(warenkorb);

    return gespeicherteBestellung;
}

// Checkout für Gastkunden
public Bestellung checkoutGast(Warenkorb warenkorb, Gast gastDaten, ZahlungsMethode zahlungsMethode) {
    // Validierung
    if (gastDaten == null) throw new IllegalArgumentException("Gast fehlt");
    List<Gast> bestehendeGaeste = gastRepo.findAllByEmail(gastDaten.getEmail());

    Gast gast;
    if (!bestehendeGaeste.isEmpty()) {
        // Wenn Gast mit der E-Mail bereits existiert, diesen verwenden
        gast = bestehendeGaeste.get(0);
    } else {
        // Sonst neu speichern
        gast = gastRepo.save(gastDaten);
    }

    Bestellung bestellung = new Bestellung();
    bestellung.setGast(gast);
    bestellung.setKunde(null);
    bestellung.setErstelltAm(LocalDateTime.now());

    // Wir nehmen den Preis direkt aus dem Warenkorb (BigDecimal)
    BigDecimal gesamtBetrag = warenkorb.getGesamtpreis();
    bestellung.setGesamtpreis(gesamtBetrag);
    
    // Zahlung und Status verknüpfen
    if (ZahlungsMethode.PAYPAL.equals(zahlungsMethode) || 
        ZahlungsMethode.KREDITKARTE.equals(zahlungsMethode)) {

        bestellung.setStatus(BestellStatus.BEZAHLT);
        Zahlung z = new Zahlung(gesamtBetrag);
        z.setBestellung(bestellung);
        z.bezahlen(); 
        bestellung.setZahlung(z); // Das sorgt dafür, dass berechneGesamtUmsatz() greift
        
    } else {
        bestellung.setStatus(BestellStatus.IN_BEARBEITUNG);
    }

    // Positionen vom Warenkorb in die Bestellung kopieren
     List<Bestellposition> neuePositionen = warenkorb.getPositionen().stream()
        .map(item -> {
            Bestellposition bp = new Bestellposition(
                item.getSoftware(),
                item.getMenge(),
                item.getSoftware().getPreis()
            );
            bp.setBestellung(bestellung);
            return bp;
        }).toList();

    for (Bestellposition bp : neuePositionen) {
        bestellung.addPosition(bp);
    }

    // Speichern der Bestellung (Cascading sorgt für Gast und Zahlung)
    Bestellung gespeicherteBestellung = bestellRepo.save(bestellung);

    // Warenkorb leeren
    warenkorb.getPositionen().clear();
    warenkorbRepo.save(warenkorb);

    return gespeicherteBestellung;
}

// Alle Bestellungen eines Kunden abrufen
@Transactional(readOnly = true)
public List<Bestellung> findeBestellungenVonKunde(Long kundeId) {
    return bestellRepo.findByKundeId(kundeId);
}

// Gesamten Umsatz berechnen
@Transactional(readOnly = true)
public BigDecimal berechneGesamtUmsatz() {
    return bestellRepo.summiereGesamtenUmsatz();
}

// Bestellung anhand der ID finden
public Bestellung findById(Long id) {
        return bestellRepo.findById(id)
        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Bestellung nicht gefunden"));
}
}