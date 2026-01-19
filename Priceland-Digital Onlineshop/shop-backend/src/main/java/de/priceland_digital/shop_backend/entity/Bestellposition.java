package de.priceland_digital.shop_backend.entity;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;

import java.math.BigDecimal;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

import com.fasterxml.jackson.annotation.JsonBackReference;


@Entity
@Table(name = "bestellpositionen")
public class Bestellposition {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="bestellposition_id")
    private Long id;
    private int menge;
    private BigDecimal einzelpreis;

    @ManyToOne (optional = false)
    @JoinColumn(name ="software_id")
    private Software software;

    @ManyToOne
    @JoinColumn(name ="bestell_id")
   @JsonBackReference
    private Bestellung bestellung;

    public void setBestellung(Bestellung bestellung) {
        this.bestellung = bestellung;
    }
    
        // Konstruktor //

    public Bestellposition() {
    }

    public Bestellposition(Software software,int menge, BigDecimal einzelpreis) throws IllegalArgumentException {
        this.software = software;
        if(software == null) {
            throw new IllegalArgumentException("Das Produkt darf nicht null sein.");
        }
        this.menge = menge;
        if(menge < 1) {
            throw new IllegalArgumentException("Die Menge muss mindestens 1 sein.");
        }
        this.einzelpreis = einzelpreis;
        if(einzelpreis.compareTo(BigDecimal.ZERO) < 0) {
            throw new IllegalArgumentException("Der Einzelpreis darf nicht negativ sein.");
        }
    }

    public Long getId() {
        return id;
    }   
    public int getMenge() {
        return menge;
    }
    public void setMenge(int menge) {
        this.menge = menge;
     }
    public BigDecimal getEinzelpreis() {
        return einzelpreis;
    }
    public void setEinzelpreis(BigDecimal einzelpreis) {
        this.einzelpreis = einzelpreis;
     }
    public Software getSoftware() {
        return software;
    }
    public void setSoftware(Software software) {
        this.software = software;
     }

    public Bestellung getBestellung() {
        return bestellung;
    }

       public BigDecimal berechneGesamtpreis() {
        return einzelpreis.multiply(BigDecimal.valueOf(menge));
    }
     
     

   
  

    
}
