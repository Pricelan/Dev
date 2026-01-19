package de.priceland_digital.shop_backend.service.dto.anfrage;


public class PositionsAnfrage {
    
    private Long softwareId;
    private int menge;

    public PositionsAnfrage() {
    }
    public PositionsAnfrage(Long softwareId, int menge) {
        this.softwareId = softwareId;
        this.menge = menge;
    }
    public Long getSoftwareId() {
        return softwareId;
    }
    public int getMenge() {
        return menge;
    }
}
