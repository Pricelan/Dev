package de.priceland_digital.shop_backend.entity;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.util.ArrayList;
import java.time.LocalDateTime;

@Entity
@Table(name = "kunden")
public class Kunde {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="kunde_id")
    private Long id;
    @NotBlank
    private String vorname;
    @NotBlank
    private String nachname;
    @NotBlank
    @Email
    @Column(unique = true)
    private String email;
    private String strasse;
    private String hausnummer;
    private String plz;
    private String ort;
    private String telefonnummer;
    private String passwort;
    private String rolle = "KUNDE";
    private boolean aktiviert = true;
    private LocalDateTime registrierungsdatum = LocalDateTime.now();
    @OneToMany(mappedBy = "kunde", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Bestellung> bestellungen= new ArrayList<>();
    
    
    //Konstructor//

    public Kunde() {
    }

    public Kunde(String vorname, String nachname, String email, String strasse, String hausnummer, String plz, String ort, String telefonnummer, String passwort, boolean aktiviert) {

        this.vorname = vorname;
        this.nachname = nachname;
        this.email = email;
        this.strasse = strasse;
        this.hausnummer = hausnummer;
        this.plz = plz;
        this.ort = ort;
        this.telefonnummer = telefonnummer;
        this.passwort = passwort;
        this.aktiviert = aktiviert;

    }
    // Getters and Setters//

    public Long getId() {
            return id;
    }
    
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
    public String getRolle() {
        return rolle;
    }
    public void setRolle(String rolle) {
        this.rolle = rolle;
    }
    public boolean isAktiviert() {
        return aktiviert;
    }
    public void setAktiviert(boolean aktiviert) {
        this.aktiviert = aktiviert;
    }
    public LocalDateTime getRegistrierungsdatum() {
        return registrierungsdatum;
    }
    public void setRegistrierungsdatum(LocalDateTime registrierungsdatum) {
        this.registrierungsdatum = registrierungsdatum;
    }
    public String getPasswort() {
        return passwort;
    }
    public void setPasswort(String passwort) {
        this.passwort = passwort;
    }
   
  
    // Bestellungen verwalten //    
    public void addBestellung(Bestellung bestellung) {
        this.bestellungen.add(bestellung);
    }
    public List<Bestellung> getBestellungen() {
        return bestellungen;
    }

   

          
}
