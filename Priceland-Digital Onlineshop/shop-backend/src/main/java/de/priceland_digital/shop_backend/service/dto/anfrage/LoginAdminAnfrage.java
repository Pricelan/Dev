package de.priceland_digital.shop_backend.service.dto.anfrage;

// Anfrage DTO für Login-Daten eines Admins
public class LoginAdminAnfrage {
    private Long id;
    private String username;
    private String passwort;
   
    // Standard-Konstruktor
    public LoginAdminAnfrage() {
    }

    // Getter und Setter
    public Long getId() {
        return id;
    }   
    public void setId(Long id) {
        this.id = id;
    }
    public String getUsername() {
        return username;
    }
    public void setUsername(String username) {
        this.username = username;
    }
    public String getPasswort() {
        return passwort;
    }
    public void setPasswort(String passwort) {
        this.passwort = passwort;

}

    
}
