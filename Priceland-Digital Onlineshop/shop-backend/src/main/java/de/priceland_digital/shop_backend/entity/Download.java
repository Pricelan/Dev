package de.priceland_digital.shop_backend.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.JoinColumn;

// Entität für Downloads im Onlineshop
@Entity
@Table(name = "download")
public class Download {

// Validierungen und Attribute
@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
@Column(name="dowload_id")
private Long id;
private LocalDateTime zeitpunkt;
private String ipAdresse;
private String lizenzKey;
private String downloadLink;

// Beziehung zu Software
@ManyToOne(optional = false)
@JoinColumn(name = "software_id", nullable = false)
private Software software;

// Beziehung zu Kunde
@ManyToOne(optional = false)
@JoinColumn(name = "kunde_id", nullable = false)
private Kunde kunde;

// Konstruktoren
public Download(){

}

public Download(String ipAdresse, Kunde kunde, Software software, String lizenzKey, String downloadLink){
    this.ipAdresse = ipAdresse;
    this.zeitpunkt = LocalDateTime.now();
    this.kunde = kunde;
    this.software = software;
    this.lizenzKey = lizenzKey;
    this.downloadLink = downloadLink;
}

// Getter und Setter
public Long getId(){
return id;
}
 public LocalDateTime getZeitpunkt() {
        return zeitpunkt;
}

public String getIpAdresse(){
    return ipAdresse;
}

public void setSoftware(Software software){
    this.software = software;
}

public void setZeitpunkt(LocalDateTime zeitpunkt) {
        this.zeitpunkt = zeitpunkt; 
}

public void setIpAdresse(String ipAdresse){
    this.ipAdresse = ipAdresse;
}
public void setKunde(Kunde kunde){
    this.kunde = kunde;
}
public Kunde getKunde(){
    return kunde;
}

public Software getSoftware(){
    return software;
}
public String getLizenzKey(){
    return lizenzKey;
}
public void setLizenzKey(String lizenzKey){
    this.lizenzKey = lizenzKey;
}
public String getDownloadLink(){
    return downloadLink;
}

    
}
