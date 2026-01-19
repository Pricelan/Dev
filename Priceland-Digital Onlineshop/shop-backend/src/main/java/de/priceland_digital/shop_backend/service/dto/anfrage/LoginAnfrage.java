package de.priceland_digital.shop_backend.service.dto.anfrage;

public class LoginAnfrage {
    

    
    private Long id;
    private String passwort;
    private String email;

    public LoginAnfrage() {
    }

 
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
