package de.priceland_digital.shop_backend.controller;

import de.priceland_digital.shop_backend.entity.Kunde;
import de.priceland_digital.shop_backend.persistence.BestellRepository;
import de.priceland_digital.shop_backend.persistence.KundenRepository;
import de.priceland_digital.shop_backend.service.dto.antwort.KundenAntwort;
import de.priceland_digital.shop_backend.service.dto.antwort.BestellAntwort;
import de.priceland_digital.shop_backend.component.mapper.BestellMapper;
import de.priceland_digital.shop_backend.component.mapper.KundenMapper;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;
import jakarta.servlet.http.HttpSession;
import java.util.List;
import lombok.RequiredArgsConstructor;

// Controller für Kundenprofil-Operationen im Onlineshop
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/kunden/profil")
public class KundenProfilController {

    private final BestellRepository bestellRepository;
    private final KundenRepository kundenRepository;
    private final KundenMapper kundenMapper;
      
    // Kundenprofil abrufen
    @GetMapping
    public KundenAntwort profil(HttpSession session) {
        Long id = (Long) session.getAttribute("kundeId"); 
        if (id == null) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Nicht eingeloggt");
        }
        Kunde kunde = kundenRepository.findById(id).orElseThrow();
        return kundenMapper.toAntwort(kunde); // Nutzt dein Record ohne Passwort
    }

    // Bestellungen des Kunden abrufen    
    @GetMapping("/bestellungen")
    public List<BestellAntwort> bestellungen(HttpSession session) {
        Long id = (Long) session.getAttribute("kundeId"); 
        if (id == null) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Nicht eingeloggt");
        }
        
        // Holt die Entities und mappt sie sofort zu sauberen Antworten
        return bestellRepository.findByKundeId(id).stream()
                .map(BestellMapper::toAntwort)
                .toList();
    }

    // Aktuellen Kunden abrufen    
    @GetMapping("/me")
    public KundenAntwort getAktuellerKunde(HttpSession session) {
    // WICHTIG: Nutze exakt "kundeId", wie du es im KundenController beim Login vergibst
        Long id = (Long) session.getAttribute("kundeId"); 
    
        if (id == null) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Nicht eingeloggt");
    }
    
        return kundenRepository.findById(id)
            .map(kundenMapper::toAntwort)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
}
}