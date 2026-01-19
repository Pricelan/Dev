package de.priceland_digital.shop_backend.controller;

import de.priceland_digital.shop_backend.service.dto.anfrage.KundenAnfrage;
import de.priceland_digital.shop_backend.service.dto.antwort.DownloadAntwort;
import de.priceland_digital.shop_backend.component.mapper.DownloadMapper;
import de.priceland_digital.shop_backend.component.mapper.KundenMapper;

import jakarta.servlet.http.HttpSession;

import de.priceland_digital.shop_backend.entity.Kunde;
import de.priceland_digital.shop_backend.persistence.DownloadRepository;

import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import de.priceland_digital.shop_backend.service.dto.antwort.KundenAntwort;
import de.priceland_digital.shop_backend.persistence.KundenRepository;

import java.util.List;




import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@CrossOrigin(
    origins = "http://localhost:3000",
    allowCredentials = "true"
)
@RestController
@RequestMapping("/api/kunden")

public class KundenController {
    
    
    private final DownloadRepository downloadRepository;
    private final KundenRepository kundenRepository;
    private final PasswordEncoder passwordEncoder;
    private final KundenMapper kundenMapper;
    private final DownloadMapper downloadMapper;
    
   

    public KundenController(DownloadRepository downloadRepository, KundenRepository kundenRepository, PasswordEncoder passwordEncoder , KundenMapper kundenMapper, DownloadMapper downloadMapper) {
        
        this.downloadRepository = downloadRepository;
        this.kundenRepository = kundenRepository;
        this.passwordEncoder = passwordEncoder;
        this.kundenMapper = kundenMapper;
        this.downloadMapper = downloadMapper;
    
    }

    @PostMapping("/register")
    public KundenAntwort register(@RequestBody KundenAnfrage dto) {
       Kunde kunde = new Kunde();
       kunde.setEmail(dto.getEmail());
       kunde.setPasswort(passwordEncoder.encode(dto.getPasswort()));

        return kundenMapper.toAntwort(kundenRepository.save(kunde));
    }
@PostMapping("/login")
public void login(@RequestBody KundenAnfrage dto, jakarta.servlet.http.HttpServletRequest request) {
    Kunde kunde = kundenRepository.findByEmail(dto.getEmail())
        .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Benutzer nicht gefunden"));

    if (!passwordEncoder.matches(dto.getPasswort(), kunde.getPasswort())) {
        throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Passwort falsch");
    }

    // WICHTIG: Erstelle eine neue Session und setze das Attribut explizit
    HttpSession session = request.getSession(true); 
    session.setAttribute("kundeId", kunde.getId());
    
    // Debug-Ausgabe für die Konsole
    System.out.println("LOGIN ERFOLGREICH: ID=" + kunde.getId() + " Session=" + session.getId());
}

    @GetMapping("/{kundeId}/lizenzen")
    public List<DownloadAntwort> meineLizenzen(@PathVariable Long kundeId) {
     return downloadRepository.findByKundeId(kundeId)
        .stream()
        .map(downloadMapper::toAntwort)
        .toList();
}

}