package de.priceland_digital.shop_backend.service.dto.anfrage;

import java.util.List;

public class BestellAnfrage {

    private Long kundeId;
    private List<PositionsAnfrage> positionen;

    public BestellAnfrage() {
    }

     public void setKundeId(Long kundeId) {
        this.kundeId = kundeId;
    }

    public Long getKundeId() {
        return kundeId;
    }

    public List<PositionsAnfrage> getPositionen() {
        return positionen;
    }
   
    public void setPositionen(List<PositionsAnfrage> positionen) {
        this.positionen = positionen;
    }
}