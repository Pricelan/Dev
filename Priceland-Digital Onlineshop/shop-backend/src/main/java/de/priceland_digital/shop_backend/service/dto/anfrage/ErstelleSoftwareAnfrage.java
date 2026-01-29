package de.priceland_digital.shop_backend.service.dto.anfrage;
import de.priceland_digital.shop_backend.status.Kategorie;

import java.math.BigDecimal;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

// Anfrage DTO zum Erstellen einer Software
public class ErstelleSoftwareAnfrage {

    // Validierungen
    @NotBlank
    private String name;

    @NotBlank
    private String version;

    @NotNull
    private BigDecimal preis;
    
    private String downloadLink;

    @NotBlank
    private String softwareBeschreibung;
    
    @NotNull
    private Long herstellerId;

    private Kategorie kategorieListe;

    // Standard-Konstruktor
    public ErstelleSoftwareAnfrage() {
    }

    // Getter und Setter
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getVersion() {
        return version;
    }
    public void setVersion(String version) {
        this.version = version;
    }
    public BigDecimal getPreis() {
        return preis;
    }
    public void setPreis(BigDecimal preis) {
        this.preis = preis;
    }       
    public String getDownloadLink() {
        return downloadLink;
    }
    public void setDownloadLink(String downloadLink) {
        this.downloadLink = downloadLink;
    }
    public String getSoftwareBeschreibung() {
        return softwareBeschreibung;
    }
    public void setSoftwareBeschreibung(String softwareBeschreibung) {
        this.softwareBeschreibung = softwareBeschreibung;
    }
    public Long getHerstellerId() {
        return herstellerId;
    }
    public void setHerstellerId(Long herstellerId) {
        this.herstellerId = herstellerId;
    }
    public Kategorie getKategorieListe() {
        return kategorieListe;
    }

}
    

