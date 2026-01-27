package de.priceland_digital.shop_backend.entity;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import de.priceland_digital.shop_backend.status.ZahlungsMethode;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

// Entität für Gäste im Onlineshop
@Entity
@Table(name = "gast")
public class Gast {

    // Validierungen und Attribute
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="gast_id")
    private Long id;

    @NotBlank
    private String vorname;

    @NotBlank
    private String nachname;

    // E-Mail Adresse kann mehrfach vorkommen
    @NotBlank
    @Email
    @Column(unique = false)
    private String email;

    private String strasse;
    private String hausnummer;
    private String plz;
    private String ort;
    private String telefonnummer;
    private LocalDateTime erstelltAm = LocalDateTime.now();
    private ZahlungsMethode zahlungsMethode;

    // Beziehung zu Bestellungen
   @OneToMany(mappedBy = "gast", cascade = CascadeType.ALL)
    private List<Bestellung> bestellungen = new ArrayList<>();
    private String rolle = "GAST";

    // Konstruktoren
    public Gast() {
    }
    public Gast(String vorname, String nachname, String email, String strasse, String hausnummer, String plz, String ort, String telefonnummer, ZahlungsMethode zahlungsMethode) {
        this.vorname = vorname;
        this.nachname = nachname;
        this.email = email;
        this.strasse = strasse;
        this.hausnummer = hausnummer;
        this.plz = plz;
        this.ort = ort;
        this.telefonnummer = telefonnummer;
        this.zahlungsMethode = zahlungsMethode;
    }
    // Getter und Setter
    public Long getId() {
        return id;
    }       
    public void setId(Long id) {
        this.id = id;
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
    public LocalDateTime getErstelltAm() {
        return erstelltAm;
    }
    public void setErstelltAm(LocalDateTime erstelltAm) {
        this.erstelltAm = erstelltAm;
    }
    public ZahlungsMethode getZahlungsMethode() {
        return zahlungsMethode;
    }
    public void setZahlungsMethode(ZahlungsMethode zahlungsMethode) {
        this.zahlungsMethode = zahlungsMethode;
    }
  


    
}
