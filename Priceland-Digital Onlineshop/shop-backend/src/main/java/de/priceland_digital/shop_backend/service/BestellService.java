package de.priceland_digital.shop_backend.service;


import de.priceland_digital.shop_backend.entity.Bestellposition;
import de.priceland_digital.shop_backend.entity.Bestellung;
import de.priceland_digital.shop_backend.entity.Kunde;
import de.priceland_digital.shop_backend.entity.Gast;
import de.priceland_digital.shop_backend.entity.Warenkorb;
import de.priceland_digital.shop_backend.entity.WarenkorbItem;
import de.priceland_digital.shop_backend.entity.Zahlung;
import de.priceland_digital.shop_backend.exceptions.CustomerNotFoundException;
import de.priceland_digital.shop_backend.persistence.BestellRepository;
import de.priceland_digital.shop_backend.persistence.KundenRepository;
import de.priceland_digital.shop_backend.persistence.SoftwareRepository;
import de.priceland_digital.shop_backend.persistence.WarenkorbRepository;
import de.priceland_digital.shop_backend.service.dto.anfrage.PositionsAnfrage;
import de.priceland_digital.shop_backend.status.BestellStatus;

import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;



import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class BestellService {

    private final WarenkorbRepository warenkorbRepo;
    private final BestellRepository bestellRepo;
    private final KundenRepository kundenRepo;
    private final SoftwareRepository softwareRepo;
  

    public BestellService(BestellRepository bestellRepo, KundenRepository kundenRepo, SoftwareRepository softwareRepo, WarenkorbRepository warenkorbRepo) {
        this.bestellRepo = bestellRepo;
        this.kundenRepo = kundenRepo;
        this.softwareRepo = softwareRepo;
        this.warenkorbRepo = warenkorbRepo;
        
    }
    
    public Bestellung erstelleBestellung(Long kundenId, List<PositionsAnfrage> positionen) {

    var kunde = kundenRepo.findById(kundenId)
            .orElseThrow(() -> new CustomerNotFoundException("Kunde mit ID " + kundenId + " existiert nicht."));

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

    var bestellung = new Bestellung(kunde, null, bestellpositionen);
       
       
    return bestellRepo.save(bestellung);

  
}

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

@Transactional
public Bestellung bezahleBestellung(Long id) {
    // 1. Bestellung laden
    Bestellung b = bestellRepo.findById(id).orElseThrow();
    
    // 2. Zahlung erstellen
    Zahlung z = new Zahlung(b.getGesamtpreis());
    
    // 3. WICHTIG: Beide Seiten verknüpfen!
    z.setBestellung(b); // Damit die Zahlung weiß, zu welcher Bestellung sie gehört
    b.setZahlung(z);    // Damit die Bestellung weiß, dass sie bezahlt ist
    
    // 4. Status setzen
    z.bezahlen();
    b.setStatus(BestellStatus.BEZAHLT);
    
    // 5. Speichern (dank CascadeType.ALL an der Bestellung wird z mitgespeichert)
    return bestellRepo.save(b);
}

@Transactional(readOnly = true)
public List<Bestellung> findeAlleBestellungen() {
    return bestellRepo.findAll();
}

@Transactional
public Bestellung checkout(Warenkorb warenkorb, Kunde kunde) {
    if (warenkorb == null || warenkorb.getPositionen().isEmpty()) {
        throw new IllegalStateException("Warenkorb ist leer");
    }

    // 1. Neue Bestellung anlegen
    Bestellung bestellung = new Bestellung();
    bestellung.setKunde(kunde);
    bestellung.setErstelltAm(LocalDateTime.now());
    bestellung.setStatus(BestellStatus.IN_BEARBEITUNG);

    // 2. Positionen übertragen
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

    bestellung.setPositionen(neuePositionen);
    bestellung.setGesamtpreis(bestellung.berechneGesamtpreis());

    // 3. Speichern
    Bestellung gespeicherteBestellung = bestellRepo.save(bestellung);

    // 4. WICHTIG: Warenkorb leeren
    warenkorb.getPositionen().clear();
    warenkorbRepo.save(warenkorb);

    return gespeicherteBestellung;
}

@Transactional
public Bestellung checkoutGast(Warenkorb warenkorb, Gast gast) {
    if (gast == null) throw new IllegalArgumentException("Gast fehlt");

    Bestellung bestellung = new Bestellung();
    bestellung.setGast(gast);
    bestellung.setKunde(null); // Explizit Kunde auf null setzen
    bestellung.setErstelltAm(LocalDateTime.now());
    bestellung.setStatus(BestellStatus.IN_BEARBEITUNG);

    List<Bestellposition> positionen = new ArrayList<>();
    double total = 0;

    for (WarenkorbItem pos : warenkorb.getPositionen()) {
        Bestellposition bp = new Bestellposition();
        bp.setSoftware(pos.getSoftware());
        bp.setMenge(pos.getMenge());
        bp.setEinzelpreis(pos.getSoftware().getPreis());
        bp.setBestellung(bestellung);
        positionen.add(bp);
        
        total += pos.getMenge() * pos.getSoftware().getPreis().doubleValue();
    }

    bestellung.setPositionen(positionen);
    bestellung.setGesamtpreis(BigDecimal.valueOf(total)); 

    Bestellung gespeicherteBestellung = bestellRepo.save(bestellung);

    warenkorb.getPositionen().clear();
    warenkorbRepo.save(warenkorb);

    return gespeicherteBestellung;
}

@Transactional(readOnly = true)
public List<Bestellung> findeBestellungenVonKunde(Long kundeId) {
    return bestellRepo.findByKundeId(kundeId);
}

public BigDecimal berechneGesamtUmsatz() {
    return bestellRepo.findAll().stream()
            .filter(b -> b.getZahlung() != null) // Zählt nur Bestellungen mit hinterlegter Zahlung
            .map(Bestellung::getGesamtpreis)
            .reduce(BigDecimal.ZERO, BigDecimal::add);
}

public Bestellung findById(Long id) {
        return bestellRepo.findById(id)
        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Bestellung nicht gefunden"));
}
}