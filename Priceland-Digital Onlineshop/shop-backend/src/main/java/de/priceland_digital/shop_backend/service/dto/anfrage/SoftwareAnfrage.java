package de.priceland_digital.shop_backend.service.dto.anfrage;

import de.priceland_digital.shop_backend.entity.SoftwareHersteller;
import java.math.BigDecimal;


// Anfrage DTO für eine Software
public class SoftwareAnfrage {

    private BigDecimal preis;
    private String name;
    private String version;
    private String downloadLink;
    private String softwareBeschreibung;
    private SoftwareHersteller hersteller;
    private Long herstellerId;

    // Standard-Konstruktor
    public SoftwareAnfrage() {
    }

    // Getter and Setter //

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
    public void setHersteller(SoftwareHersteller hersteller) {
        this.hersteller = hersteller;
    }

    public SoftwareHersteller getHersteller() {
        return hersteller;
    }
    public Long getHerstellerId() {
        return herstellerId;
    }

    public void setHerstellerId(Long herstellerId) {
    this.herstellerId = herstellerId;
    }
    public BigDecimal getPreis() {
        return preis;
    }

 



    
}
