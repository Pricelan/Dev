package de.priceland_digital.shop_backend.service.dto.anfrage;

import jakarta.persistence.Column;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

// Anfrage DTO für einen Software-Hersteller
public class SoftwareHerstellerAnfrage {
    
    //Validierungen
    @NotBlank
    private String name;
    @NotBlank
    private String adresse;
    @NotBlank
    @Email
    @Column(unique = true)
    private String email;
    private String webseite;

    // Standard-Konstruktor
    public SoftwareHerstellerAnfrage() {
    }

    // Getter und Setter
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public String getAdresse() {
        return adresse;
    }
    public void setAdresse(String adresse) {
        this.adresse = adresse;
    }
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public String getWebseite() {
        return webseite;
    }
    public void setWebseite(String webseite) {
        this.webseite = webseite;
    }
    
}
    

