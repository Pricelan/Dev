package de.priceland_digital.shop_backend.controller;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import de.priceland_digital.shop_backend.service.AdminService;
import de.priceland_digital.shop_backend.service.BestellService;
import de.priceland_digital.shop_backend.component.mapper.SoftwareMapper;
import de.priceland_digital.shop_backend.service.dto.antwort.SoftwareAntwort;
import de.priceland_digital.shop_backend.service.dto.antwort.BestellAntwort;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.*;
import lombok.RequiredArgsConstructor;
import de.priceland_digital.shop_backend.entity.Kunde;
import de.priceland_digital.shop_backend.entity.Software;
import de.priceland_digital.shop_backend.entity.SoftwareHersteller;
import org.springframework.web.bind.annotation.CrossOrigin;
import de.priceland_digital.shop_backend.persistence.BestellRepository;
import de.priceland_digital.shop_backend.persistence.KundenRepository;
import de.priceland_digital.shop_backend.persistence.SoftwareHerstellerRepository;
import de.priceland_digital.shop_backend.persistence.SoftwareRepository;
import java.math.BigDecimal;
import java.util.List;
import java.util.Map;
import de.priceland_digital.shop_backend.component.mapper.BestellMapper;


// Controller für Admin-Operationen im Onlineshop
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/admin")
public class AdminController {

    private final AdminService adminService;
    private final BestellService bestellService;
    private final BestellRepository bestellRepo;
    private final SoftwareRepository softwareRepo;
    private final KundenRepository kundenRepo;
    private final SoftwareHerstellerRepository herstellerRepo;
        
    // Admin-Prüfung
    private void requireAdmin(HttpSession session) {
    if (session.getAttribute("ADMIN_ID") == null)
        throw new ResponseStatusException(401, "Nicht eingeloggt", null);
}

    // Admin-Session prüfen
    @GetMapping("/me")
    public ResponseEntity<Void> me(HttpSession session) {
        requireAdmin(session);
        return ResponseEntity.ok().build();
    }

    // Software erstellen
   @PostMapping("/software")
     public ResponseEntity<Software> erstelleSoftware(@RequestBody @Valid Map<String, Object> request, HttpSession session) {
    requireAdmin(session);
    Software created = adminService.erstelleSoftware(request);
    return ResponseEntity.status(201).body(created);
    }
  
    // Software löschen
    @DeleteMapping("/software/löschen/{id}")
    public ResponseEntity<Void> löscheSoftware(@PathVariable Long id, HttpSession session) {
    requireAdmin(session);
        adminService.loescheSoftware(id);
        return ResponseEntity.noContent().build();
}
    // Alle Bestellungen abrufen (Admin)
   @GetMapping("/bestellungen")
    public List<BestellAntwort> alleBestellungen(HttpSession session) {
    requireAdmin(session);
    return bestellRepo.findAll()
            .stream()
            .map(BestellMapper::toAntwort)
            .toList();
}

    // Alle Bestellungen als Antworten abrufen (Admin)
    @GetMapping("/bestellungen/antwort")
    public List<BestellAntwort> alleBestellungenAntwort(HttpSession session) {
    requireAdmin(session);
        return bestellRepo.findAll()
            .stream()
            .map(BestellMapper::toAntwort)
            .toList();
}
    // Software Details abrufen (Admin)
    @GetMapping("/software/details/{id}")
    public ResponseEntity<Software> getSoftwareById(@PathVariable Long id, HttpSession session) {
    requireAdmin(session);
        return softwareRepo.findById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
}

    // Software bearbeiten (Admin)
    @PutMapping("/software/details/{id}") 
    public ResponseEntity<Software> bearbeiteSoftware(@PathVariable Long id, @RequestBody Map<String, Object> neueDaten, HttpSession session) {
    requireAdmin(session);
        Software updated = adminService.aktualisiereSoftware(id, neueDaten);
        return ResponseEntity.ok(updated);
}
    // Alle Software abrufen (Admin)
    @GetMapping("/software/liste")
    public List<SoftwareAntwort> getAlleSoftware(HttpSession session) {
        requireAdmin(session);
        return softwareRepo.findAll().stream()
        .map(SoftwareMapper::toAntwort)
        .toList();
}
    // Alle Kunden abrufen (Admin)
    @GetMapping("/kunden")
    public List<Kunde> alleKunden(HttpSession session) {
        requireAdmin(session);
        return kundenRepo.findAll();
    }

    // Alle Hersteller abrufen (Admin)
    @GetMapping("/hersteller")
    public List<SoftwareHersteller> alleHersteller(HttpSession session) {
        requireAdmin(session);
        return herstellerRepo.findAll();
    }

    // Neuen Hersteller erstellen (Admin)
    @PostMapping("/hersteller/add")
    public ResponseEntity<SoftwareHersteller> erstelleHersteller(
        @RequestBody Map<String, String> request, 
        HttpSession session) {
    
    // 1. Sicherheit prüfen
    requireAdmin(session);
    
    // 2. Validieren
    String name = request.get("name");
    if (name == null || name.trim().isEmpty()) {
        return ResponseEntity.badRequest().build();
    }
    
    // 3. Speichern
    SoftwareHersteller neuerHersteller = new SoftwareHersteller();
    neuerHersteller.setName(name);
    SoftwareHersteller gespeichert = herstellerRepo.save(neuerHersteller);
    
    return ResponseEntity.status(201).body(gespeichert);
}

    // Gesamtumsatz abrufen (Admin)
    @GetMapping("/admin/umsatz")
    public BigDecimal getUmsatz(HttpSession session) {
    // Sicherheit: Nur Admins dürfen den Umsatz sehen
    if (session.getAttribute("ADMIN_ID") == null) {
        throw new ResponseStatusException(HttpStatus.UNAUTHORIZED);
    }
    return bestellService.berechneGesamtUmsatz();
}


}




