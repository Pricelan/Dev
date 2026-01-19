package de.priceland_digital.shop_backend.entity;
import de.priceland_digital.shop_backend.status.ZahlungsMethode;
import de.priceland_digital.shop_backend.status.ZahlungsStatus;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Table;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;

import java.math.BigDecimal;

import java.time.LocalDateTime;
@Entity
@Table(name = "zahlungen")

public class Zahlung {

@Id 
@GeneratedValue (strategy = GenerationType.IDENTITY)
@Column(name="zahlung_id")
private Long id;
private LocalDateTime zeitpunkt;
@Enumerated (EnumType.STRING) 
private ZahlungsStatus status;
@Enumerated (EnumType.STRING)
private ZahlungsMethode zahlungsMethode;
private BigDecimal betrag;

@ManyToOne
private Bestellung bestellung;


public Zahlung(){   
    }

public Zahlung(BigDecimal betrag) {
    if (betrag == null || betrag.compareTo(BigDecimal.ZERO)<= 0){
        throw new IllegalArgumentException("Betrag muss größer 0 sein");
    }
        this.status = ZahlungsStatus.OFFEN;
        this.zeitpunkt = LocalDateTime.now();
        this.betrag = betrag;
    }
  


    public LocalDateTime getZeitpunkt() {
        return zeitpunkt;
    }

    public ZahlungsStatus getStatus() {
        return status;
    }

 
    public ZahlungsMethode getZahlungsMethode() {
        return zahlungsMethode;
    }
    public void setBestellung(Bestellung bestellung) {
    this.bestellung = bestellung;
}

    public BigDecimal getBetrag() {
        return betrag;
    }

    public void bezahlen(){
        if (this.status != ZahlungsStatus.OFFEN){
         throw new IllegalStateException ("Die Zahlung kann nicht erneut durchgeführt werden");
        }
        this.status=ZahlungsStatus.BEZAHLT;
     
    }

    public void setZahlungsMethode(ZahlungsMethode methode){
        if(this.zahlungsMethode != null){
            throw new IllegalStateException("Zahlungsmethode bereits gesetzt");
        }

        this.zahlungsMethode=methode;
    }
}
