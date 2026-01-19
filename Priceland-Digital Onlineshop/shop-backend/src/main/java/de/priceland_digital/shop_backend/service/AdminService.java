package de.priceland_digital.shop_backend.service;


import de.priceland_digital.shop_backend.persistence.SoftwareHerstellerRepository;
import de.priceland_digital.shop_backend.persistence.SoftwareRepository;
import de.priceland_digital.shop_backend.status.KategorieListe;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import de.priceland_digital.shop_backend.entity.ComputerSpiel;
import de.priceland_digital.shop_backend.entity.LizenzSoftware;
import de.priceland_digital.shop_backend.entity.SoftwareHersteller;
import de.priceland_digital.shop_backend.entity.SoftwareKostenlos;
import de.priceland_digital.shop_backend.exceptions.HerstellerNotFoundException;
import de.priceland_digital.shop_backend.exceptions.SoftwareNotFoundException;
import de.priceland_digital.shop_backend.entity.Software;


import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.Map;

@Service
public class AdminService {

    @Autowired
    private SoftwareRepository softwareRepository;

    @Autowired
    private SoftwareHerstellerRepository softwareHerstellerRepository;

    @Transactional
    public Software erstelleSoftware(Map<String, Object> daten) {
        // 1. Typ aus dem Frontend-JSON holen
        String typ = (String) daten.get("typ");
        Software neueSoftware;

        // 2. Entscheidung: Welche KONKRETE Klasse wird gebaut?
        // Das löst das "Abstrakte Klasse"-Problem
        if (typ == null) {
            throw new IllegalArgumentException("Software-Typ fehlt!");
        }

        switch (typ.toUpperCase()) {
            case "SPIEL":
                neueSoftware = new ComputerSpiel();
                break;
            case "KOSTENLOS":
                neueSoftware = new SoftwareKostenlos();
                break;
            case "LIZENZ":
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
        if (daten.get("kategorieListe") != null) {
        try {
            neueSoftware.setKategorieListe(KategorieListe.valueOf((String) daten.get("kategorieListe")));
        } catch (IllegalArgumentException e) {
            throw new IllegalArgumentException("Ungültige Kategorie: " + daten.get("kategorieListe"));
        }
    }
        if (daten.get("herstellerId") != null) {
            Long hId = Long.valueOf(daten.get("herstellerId").toString());
            SoftwareHersteller hersteller = softwareHerstellerRepository.findById(hId)
                .orElseThrow(() -> new HerstellerNotFoundException("Hersteller nicht gefunden!"));
            
            neueSoftware.setHersteller(hersteller); // Verknüpfung setzen
        }
        
        // Preis-Konvertierung (sicherstellen, dass es BigDecimal ist)
        if (daten.get("preis") != null) {
            neueSoftware.setPreis(new BigDecimal(daten.get("preis").toString()));
        }

        // 4. Speichern (Hibernate schreibt den Discriminator automatisch)
        return softwareRepository.save(neueSoftware);
    }

    @Transactional
    public Software aktualisiereSoftware(Long id, Map<String, Object> daten) {
       
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
        if (daten.containsKey("kategorieListe")) {
            try {
                existing.setKategorieListe(KategorieListe.valueOf((String) daten.get("kategorieListe")));
            } catch (IllegalArgumentException e) {
                throw new IllegalArgumentException("Ungültige Kategorie: " + daten.get("kategorieListe"));
            }
        }
        if (daten.get("herstellerId") != null) {
            Long hId = Long.valueOf(daten.get("herstellerId").toString());
            SoftwareHersteller hersteller = softwareHerstellerRepository.findById(hId).orElseThrow(() -> new HerstellerNotFoundException("Hersteller nicht gefunden!"));
            existing.setHersteller(hersteller);
        }

        return softwareRepository.save(existing);
    }
    
    @Transactional
    public void loescheSoftware(Long id) {
        softwareRepository.deleteById(id);
    }
}