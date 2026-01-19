package de.priceland_digital.shop_backend.component.mapper;
import org.springframework.stereotype.Component;
import de.priceland_digital.shop_backend.entity.Bestellung;
import de.priceland_digital.shop_backend.service.dto.antwort.BestellAntwort;
import de.priceland_digital.shop_backend.service.dto.antwort.ZahlungsAntwort;


@Component
public class BestellMapper {


public static BestellAntwort toAntwort(Bestellung bestellung) {
    ZahlungsAntwort zahlungsAntwort = null;

    if (bestellung.getZahlung() != null) {
        zahlungsAntwort = new ZahlungsAntwort(
                bestellung.getZahlung().getBetrag(),
                bestellung.getZahlung().getStatus(),
                bestellung.getZahlung().getZahlungsMethode(),
                bestellung.getZahlung().getZeitpunkt()
        );
    }

    // Namen sicher ermitteln
    String käuferName = "Unbekannt";
    if (bestellung.getKunde() != null) {
        käuferName = bestellung.getKunde().getVorname() + " " + bestellung.getKunde().getNachname();
    } else if (bestellung.getGast() != null) {
        käuferName = bestellung.getGast().getVorname() + " " + bestellung.getGast().getNachname();
    }

    return new BestellAntwort(
            bestellung.getId(),
            käuferName,
            bestellung.getGesamtpreis(), 
            bestellung.getStatus(),
            bestellung.getErstelltAm(),
            zahlungsAntwort,
            BestellPositionMapper.toAntwortListe(bestellung.getPositionen())
    );
}
}