package de.priceland_digital.shop_backend.controller;

import de.priceland_digital.shop_backend.entity.Bestellung;
import de.priceland_digital.shop_backend.entity.Gast;
import de.priceland_digital.shop_backend.entity.Kunde;
import de.priceland_digital.shop_backend.entity.Warenkorb;
import de.priceland_digital.shop_backend.persistence.GastRepository;
import de.priceland_digital.shop_backend.service.BestellService;
import de.priceland_digital.shop_backend.service.KundenVerwaltung;
import de.priceland_digital.shop_backend.service.WarenkorbService;
import de.priceland_digital.shop_backend.service.dto.antwort.BestellAntwort;
import jakarta.servlet.http.HttpSession;
import de.priceland_digital.shop_backend.component.mapper.BestellMapper;
import de.priceland_digital.shop_backend.service.dto.anfrage.CheckoutAnfrage;


import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

          

@RestController
@RequestMapping("/api/checkout")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class CheckoutController {

    private final WarenkorbService warenkorbService;
    private final BestellService bestellService;
    private final KundenVerwaltung kundenVerwaltung;
    private final GastRepository gastRepository;

    public CheckoutController(WarenkorbService warenkorbService, BestellService bestellService, 
                              KundenVerwaltung kundenVerwaltung, GastRepository gastRepository) {
        this.warenkorbService = warenkorbService;
        this.bestellService = bestellService;
        this.kundenVerwaltung = kundenVerwaltung;
        this.gastRepository = gastRepository;
    }
@PostMapping("/checkout")
public BestellAntwort checkout(HttpSession session, @RequestBody CheckoutAnfrage request) {
    // 1. Priorität: Login-Session (Kurt)
    Long kundeId = (Long) session.getAttribute("kundeId");
    
    // Fallback: Falls die ID im Request-Body mitkommt
    if (kundeId == null) {
        kundeId = request.getKundeId();
    }

    // --- PFAD A: Registrierter Kunde (Kurt) ---
    if (kundeId != null) {
    Kunde kunde = kundenVerwaltung.findeKundeById(kundeId);
    
    // 1. Hole den (vollen) Gast-Warenkorb
    Warenkorb gastWk = warenkorbService.getOrCreateForGast(request.getGastToken());
    
    // 2. Hole oder erstelle Kurts (leeren) Kunden-Warenkorb
    Warenkorb kundenWk = warenkorbService.getOrCreateForKunde(kunde);
    
    // 3. WICHTIG: Übertrage die Positionen vom Gast zu Kurt, falls der Kunden-WK leer ist
    if (kundenWk.getPositionen().isEmpty() && !gastWk.getPositionen().isEmpty()) {
        warenkorbService.uebertrageWarenkorb(gastWk, kundenWk);
    }

    // 4. Jetzt erst den Checkout mit dem (nun befüllten) kundenWk ausführen
    Bestellung b = bestellService.checkout(kundenWk, kunde);
    return BestellMapper.toAntwort(b);
}
    // --- PFAD B: Gast-Checkout ---
    // Hier prüfen wir die flachen Felder deiner CheckoutAnfrage direkt
    if (request.getEmail() == null || request.getEmail().isBlank()) {
        throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Gast-Daten (Email) fehlen");
    }

    Warenkorb wk = warenkorbService.getOrCreateForGast(request.getGastToken());
    
    // Gast-Entity befüllen
    Gast neuerGast = new Gast();
    neuerGast.setEmail(request.getEmail());
    neuerGast.setVorname(request.getVorname());
    neuerGast.setNachname(request.getNachname());
    neuerGast.setStrasse(request.getStrasse());
    neuerGast.setHausnummer(request.getHausnummer());
    neuerGast.setPlz(request.getPlz());
    neuerGast.setOrt(request.getOrt());
    neuerGast.setTelefonnummer(request.getTelefonnummer());

    // Jetzt speichern (da Felder befüllt sind, gibt es keine ValidationException mehr)
    neuerGast = gastRepository.save(neuerGast);

    Bestellung b = bestellService.checkoutGast(wk, neuerGast);
    return BestellMapper.toAntwort(b);
}
}
