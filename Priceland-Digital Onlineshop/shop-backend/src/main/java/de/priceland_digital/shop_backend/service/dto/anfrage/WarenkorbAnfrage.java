package de.priceland_digital.shop_backend.service.dto.anfrage;

// Anfrage DTO für ein Warenkorb-Item
public class WarenkorbAnfrage {

    private Long softwareId;
    private int menge;
    private String gastToken;
    private Long kundeId;

    // Standard-Konstruktor
    public WarenkorbAnfrage() {
    }

    // Getter und Setter
    public Long getSoftwareId() {
        return softwareId;
    }
    public void setSoftwareId(Long softwareId) {
        this.softwareId = softwareId;
    }
    public int getMenge() {
        return menge;
    }
    public void setMenge(int menge) {
        this.menge = menge;
    }
    public String getGastToken() {
        return gastToken;
    }
    public void setGastToken(String gastToken) {
        this.gastToken = gastToken;
    }
    public Long getKundeId() {
        return kundeId;
    }
    public void setKundeId(Long kundeId) {
        this.kundeId = kundeId;
    }
    
}
