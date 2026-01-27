package de.priceland_digital.shop_backend.entity;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import de.priceland_digital.shop_backend.status.KategorieListe;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.DiscriminatorColumn;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Inheritance;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.InheritanceType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

// Abstrakte Entität für Software im Onlineshop
@Entity
@Inheritance(strategy = InheritanceType.SINGLE_TABLE) 
@DiscriminatorColumn(name = "software_typ") 
public abstract class Software {

    // Validierungen und Attribute   
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="software_id")
    private Long id;
    @NotNull
    private BigDecimal preis;
    @NotBlank
    private String name;
    @NotBlank
    private String version;
    private String downloadLink;
    @Lob // Markiert es als "Large Object" (Text-Feld in der DB)
    @Column(columnDefinition = "TEXT")
    private String softwareBeschreibung;
    
    // Beziehung zu SoftwareHersteller
    @ManyToOne
    @JoinColumn(name = "hersteller_id", nullable = false)
    private SoftwareHersteller hersteller;

    // Beziehung zu Bestellposition und Download
    @OneToMany(mappedBy = "software")
    private List<Bestellposition> bestellpositionen;

    // Beziehung zu Download
    @OneToMany(mappedBy = "software", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Download> downloads = new ArrayList<>();

    // Kategorie als Enum
    @Enumerated(EnumType.STRING)
    private KategorieListe kategorieListe;
   

    // Konstruktoren

    public Software() {
    }

    public Software(Long id, String name, String version, BigDecimal preis, String downloadLink, String softwareBeschreibung, KategorieListe kategorieListe, SoftwareHersteller hersteller) {
        this.id = id;
        this.name = name;
        this.version = version;
        this.preis = preis;
        this.downloadLink = downloadLink;
        this.softwareBeschreibung = softwareBeschreibung;
        this.kategorieListe = kategorieListe;
        this.hersteller = hersteller;
    }

           
    // Getter und Setter

    public Long getId() {
        return id;
    }  
    public void setId(Long id) {
        this.id = id;
    }
    public BigDecimal getPreis() {
        return preis;
    }
    public void setPreis(BigDecimal preis) {
        this.preis = preis;
    }
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
        public SoftwareHersteller getHersteller() {
        return hersteller;
    }

    public void setHersteller(SoftwareHersteller hersteller) {
        this.hersteller = hersteller;
    }
    public KategorieListe getKategorieListe() {
        return kategorieListe;
    }
    public void setKategorieListe(KategorieListe kategorieListe) {
        this.kategorieListe = kategorieListe;
    }
    public void setSoftwareHersteller(SoftwareHersteller hersteller) {
        this.hersteller = hersteller;
    }   
    public SoftwareHersteller getSoftwareHersteller() {
        return hersteller;
    }
    
    // Methode zur Anzeige von Software-Informationen
    public String zeigeInfo() {
        return "Software [id=" + id + ", name=" + name + ", version=" + version + ", preis=" + preis
                + ", downloadLink=" + downloadLink + ", softwareBeschreibung=" + softwareBeschreibung + "]" + "softwarehersteller=" + hersteller;
    }

}

    