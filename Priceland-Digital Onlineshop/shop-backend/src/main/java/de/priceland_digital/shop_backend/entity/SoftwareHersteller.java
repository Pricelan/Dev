package de.priceland_digital.shop_backend.entity;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.persistence.Table;

// Entität für Software-Hersteller im Onlineshop
@Entity
@Table(name = "softwarehersteller")
public class SoftwareHersteller {

// Validierungen und Attribute
@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
@Column(name="hersteller_id")
private Long id;


@NotBlank
private String name;
@NotBlank
private String adresse;
@NotBlank
@Email
@Column(unique = true)
private String email;
private String webseite;

// Beziehung zu Software-Entitäten
@OneToMany(mappedBy = "hersteller")
    private List<Software> softwareListe = new ArrayList<>();

// Konstruktoren
public SoftwareHersteller(){

}

public SoftwareHersteller (String name, String adresse, String email, String webseite){
    this.name=name;
    this.adresse=adresse;
    this.email=email;
    this.webseite=webseite;
    
}

// Getter und Setter
public String getName(){
    return name;
}

public void setName(String name){
    this.name=name;
}

public String getEmail(){
    return email;
}

public String getAdresse(){
    return adresse;
}

public void setAdresse(String adresse){
    this.adresse=adresse;
}
public void setWebseite(String webseite){
    this.webseite=webseite;
}
public String getWebseite(){
    return webseite;
}
public Long getId(){
    return id;
}


    
}
