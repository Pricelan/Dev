package de.priceland_digital.shop_backend.entity;



import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;


@Entity
@Table(name = "warenkorb_item")
public class WarenkorbItem {
    @Id
    @GeneratedValue
    private Long id;

    @ManyToOne
    @JoinColumn(name = "warenkorb_id", nullable = false)
    private Warenkorb warenkorb;

    @ManyToOne
    @JoinColumn(name = "software_id", nullable = false)
    private Software software;

    private int menge;
    

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
