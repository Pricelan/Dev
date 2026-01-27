package de.priceland_digital.shop_backend.service.dto.anfrage;

// Anfrage DTO für Kunden-Registrierungsdaten
public class KundenRegisterAnfrage {
    
    public String vorname;
    public String nachname;
    public String email;
    public String passwort;
    public String strasse;
    public String hausnummer;
    public String plz;
    public String ort;
    public String telefonnummer;

    // Standard-Konstruktor    
    public KundenRegisterAnfrage() {
    }

    // Getter und Setter
    public String getVorname() {
        return vorname;
    }
    public void setVorname(String vorname) {
        this.vorname = vorname;
    }
    public String getNachname() {
        return nachname;
    }
    public void setNachname(String nachname) {
        this.nachname = nachname;
    }
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public String getPasswort() {
        return passwort;
    }
    public void setPasswort(String passwort) {
        this.passwort = passwort;
    }
    public String getStrasse() {
        return strasse;
    }
    public void setStrasse(String strasse) {
        this.strasse = strasse;
    }
    public String getHausnummer() {
        return hausnummer;
    }
    public void setHausnummer(String hausnummer) {
        this.hausnummer = hausnummer;
    }
    public String getPlz() {
        return plz;
    }
    public void setPlz(String plz) {
        this.plz = plz;
    }
    public String getOrt() {
        return ort;
    }
    public void setOrt(String ort) {
        this.ort = ort;
    }
    public String getTelefonnummer() {
        return telefonnummer;
    }
    public void setTelefonnummer(String telefonnummer) {
        this.telefonnummer = telefonnummer;
    }

    
}
