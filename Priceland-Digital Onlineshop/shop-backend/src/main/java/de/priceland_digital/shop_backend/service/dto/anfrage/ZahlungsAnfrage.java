package de.priceland_digital.shop_backend.service.dto.anfrage;

import de.priceland_digital.shop_backend.status.ZahlungsMethode;

// Anfrage DTO für eine Zahlung
public class ZahlungsAnfrage {
    
    private ZahlungsMethode zahlungsMethode;

    // Standard-Konstruktor
    public ZahlungsAnfrage() {
    }
    
    // Getter und Setter
    public ZahlungsMethode getZahlungsMethode(){
        return zahlungsMethode;
    }

    public void setZahlungsMethode(ZahlungsMethode zahlungsMethode){
        this.zahlungsMethode = zahlungsMethode;

    }

}
