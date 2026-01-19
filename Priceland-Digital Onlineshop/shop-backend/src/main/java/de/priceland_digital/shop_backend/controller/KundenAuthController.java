package de.priceland_digital.shop_backend.controller;
import java.time.LocalDateTime;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import de.priceland_digital.shop_backend.entity.Kunde;
import de.priceland_digital.shop_backend.persistence.KundenRepository;
import de.priceland_digital.shop_backend.service.dto.anfrage.KundenRegisterAnfrage;
import de.priceland_digital.shop_backend.service.dto.anfrage.LoginAnfrage;


@RestController
@RequestMapping("/api/kunden/auth")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class KundenAuthController {

    private final KundenRepository kundenRepository;
    private final PasswordEncoder passwordEncoder;

    public KundenAuthController(KundenRepository kundenRepository, PasswordEncoder passwordEncoder) {
        this.kundenRepository = kundenRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/register")
    public Kunde register(@RequestBody KundenRegisterAnfrage req) {

        if (kundenRepository.findByEmail(req.email).isPresent()) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "E-Mail existiert bereits");
        }

        Kunde k = new Kunde();
        k.setVorname(req.vorname);
        k.setNachname(req.nachname);
        k.setEmail(req.email);
        k.setPasswort(passwordEncoder.encode(req.passwort));
        k.setStrasse(req.strasse);
        k.setHausnummer(req.hausnummer);
        k.setPlz(req.plz);
        k.setOrt(req.ort);
        k.setTelefonnummer(req.telefonnummer);
        k.setAktiviert(true);
        k.setRegistrierungsdatum(LocalDateTime.now());

        return kundenRepository.save(k);
    }

  
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginAnfrage login, HttpServletRequest request) {
        // 1. Session-Sicherheit
        HttpSession session = request.getSession(false);
        if (session != null) session.invalidate();

        // 2. Kurt in der DB suchen
        Kunde kunde = kundenRepository.findByEmail(login.getEmail()).orElse(null);
        
       if (kunde != null && passwordEncoder.matches(login.getPasswort(), kunde.getPasswort())) {
        HttpSession newSession = request.getSession(true);
    
    // Wir nutzen deinen Wunsch-Namen: "kunde_id"
    newSession.setAttribute("kunde_id", kunde.getId()); 
    
    return ResponseEntity.ok(kunde);
}

        return ResponseEntity.status(401).body(java.util.Map.of("error", "Ungültige Anmeldedaten"));
    }

    @GetMapping("/me")
    public ResponseEntity<Kunde> me(HttpSession session) {
        // HIER WAR DER FEHLER: Muss "kunde_id" sein!
        Long id = (Long) session.getAttribute("kunde_id");
        
        if (id == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        
        return kundenRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.status(HttpStatus.UNAUTHORIZED).build());
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpSession session) {
        if (session != null) {
            session.invalidate();
        }
        return ResponseEntity.ok().body(java.util.Map.of("message", "Abgemeldet"));
    }
    
    // ... register bleibt gleich ...
}
