package de.priceland_digital.shop_backend.controller;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import de.priceland_digital.shop_backend.persistence.SoftwareRepository;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

import de.priceland_digital.shop_backend.entity.ComputerSpiel;
import de.priceland_digital.shop_backend.entity.LizenzSoftware;
import de.priceland_digital.shop_backend.entity.Software;
import de.priceland_digital.shop_backend.entity.SoftwareKostenlos;
import de.priceland_digital.shop_backend.service.SoftwareService;

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

        if ("SPIEL".equals(typ)) {
        neueSoftware = new ComputerSpiel();
        // WICHTIG: Das Enum für den Frontend-Filter setzen!
        neueSoftware.setKategorieListe(de.priceland_digital.shop_backend.status.KategorieListe.GAMES);
    }   else if ("KOSTENLOS".equals(typ)) {
        neueSoftware = new SoftwareKostenlos();
        neueSoftware.setKategorieListe(de.priceland_digital.shop_backend.status.KategorieListe.FREEWARE);
    }   else {
        neueSoftware = new LizenzSoftware();
        neueSoftware.setKategorieListe(de.priceland_digital.shop_backend.status.KategorieListe.SOFTWARE);
    }

        neueSoftware.setName((String) payload.get("name"));
        neueSoftware.setPreis(new BigDecimal(payload.get("preis").toString()));
        neueSoftware.setVersion((String) payload.get("version"));
        neueSoftware.setDownloadLink((String) payload.get("downloadLink"));
        neueSoftware.setSoftwareBeschreibung((String) payload.get("softwareBeschreibung"));
        
    
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

