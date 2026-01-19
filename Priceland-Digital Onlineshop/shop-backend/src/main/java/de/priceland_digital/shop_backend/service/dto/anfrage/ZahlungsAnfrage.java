package de.priceland_digital.shop_backend.service.dto.anfrage;

import de.priceland_digital.shop_backend.status.ZahlungsMethode;

public class ZahlungsAnfrage {
    
    private ZahlungsMethode zahlungsMethode;

    public ZahlungsAnfrage() {
    }

    public ZahlungsMethode getZahlungsMethode(){
        return zahlungsMethode;
    }

    public void setZahlungsMethode(ZahlungsMethode zahlungsMethode){
        this.zahlungsMethode = zahlungsMethode;

    }

}
