package de.priceland_digital.shop_backend.entity;

import java.math.BigDecimal;

import de.priceland_digital.shop_backend.status.Kategorie;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;

// Entität für Computer-Spiele im Onlineshop
@Entity
@DiscriminatorValue("COMPUTER_SPIEL")
public class ComputerSpiel extends Software {
    private String genre;
    private String plattform;
    private String altersEinstufung;

    
    
    // Konstruktoren
    public ComputerSpiel() {
        super();
    }

    public ComputerSpiel(Long id, String name, String version, BigDecimal preis, String downloadLink, String softwareBeschreibung, String genre, String plattform, String altersEinstufung, Kategorie kategorieListe, SoftwareHersteller hersteller) {
        super(id, name, version, preis, downloadLink, softwareBeschreibung, kategorieListe, hersteller);
        this.genre = genre;
        this.plattform = plattform;
        this.altersEinstufung = altersEinstufung;
    }

    
    // Getter und Setter
    public String getGenre() {
        return genre;
    }

    public void setGenre(String genre) {
        this.genre = genre;
    }

    public String getPlattform() {
        return plattform;
    }

    public void setPlattform(String plattform) {
        this.plattform = plattform;
    }

    public String zeigeInfo() {
        return super.zeigeInfo() + ", Genre: " + genre + ", Plattform: " + plattform;
    }

    public String getAltersEinstufung() {
        return altersEinstufung;
    }
    
    public void setAltersEinstufung(String altersEinstufung) {
        this.altersEinstufung = altersEinstufung;
    }
    
    
}
