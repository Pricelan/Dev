package de.priceland_digital.shop_backend.entity;

import java.math.BigDecimal;

import de.priceland_digital.shop_backend.status.Kategorie;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;


// Entität für kostenlose Software im Onlineshop
@Entity
@DiscriminatorValue("SOFTWARE_KOSTENLOS")
public class SoftwareKostenlos extends Software {

    // Fester Preis für kostenlose Software von 0 EUR
    private static final BigDecimal preis = BigDecimal.ZERO;
    private String quelle;

    // Konstruktoren
    public SoftwareKostenlos() {
        super();
    }

    public SoftwareKostenlos(Long id, String name, String version, String downloadLink, String softwareBeschreibung, String quelle, Kategorie kategorieListe, SoftwareHersteller hersteller) {
        super(id, name, version,BigDecimal.ZERO , downloadLink, softwareBeschreibung, kategorieListe, hersteller);
        this.quelle = quelle;
    }

    // Getter und Setter

public String getQuelle() {
        return quelle;
    }

public void setQuelle(String quelle) {
        this.quelle = quelle;
    }

public String zeigeInfo() {
        return super.zeigeInfo() + ", Quelle: " + quelle + ", Preis: " + preis + " EUR";
    
}
}
