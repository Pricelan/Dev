package de.priceland_digital.shop_backend.service.dto.anfrage;

import de.priceland_digital.shop_backend.status.ZahlungsMethode;

public class CheckoutAnfrage {
    
    // Identifikation
    private String gastToken; // Immer dabei, um den aktuellen Warenkorb zu finden
    private Long kundeId;     // Nur gefüllt, wenn Kurt eingeloggt ist

    // Gast-Daten (Dürfen hier NICHT @NotBlank sein, da Kurt sie nicht mitschickt!)
    private String vorname;
    private String nachname;
    private String email;
    private String strasse;
    private String hausnummer;
    private String plz;
    private String ort;
    private String telefonnummer;
    private ZahlungsMethode zahlungsMethode; // Neu: Zahlungsart für Gast-Checkout

    public CheckoutAnfrage() {
    }

    // Hilfsmethode für den Controller
    public boolean isGastCheckout() {
        return kundeId == null;
    }

    // Getter und Setter
    public Long getKundeId() { return kundeId; }
    public void setKundeId(Long kundeId) { this.kundeId = kundeId; }

    public String getGastToken() { return gastToken; }
    public void setGastToken(String gastToken) { this.gastToken = gastToken; }

    public String getVorname() { return vorname; }
    public void setVorname(String vorname) { this.vorname = vorname; }

    public String getNachname() { return nachname; }
    public void setNachname(String nachname) { this.nachname = nachname; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getStrasse() { return strasse; }
    public void setStrasse(String strasse) { this.strasse = strasse; }

    public String getHausnummer() { return hausnummer; }
    public void setHausnummer(String hausnummer) { this.hausnummer = hausnummer; }

    public String getPlz() { return plz; }
    public void setPlz(String plz) { this.plz = plz; }

    public String getOrt() { return ort; }
    public void setOrt(String ort) { this.ort = ort; }

    public String getTelefonnummer() { return telefonnummer; }
    public void setTelefonnummer(String telefonnummer) { this.telefonnummer = telefonnummer; }

    public ZahlungsMethode getZahlungsMethode() { return zahlungsMethode; }
    public void setZahlungsMethode(ZahlungsMethode zahlungsMethode) { this.zahlungsMethode = zahlungsMethode;}
}
    
    

