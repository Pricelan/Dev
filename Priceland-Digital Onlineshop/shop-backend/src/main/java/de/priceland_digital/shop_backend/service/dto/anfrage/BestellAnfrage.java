package de.priceland_digital.shop_backend.service.dto.anfrage;

import java.util.List;

// Anfrage DTO für eine Bestellung
public class BestellAnfrage {

    private Long kundeId;
    private List<PositionsAnfrage> positionen;

    // Standard-Konstruktor
    public BestellAnfrage() {
    }

    // Getter und Setter
     public void setKundeId(Long kundeId) {
        this.kundeId = kundeId;
    }

    public Long getKundeId() {
        return kundeId;
    }

    public List<PositionsAnfrage> getPositionen() {
        return positionen;
    }
   
    public void setPositionen(List<PositionsAnfrage> positionen) {
        this.positionen = positionen;
    }
}