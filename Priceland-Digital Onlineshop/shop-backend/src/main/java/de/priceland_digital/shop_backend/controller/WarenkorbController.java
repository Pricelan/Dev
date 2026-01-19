package de.priceland_digital.shop_backend.controller;
import de.priceland_digital.shop_backend.component.mapper.WarenkorbMapper;
import de.priceland_digital.shop_backend.entity.Kunde;
import de.priceland_digital.shop_backend.entity.Software;
import de.priceland_digital.shop_backend.entity.Warenkorb;
import de.priceland_digital.shop_backend.service.KundenVerwaltung;
import de.priceland_digital.shop_backend.service.WarenkorbService;
import de.priceland_digital.shop_backend.service.dto.anfrage.WarenkorbAnfrage;
import de.priceland_digital.shop_backend.service.dto.antwort.WarenkorbAntwort;
import lombok.RequiredArgsConstructor;
import de.priceland_digital.shop_backend.service.SoftwareService;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;



@RequiredArgsConstructor
@CrossOrigin(
    origins = "http://localhost:3000",
    allowCredentials = "true"
)
@RestController
@RequestMapping("/api/warenkorb")
public class WarenkorbController {

    private final SoftwareService softwareService;
    private final KundenVerwaltung kundenVerwaltung;
    private final WarenkorbService warenkorbService;

   
   

    // 1️ Warenkorb holen (Gast ODER Kunde)
    @GetMapping
    public WarenkorbAntwort getWarenkorb(
        @RequestParam(required = false) String gastToken,
        @RequestParam(required = false) Long kundeId
) {
    Warenkorb w;

    if (kundeId != null) {
        Kunde kunde = kundenVerwaltung.findeKundeById(kundeId);
        w = warenkorbService.getOrCreateForKunde(kunde);
    } else if (gastToken != null && !gastToken.isBlank()) {
        w = warenkorbService.getOrCreateForGast(gastToken);
    } else {
        throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
    }

    return WarenkorbMapper.toAntwort(w);
}

    // 2 Software hinzufügen
   @PostMapping("/add")
public WarenkorbAntwort addToCart(@RequestBody WarenkorbAnfrage request) {

    Software software = softwareService.findById(request.getSoftwareId());

    Warenkorb warenkorb = (request.getKundeId() != null)
            ? warenkorbService.getOrCreateForKunde(
                    kundenVerwaltung.findeKundeById(request.getKundeId()))
            : warenkorbService.getOrCreateForGast(request.getGastToken());

    Warenkorb updated = warenkorbService.addSoftware(
            warenkorb,
            software,
            request.getMenge()
    );

    return WarenkorbMapper.toAntwort(updated);
}

    // 3️ Position entfernen
    @DeleteMapping("/position/{positionId}")
    public void removePosition(
            @PathVariable Long positionId,
            @RequestParam(required = false) String gastToken,
            @RequestParam(required = false) Long kundeId
    ) {
        Warenkorb warenkorb;

        if (kundeId != null) {
            Kunde kunde = kundenVerwaltung.findeKundeById(kundeId);
            warenkorb = warenkorbService.getOrCreateForKunde(kunde);
        } else {
            warenkorb = warenkorbService.getOrCreateForGast(gastToken);
        }

        warenkorbService.removePosition(warenkorb, positionId);
    }

    // 4️ Warenkorb leeren
    @DeleteMapping("/clear")
    public void clearCart(
            @RequestParam(required = false) String gastToken,
            @RequestParam(required = false) Long kundeId
    ) {
        Warenkorb warenkorb;

        if (kundeId != null) {
            Kunde kunde = kundenVerwaltung.findeKundeById(kundeId);
            warenkorb = warenkorbService.getOrCreateForKunde(kunde);
        } else {
            warenkorb = warenkorbService.getOrCreateForGast(gastToken);
        }

        warenkorbService.clear(warenkorb);
    }


    // 5️ Warenkorb zusammenführen (Gast → Kunde)

    @PostMapping("/merge")
    public WarenkorbAntwort mergeCart(
        @RequestParam String gastToken,
        @RequestParam Long kundeId
) {
    Kunde kunde = kundenVerwaltung.findeKundeById(kundeId);
    Warenkorb merged = warenkorbService.mergeGastIntoKunde(gastToken, kunde);
    return WarenkorbMapper.toAntwort(merged);
}

    
}