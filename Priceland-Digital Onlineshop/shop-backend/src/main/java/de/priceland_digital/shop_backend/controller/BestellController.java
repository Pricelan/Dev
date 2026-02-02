package de.priceland_digital.shop_backend.controller;

import de.priceland_digital.shop_backend.component.mapper.BestellMapper;
import de.priceland_digital.shop_backend.entity.Bestellung;
import de.priceland_digital.shop_backend.service.BestellService;
import de.priceland_digital.shop_backend.service.dto.anfrage.BestellAnfrage;
import de.priceland_digital.shop_backend.service.dto.antwort.BestellAntwort;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import java.math.BigDecimal;
import java.util.List;


// Controller für Bestell-Operationen im Onlineshop
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/bestellungen")
public class BestellController {

    private final BestellService bestellService;
      
    // Admin-Prüfung
    private void requireAdmin(HttpSession session) {
    if (session.getAttribute("ADMIN_ID") == null)
        throw new ResponseStatusException(401, "Nicht eingeloggt", null);
    }



 
    // Neue Bestellung erstellen
    @PostMapping
    public BestellAntwort erstelleBestellung(
        @RequestBody BestellAnfrage request,
        HttpSession session
    ) {
    requireAdmin(session);

    // Validierung: Mindestens eine Position in der Bestellung
    if (request.getPositionen() == null || request.getPositionen().isEmpty()) {
        throw new ResponseStatusException(
            HttpStatus.BAD_REQUEST, 
            "Die Bestellung darf nicht leer sein!"
        );
    }

    Bestellung bestellung = bestellService.erstelleBestellung(
            request.getKundeId(),
            request.getPositionen()
    );

    return BestellMapper.toAntwort(bestellung);
}
    // Alle Bestellungen abrufen (Admin)
   @GetMapping
    public List<BestellAntwort> getAll(HttpSession session) { 
    // 1. Sicherheit: Ist es ein Admin?
    if (session.getAttribute("ADMIN_ID") == null) {
        throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Nicht eingeloggt");
    }

    // 2. Alle Bestellungen holen
    List<Bestellung> liste = bestellService.findeAlleBestellungen();
    
    System.out.println("Admin fragt Bestellungen ab. Gefunden: " + liste.size());

    // 3. Zu DTOs mappen und zurückgeben
    return liste.stream()
            .map(BestellMapper::toAntwort)
            .toList();
}


    
    // Bestellung bezahlen
    @PostMapping("/{id}/bezahlen")
    public ResponseEntity<?> bezahlen(@PathVariable Long id, HttpSession session) {
    // 1. Wer ist gerade eingeloggt?
    Long sessionKundeId = (Long) session.getAttribute("kunde_id"); 
    
    if (sessionKundeId == null) {
        return ResponseEntity.status(401).body("{\"error\": \"Bitte logge dich zuerst ein.\"}");
    }

    // 2. Gehört die Bestellung mit der 'id' auch wirklich zum Kunden (sessionKundeId)?
    //    Sonst darf er ja nicht bezahlen
    boolean gehoertKunde = bestellService.pruefeObBestellungZuKundeGehoert(id, sessionKundeId);
    
    if (!gehoertKunde) {
        return ResponseEntity.status(403).body("{\"error\": \"Du darfst nur deine eigenen Bestellungen bezahlen.\"}");
    }

    // 3. Bezahlung durchführen
    bestellService.bezahleBestellung(id);      

    return ResponseEntity.ok("{\"message\": \"Bezahlung erfolgreich!\"}");
}

    // Bestellungen eines bestimmten Kunden abrufen
    @GetMapping("/kunde/{id}")
    public List<BestellAntwort> getBestellungenByKunde(@PathVariable Long id, HttpSession session) {

    // 1. Session-Check (Muss exakt "kunde_id" sein wie im AuthController)
    Long sessionKundeId = (Long) session.getAttribute("kunde_id");

    System.out.println("DEBUG: Session ID: " + sessionKundeId + " | Request ID: " + id);

    if (sessionKundeId == null) {
        throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Nicht eingeloggt");
    }

    if (!sessionKundeId.equals(id)) {
        throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Kein Zugriff auf fremde Bestelldaten");
    }

    // 2. Bestellungen des Kunden abrufen
    List<Bestellung> bestellungen = bestellService.findeBestellungenVonKunde(id);

    // 3. Zu DTOs mappen und zurückgeben
    return bestellungen.stream()
            .map(BestellMapper::toAntwort)
            .toList();
}

    // Gesamtumsatz abrufen (Admin)
    @GetMapping("/admin/umsatz") 
    public BigDecimal getUmsatz() { 
    
        return bestellService.berechneGesamtUmsatz();

}

}    
