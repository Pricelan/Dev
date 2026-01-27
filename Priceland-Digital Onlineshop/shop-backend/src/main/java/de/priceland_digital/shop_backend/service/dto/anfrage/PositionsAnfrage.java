package de.priceland_digital.shop_backend.service.dto.anfrage;

// Anfrage DTO für eine Position im Warenkorb oder in der Bestellung
public class PositionsAnfrage {
    
    private Long softwareId;
    private int menge;

    // Standard-Konstruktor und Konstruktor mit Parametern
    public PositionsAnfrage() {
    }

    public PositionsAnfrage(Long softwareId, int menge) {
        this.softwareId = softwareId;
        this.menge = menge;
    }

    // Getter
    public Long getSoftwareId() {
        return softwareId;
    }
    public int getMenge() {
        return menge;
    }
}
