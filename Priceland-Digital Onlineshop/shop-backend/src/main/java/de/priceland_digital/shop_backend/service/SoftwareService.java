package de.priceland_digital.shop_backend.service;
import de.priceland_digital.shop_backend.entity.ComputerSpiel;
import de.priceland_digital.shop_backend.entity.LizenzSoftware;
import de.priceland_digital.shop_backend.entity.Software;
import de.priceland_digital.shop_backend.entity.SoftwareKostenlos;
import lombok.RequiredArgsConstructor;
import jakarta.transaction.Transactional;
import java.util.Map;
import java.math.BigDecimal;
import java.util.List;
import org.springframework.stereotype.Service;
import de.priceland_digital.shop_backend.entity.SoftwareHersteller;
import de.priceland_digital.shop_backend.persistence.SoftwareHerstellerRepository;
import de.priceland_digital.shop_backend.exceptions.HerstellerNotFoundException;
import de.priceland_digital.shop_backend.exceptions.SoftwareNotFoundException;

import de.priceland_digital.shop_backend.persistence.SoftwareRepository;
import de.priceland_digital.shop_backend.status.KategorieListe;

@RequiredArgsConstructor
@Service
public class SoftwareService {

    private final SoftwareRepository softwareRepository;
    private final SoftwareHerstellerRepository softwareHerstellerRepository;
    
  

    public List<Software> findAll() {
        return softwareRepository.findAll();
    }

    @Transactional
    public Software erstelleSoftware(Map<String, Object> daten) {
        String typ = (String) daten.get("typ");
        Software neueSoftware;

        // Hier wird entschieden, welche konkrete Klasse gebaut wird
        switch (typ) {
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
                throw new IllegalArgumentException("Unbekannter Software-Typ: " + typ);
        }

        // Gemeinsame Felder setzen
        neueSoftware.setName((String) daten.get("name"));
        neueSoftware.setPreis(new BigDecimal(daten.get("preis").toString()));
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
            SoftwareHersteller hersteller = softwareHerstellerRepository.findById(hId).orElseThrow(() -> new HerstellerNotFoundException("Hersteller nicht gefunden"));
            neueSoftware.setHersteller(hersteller);
        }

        return softwareRepository.save(neueSoftware);
    }

    @Transactional
    public Software aktualisiereSoftware(Long id, Software neueDaten) {
        
        Software existing = softwareRepository.findById(id)
            .orElseThrow(() -> new SoftwareNotFoundException("Software nicht gefunden"));

        // Werte übertragen (der Typ/Discriminator bleibt unverändert!)
        if (neueDaten.getName() != null) existing.setName(neueDaten.getName());
        if (neueDaten.getPreis() != null) existing.setPreis(neueDaten.getPreis());
        if (neueDaten.getVersion() != null) existing.setVersion(neueDaten.getVersion());
        if (neueDaten.getDownloadLink() != null) existing.setDownloadLink(neueDaten.getDownloadLink());
        if (neueDaten.getSoftwareBeschreibung() != null) existing.setSoftwareBeschreibung(neueDaten.getSoftwareBeschreibung());
        
        if (neueDaten.getKategorieListe() != null) {
            existing.setKategorieListe(neueDaten.getKategorieListe());
        }

        if (neueDaten.getHersteller() != null) {
            existing.setHersteller(neueDaten.getHersteller());
        }

        return softwareRepository.save(existing);
    }
    public Software findById(Long id) {
        return softwareRepository.findById(id).orElseThrow(() -> new SoftwareNotFoundException("Software nicht gefunden"));
    }

    public void deleteById(Long id) {
        if (!softwareRepository.existsById(id)) throw new SoftwareNotFoundException("ID existiert nicht");
        softwareRepository.deleteById(id);
    }
}

