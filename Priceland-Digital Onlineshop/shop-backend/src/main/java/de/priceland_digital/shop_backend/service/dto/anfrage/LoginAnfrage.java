package de.priceland_digital.shop_backend.service.dto.anfrage;

// Anfrage DTO für Login-Daten
public class LoginAnfrage {
    
    private Long id;
    private String passwort;
    private String email;

    // Standard-Konstruktor
    public LoginAnfrage() {
    }
 
    // Getter und Setter
    public String getPasswort() {
        return passwort;
    }
    public void setPasswort(String passwort) {
        this.passwort = passwort;
    }
    public String getEmail() {
        return email;
    }   
    public void setEmail(String email) {
        this.email = email;
    }
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    
}
