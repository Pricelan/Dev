package de.priceland_digital.shop_backend.controller;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import de.priceland_digital.shop_backend.persistence.HerstellerRepository;
import de.priceland_digital.shop_backend.persistence.SoftwareRepository;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

import de.priceland_digital.shop_backend.entity.ComputerSpiel;
import de.priceland_digital.shop_backend.entity.LizenzSoftware;
import de.priceland_digital.shop_backend.entity.Software;
import de.priceland_digital.shop_backend.entity.SoftwareHersteller;
import de.priceland_digital.shop_backend.entity.SoftwareKostenlos;
import de.priceland_digital.shop_backend.service.SoftwareService;
import de.priceland_digital.shop_backend.status.Kategorie;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;

// Controller für Software-Operationen im Onlineshop
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/software")
public class SoftwareController {

    private final SoftwareService softwareService;
    private final SoftwareRepository softwareRepository;
    private final HerstellerRepository herstellerRepository;
  
    // Admin-Rechte prüfen
    private void requireAdmin(HttpSession session) {
    if (session.getAttribute("ADMIN_ID") == null)
        throw new ResponseStatusException(401, "Nicht eingeloggt", null);
}
   
    // Alle Software-Einträge abrufen
    @GetMapping
    public List<Software> getAllSoftware() {
        return softwareService.findAll();
    }

    // Neue Software erstellen
   @PostMapping("/erstellen")
public Software erstelleSoftware(@RequestBody Map<String, Object> payload, HttpSession session) {
    requireAdmin(session);
    
    String typ = (String) payload.get("typ"); 
    Software neueSoftware;

    // 1. Richtige Unterklasse wählen
    if ("COMPUTER_SPIELE".equals(typ)) {
        neueSoftware = new ComputerSpiel();
        neueSoftware.setKategorie(Kategorie.COMPUTER_SPIELE);
    } else if ("KOSTENLOSE_SOFTWARE".equals(typ)) {
        neueSoftware = new SoftwareKostenlos();
        neueSoftware.setKategorie(Kategorie.KOSTENLOSE_SOFTWARE);
    } else {
        neueSoftware = new LizenzSoftware();
        neueSoftware.setKategorie(Kategorie.LIZENZIERTE_SOFTWARE);
    }

    // 2. Felder setzen
    neueSoftware.setName((String) payload.get("name"));
    neueSoftware.setPreis(new BigDecimal(payload.get("preis").toString()));
    neueSoftware.setVersion((String) payload.get("version"));
    neueSoftware.setSoftwareBeschreibung((String) payload.get("softwareBeschreibung"));
    
    // WICHTIG: Hersteller setzen! 
    // Hier musst du eine herstellerId aus dem Frontend mitschicken
    Long herstellerId = Long.valueOf(payload.get("herstellerId").toString());
    SoftwareHersteller hersteller = herstellerRepository.findById(herstellerId)
        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Hersteller nicht gefunden"));
    neueSoftware.setHersteller(hersteller);

    return softwareRepository.save(neueSoftware);
}
    // Software löschen
    @DeleteMapping("/löschen/{id}")
    public void delete(@PathVariable Long id, HttpSession session) {
            requireAdmin(session);
    softwareService.deleteById(id);
}
    // Einzelne Software anhand der ID abrufen
    @GetMapping("/{id}")
    public Software getOne(@PathVariable Long id) {
    return softwareRepository.findById(id)
    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
}

    // Software nach Name suchen
    @GetMapping("/suche")
    public List<Software> sucheSoftware(@RequestParam String name) {
    return softwareRepository.findByNameContainingIgnoreCase(name);
}

    
}

