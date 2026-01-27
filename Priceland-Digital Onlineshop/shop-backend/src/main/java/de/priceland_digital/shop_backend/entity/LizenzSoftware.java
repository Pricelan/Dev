package de.priceland_digital.shop_backend.entity;

import java.math.BigDecimal;

import de.priceland_digital.shop_backend.status.KategorieListe;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;


// Entität für Lizenz-Software im Onlineshop
@Entity
@DiscriminatorValue("LIZENZ_SOFTWARE")
public class LizenzSoftware  extends Software {
    private String aktivierungsLink;

    // Konstruktoren
    public LizenzSoftware() {
        super();
    }   
    
    public LizenzSoftware(Long id, String name, String version, BigDecimal preis, String downloadLink, String softwareBeschreibung, String aktivierungsLink, KategorieListe kategorieListe, SoftwareHersteller hersteller) {
        super(id, name, version, preis, downloadLink, softwareBeschreibung, kategorieListe, hersteller);
        this.aktivierungsLink = aktivierungsLink;
    }

    // Getter und Setter
    public String getAktivierungsLink() {
        return aktivierungsLink;
    }

    public void setAktivierungsLink(String aktivierungsLink) {
        this.aktivierungsLink = aktivierungsLink;
    }

}
