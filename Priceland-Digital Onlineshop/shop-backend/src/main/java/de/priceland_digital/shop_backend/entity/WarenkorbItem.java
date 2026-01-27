package de.priceland_digital.shop_backend.entity;



import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

// Entität für ein Item im Warenkorb
@Entity
@Table(name = "warenkorb_item")
public class WarenkorbItem {

    //Validierung der Eingaben
    @Id
    @GeneratedValue
    private Long id;
    private int menge;

    //Verknüpfung zum Warenkorb und zur Software
    @ManyToOne
    @JoinColumn(name = "warenkorb_id", nullable = false)
    private Warenkorb warenkorb;

    //Verknüpfung zur Software
    @ManyToOne
    @JoinColumn(name = "software_id", nullable = false)
    private Software software;
  
    // Getter und Setter 
    public Long getId() {
        return id;
    }
    
    public void setSoftware(Software software) {
        this.software = software;
    }

    public Software getSoftware() {
        return software;
    }

    public void setMenge(int menge) {
        this.menge = menge;
    }

    public int getMenge() {
        return menge;
    }
       
    public void setWarenkorb(Warenkorb warenkorb) {
        this.warenkorb = warenkorb;
    }

    public Warenkorb getWarenkorb() {
        return warenkorb;
    }
   

}
