package de.priceland_digital.shop_backend.entity;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import jakarta.persistence.Id;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;


import de.priceland_digital.shop_backend.status.BestellStatus;

import java.util.ArrayList;


@Entity
@Table(name = "bestellungen")

public class Bestellung {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="bestell_id")
    private Long id;
    private LocalDateTime erstelltAm;
    private BigDecimal gesamtpreis;
   @OneToOne(cascade = CascadeType.ALL) // Füge das hier hinzu
    @JoinColumn(name = "zahlung_id")      
    private Zahlung zahlung;
    @Enumerated(EnumType.STRING)
    private BestellStatus status;
   
        

     // Beziehungen //
        
    @OneToMany (mappedBy = "bestellung", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<Bestellposition> positionen = new ArrayList<>();

    @ManyToOne(optional = true)
    @JoinColumn(name = "kunde_id")
    @JsonIgnoreProperties({"bestellungen", "passwort"})
    private Kunde kunde;

    @ManyToOne(optional = true)
    @JoinColumn(name = "gast_id")
    @JsonIgnoreProperties("bestellungen")
    private Gast gast;
  
    
       

    // Konstruktor

    public Bestellung() {
    }


    public Bestellung(Long id, Kunde kunde, List<Bestellposition> positionen, LocalDateTime erstelltAm, Zahlung zahlung, BestellStatus status,Gast gast) {
        this.id = id;
        this.kunde = kunde;
        this.positionen = positionen;
        this.erstelltAm = erstelltAm;
        this.zahlung = zahlung;
        this.status = status;
        this.gast = gast;
    }   

    public Bestellung(Kunde kunde,Gast gast,List<Bestellposition> positionen) throws IllegalArgumentException {
        this.kunde = kunde;
        this.gast = gast;
          
     if (kunde == null && gast == null) {
    throw new IllegalArgumentException("Bestellung braucht Kunde oder Gast");
}
        
        this.positionen = positionen;
        if(positionen == null || positionen.isEmpty()) {
            throw new IllegalArgumentException("Die Bestellung muss mindestens eine Bestellposition enthalten.");
        }
            for (Bestellposition position : positionen) {
            position.setBestellung(this);
        
        }
        this.status = BestellStatus.IN_BEARBEITUNG;
    }   
    // Methoden //

    public BigDecimal berechneGesamtpreis() {
        BigDecimal summe = BigDecimal.ZERO;
        for (Bestellposition position : positionen) {
            summe = summe.add(position.berechneGesamtpreis());
        }
        return summe;
    }

    public void verknuepfeZahlung(Zahlung zahlung) {
        if (zahlung == null) {
            throw new IllegalArgumentException("Die Zahlung darf nicht null sein.");
        }
        if(this.zahlung != null) {
            throw new IllegalStateException("Zahlung ist bereits verknüpft.");
        }
        this.zahlung = zahlung;
    }
            
    public void naechsteStatus(){
        ;
            if(this.status == BestellStatus.IN_BEARBEITUNG){
                  
            if(zahlung == null)
            throw new IllegalStateException("Bestellung noch nicht bezahlt");
        }
        BestellStatus next = status.next();
        if(next==null){
            throw new IllegalStateException("Es gibt keinen weiteren Status");
        }
        this.status=next;
    }

    // Getter und Setter //

    public Kunde getKunde() {
        return kunde;
    }
    public void setKunde(Kunde kunde) {
        this.kunde = kunde;
    }
    public List<Bestellposition> getPositionen() {
        return positionen;
    }   
    public void setPositionen(List<Bestellposition> positionen) {
        this.positionen = positionen;
    }    
    public LocalDateTime getErstelltAm() {
        return erstelltAm;
    }
    public void setErstelltAm(LocalDateTime erstelltAm) {
        this.erstelltAm = erstelltAm;
    }
    public void setZahlung(Zahlung zahlung){
        this.zahlung = zahlung;
    }
    public Zahlung getZahlung(){
        return zahlung;
    }
    public Long getId (){
        return id;
    }
    public BestellStatus getStatus(){
        return status;
    }
    public void setStatus(BestellStatus status){
        this.status = status;
    }
    public Gast getGast() {
        return gast;
    }
    public void setGast(Gast gast) {
        this.gast = gast;
    }
    public BigDecimal getGesamtpreis() {
        return gesamtpreis;
    }   

    public void setGesamtpreis(BigDecimal gesamtpreis) {
        this.gesamtpreis = gesamtpreis;
    }
 
    
    
    
}