package de.priceland_digital.shop_backend.service;


import de.priceland_digital.shop_backend.persistence.BestellRepository;
import de.priceland_digital.shop_backend.persistence.SoftwareHerstellerRepository;
import de.priceland_digital.shop_backend.persistence.SoftwareRepository;
import de.priceland_digital.shop_backend.status.Kategorie;
import lombok.RequiredArgsConstructor;

import org.springframework.transaction.annotation.Transactional;


import de.priceland_digital.shop_backend.entity.Bestellung;
import de.priceland_digital.shop_backend.entity.ComputerSpiel;
import de.priceland_digital.shop_backend.entity.LizenzSoftware;
import de.priceland_digital.shop_backend.entity.SoftwareHersteller;
import de.priceland_digital.shop_backend.entity.SoftwareKostenlos;
import de.priceland_digital.shop_backend.exceptions.HerstellerNotFoundException;
import de.priceland_digital.shop_backend.exceptions.SoftwareNotFoundException;
import de.priceland_digital.shop_backend.entity.Software;


import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Transactional
public class AdminService {

    private final SoftwareRepository softwareRepository;
    private final BestellRepository bestellRepo;
    private final SoftwareHerstellerRepository softwareHerstellerRepository;
    

    // Neue Software erstellen
    public Software erstelleSoftware(Map<String, Object> daten) {
        // 1. Typ aus dem Frontend-JSON holen
        String typ = (String) daten.get("typ");
        Software neueSoftware;

        // 2. Entscheidung: Welche KONKRETE Klasse wird gebaut?
        if (typ == null) {
            throw new IllegalArgumentException("Software-Typ fehlt!");
        }

        switch (typ.toUpperCase()) {
            case "COMPUTER_SPIELE":
                neueSoftware = new ComputerSpiel();
                break;
            case "KOSTENLOSE_SOFTWARE":
                neueSoftware = new SoftwareKostenlos();
                break;
            case "LIZENZIERTE_SOFTWARE":
                neueSoftware = new LizenzSoftware();
                break;
            default:
                throw new IllegalArgumentException("Unbekannter Typ: " + typ);
        }

        // 3. Gemeinsame Daten füllen
        neueSoftware.setName((String) daten.get("name"));
        neueSoftware.setVersion((String) daten.get("version"));
        neueSoftware.setDownloadLink((String) daten.get("downloadLink"));
        neueSoftware.setSoftwareBeschreibung((String) daten.get("softwareBeschreibung"));
        
        // Kategorie setzen
        if (daten.get("kategorie") != null) {
        try {
            neueSoftware.setKategorie(Kategorie.valueOf((String) daten.get("kategorie")));
        } catch (IllegalArgumentException e) {
            throw new IllegalArgumentException("Ungültige Kategorie: " + daten.get("kategorie"));
        }
    }   
        if (daten.get("herstellerId") != null) {
            Long hId = Long.valueOf(daten.get("herstellerId").toString());
            SoftwareHersteller hersteller = softwareHerstellerRepository.findById(hId)
                .orElseThrow(() -> new HerstellerNotFoundException("Hersteller nicht gefunden!"));
            
            neueSoftware.setHersteller(hersteller); 
        }
        
        // Preis setzen
       if (daten.get("preis") != null && !daten.get("preis").toString().isEmpty()) {
         neueSoftware.setPreis(new BigDecimal(daten.get("preis").toString()));
    } else {
         neueSoftware.setPreis(BigDecimal.ZERO); // Standardwert, falls Preis leer ist
    }

        // 4. Software speichern
        return softwareRepository.save(neueSoftware);
    }

    // Software aktualisieren
    public Software aktualisiereSoftware(Long id, Map<String, Object> daten) {
       
        // Bestehende Software laden
        Software existing = softwareRepository.findById(id)
                .orElseThrow(() -> new SoftwareNotFoundException ("Software mit ID " + id + " nicht gefunden"));

        // Nur die Felder ändern, die bearbeitbar sein sollen
        if (daten.containsKey("name")) {
            existing.setName((String) daten.get("name"));
        }
        if (daten.containsKey("preis")) {
            existing.setPreis(new java.math.BigDecimal(daten.get("preis").toString()));
        }
        if (daten.containsKey("version")) {
            existing.setVersion((String) daten.get("version"));
        }
        if (daten.containsKey("downloadLink")) {
            existing.setDownloadLink((String) daten.get("downloadLink"));
        }
        if (daten.containsKey("softwareBeschreibung")) {
            existing.setSoftwareBeschreibung((String) daten.get("softwareBeschreibung"));
        }
        if (daten.containsKey("kategorie")) {
            try {
                existing.setKategorie(Kategorie.valueOf((String) daten.get("kategorie")));
            } catch (IllegalArgumentException e) {
                throw new IllegalArgumentException("Ungültige Kategorie: " + daten.get("kategorie"));
            }
        }
        if (daten.get("herstellerId") != null) {
            Long hId = Long.valueOf(daten.get("herstellerId").toString());
            SoftwareHersteller hersteller = softwareHerstellerRepository.findById(hId).orElseThrow(() -> new HerstellerNotFoundException("Hersteller nicht gefunden!"));
            existing.setHersteller(hersteller);
        }
        // Änderungen speichern
        return softwareRepository.save(existing);
    }
    
    // Software löschen
    public void loescheSoftware(Long id) {
        softwareRepository.deleteById(id);
    }

    // Alle Bestellungen abrufen
    @Transactional(readOnly = true)
    public List<Bestellung> findeAlleBestellungen() {
        return bestellRepo.findAll().stream()
            .sorted((a, b) -> b.getErstelltAm().compareTo(a.getErstelltAm()))
            .toList();
    }
}