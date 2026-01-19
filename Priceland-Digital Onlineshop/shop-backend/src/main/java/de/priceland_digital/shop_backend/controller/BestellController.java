package de.priceland_digital.shop_backend.controller;
import de.priceland_digital.shop_backend.component.mapper.BestellMapper;
import de.priceland_digital.shop_backend.entity.Bestellung;
import de.priceland_digital.shop_backend.service.BestellService;
import de.priceland_digital.shop_backend.service.dto.anfrage.BestellAnfrage;
import de.priceland_digital.shop_backend.service.dto.antwort.BestellAntwort;
import jakarta.servlet.http.HttpSession;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.bind.annotation.GetMapping;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.math.BigDecimal;
import java.util.List;

@CrossOrigin(
    origins = "http://localhost:3000",
    allowCredentials = "true"
)
@RestController
@RequestMapping("/api/bestellungen")
public class BestellController {

    @Autowired
    private final BestellService bestellService;
    

    public BestellController(BestellService bestellService) {
        this.bestellService = bestellService;
       
    }

    private void requireAdmin(HttpSession session) {
    if (session.getAttribute("ADMIN_ID") == null)
        throw new ResponseStatusException(401, "Nicht eingeloggt", null);
    }



    //Bestellung anlegen//

    @PostMapping
    public BestellAntwort erstelleBestellung(
            @RequestBody BestellAnfrage request,
            HttpSession session
    ) {
        requireAdmin(session);

        Bestellung bestellung = bestellService.erstelleBestellung(
                request.getKundeId(),
                request.getPositionen()
        );

        return BestellMapper.toAntwort(bestellung);
    }

  @GetMapping
    public List<BestellAntwort> getAll(HttpSession session) { // Rückgabetyp geändert!
    // 1. Sicherheit: Ist es ein Admin?
    if (session.getAttribute("ADMIN_ID") == null) {
        throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Nicht eingeloggt");
    }

    // 2. Alle Bestellungen holen
    List<Bestellung> liste = bestellService.findeAlleBestellungen();
    
    System.out.println("Admin fragt Bestellungen ab. Gefunden: " + liste.size());

    // 3. WICHTIG: Hier den Mapper benutzen, um die Endlosschleife zu verhindern!
    return liste.stream()
            .map(BestellMapper::toAntwort)
            .toList();
}


    // Bestellung bezahlen //

@PostMapping("/{id}/bezahlen")
public ResponseEntity<?> bezahlen(@PathVariable Long id, HttpSession session) {
    // 1. Wer ist gerade eingeloggt?
    Long sessionKundeId = (Long) session.getAttribute("kunde_id"); 
    
    if (sessionKundeId == null) {
        return ResponseEntity.status(401).body("{\"error\": \"Bitte logge dich zuerst ein.\"}");
    }

    // 2. Gehört die Bestellung mit der 'id' auch wirklich Kurt (sessionKundeId)?
    // Du solltest im Service eine Methode haben, die das prüft:
    boolean gehoertKunde = bestellService.pruefeObBestellungZuKundeGehoert(id, sessionKundeId);
    
    if (!gehoertKunde) {
        return ResponseEntity.status(403).body("{\"error\": \"Du darfst nur deine eigenen Bestellungen bezahlen.\"}");
    }

    // 3. Wenn alles passt, bezahlen
    bestellService.bezahleBestellung(id);      

    return ResponseEntity.ok("{\"message\": \"Bezahlung erfolgreich!\"}");
}

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

    // 2. Daten über den Service holen (statt direkt über ein fehlendes Repository)
    List<Bestellung> bestellungen = bestellService.findeBestellungenVonKunde(id);

    // 3. Mapping auf DTO (BestellAntwort), um JSON-Zirkelbezüge zu vermeiden
    return bestellungen.stream()
            .map(BestellMapper::toAntwort)
            .toList();
}

@GetMapping("/admin/umsatz") // Dies würde zu /api/bestellungen/api/bestellungen/admin/umsatz führen!
    public BigDecimal getUmsatz() { 
    
        return bestellService.berechneGesamtUmsatz();

}
}
    

