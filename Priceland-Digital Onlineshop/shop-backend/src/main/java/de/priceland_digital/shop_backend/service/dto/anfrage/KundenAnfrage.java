package de.priceland_digital.shop_backend.service.dto.anfrage;


import jakarta.validation.constraints.NotBlank;

public class KundenAnfrage {

    @NotBlank
    private String vorname;
    @NotBlank
    private String nachname;
    @NotBlank
    private String email;
    @NotBlank
    private String passwort;
    private String strasse;
    private String hausnummer;
    private String plz;
    private String ort;
    private String telefonnummer;

    public KundenAnfrage() {
    }

    public String getEmail(){
        return email;
    }

    public void setEmail(String email){
        this.email=email;
    }
    public String getVorname(){
        return vorname;
    }

    public void setVorname(String vorname){
        this.vorname = vorname;
    }

    public String getNachname(){
        return nachname;
    }

    public void setNachname(String nachname){
        this.nachname = nachname;
    }

    public String getPasswort(){
        return passwort;
    }

    public void setPasswort(String passwort){
        this.passwort=passwort;
    }

   public void setStrasse(String strasse){
        this.strasse=strasse;
    } 
    public String getStrasse(){
        return strasse;
    } 

    public void setHausnummer(String hausnummer){
        this.hausnummer=hausnummer;
    } 
    public String getHausnummer(){
        return hausnummer;
    }
    public void setPlz(String plz){
        this.plz=plz;
    }
    public String getPlz(){
        return plz;
    }
    public void setOrt(String ort){
        this.ort=ort;
    }
    public String getOrt(){
        return ort;
    }
    public void setTelefonnummer(String telefonnummer){
        this.telefonnummer=telefonnummer;
    }
    public String getTelefonnummer(){
        return telefonnummer;
    }

  

}



