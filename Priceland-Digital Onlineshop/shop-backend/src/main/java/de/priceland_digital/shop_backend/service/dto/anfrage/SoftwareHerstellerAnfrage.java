package de.priceland_digital.shop_backend.service.dto.anfrage;

import jakarta.persistence.Column;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public class SoftwareHerstellerAnfrage {
    
    
    @NotBlank
    private String name;
    @NotBlank
    private String adresse;
    @NotBlank
    @Email
    @Column(unique = true)
    private String email;

    private String webseite;

    public SoftwareHerstellerAnfrage() {
    }

    // Getter
    public String getName() { return name; }
    public String getWebseite() { return webseite; }
    public String getAdresse() { return adresse; }
    public String getEmail() { return email; }
    // Setter
    public void setName(String name) { this.name = name; }
    public void setWebseite(String webseite) { this.webseite = webseite; }
    public void setAdresse(String adresse) { this.adresse = adresse; }
    public void setEmail(String email) { this.email = email; }
    
}
    

