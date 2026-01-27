package de.priceland_digital.shop_backend.entity;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;

import java.util.List;
import java.math.BigDecimal;
import java.util.ArrayList;

// Entität für den Warenkorb im Onlineshop
@Entity
@Table(name = "warenkorb")
public class Warenkorb {

    //Validierung der Eingaben
    @Id
    @GeneratedValue
    @Column(name="warenkorb_id")
    private Long id;

    private String gastToken; // falls kein Login

    //Verknüpfung zum Kunden (optional)
    @ManyToOne
    @JoinColumn(name = "kunde_id")
    private Kunde kunde;

    //Verknüpfung zu den Warenkorb-Items
    @OneToMany(mappedBy = "warenkorb", cascade = CascadeType.ALL, orphanRemoval = true)
        private List<WarenkorbItem> positionen= new ArrayList<>();
    
    // Konstruktor
    public Warenkorb() {
        this.positionen = new ArrayList<>();
    }

    // Getter und Setter
    public Long getId() {
        return id;
    }
    
    public Kunde getKunde() {
        return kunde;
    }
    public void setKunde(Kunde kunde) {
        this.kunde = kunde;
    }
    public List<WarenkorbItem> getPositionen() {
        return positionen;
    }
    public void setPositionen(List<WarenkorbItem> positionen) {
        this.positionen = positionen;
    }

    public void setGastToken(String gastToken) {
        this.gastToken = gastToken;
    }
    
    public String getGastToken() {
        return gastToken;
    }

    // Berechnung des Gesamtpreises und der Gesamtmenge
    public BigDecimal getGesamtpreis() { 
    BigDecimal gesamtpreis = BigDecimal.ZERO;
    // Ich nutze 'this', um auf die eigenen Positionen zuzugreifen
        for (WarenkorbItem position : this.positionen) {
            BigDecimal preis = position.getSoftware().getPreis();
            BigDecimal menge = BigDecimal.valueOf(position.getMenge());
            gesamtpreis = gesamtpreis.add(preis.multiply(menge));
    }
    return gesamtpreis;
}

    // Berechnung der Gesamtmenge
    public int getGesamtmenge() { 
        int gesamtmenge = 0;
        for (WarenkorbItem position : this.positionen) {
        gesamtmenge += position.getMenge(); 
    }
    return gesamtmenge;
}

}