package de.priceland_digital.shop_backend.entity;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import jakarta.validation.constraints.NotBlank;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import com.fasterxml.jackson.annotation.JsonIgnore;

// Entität für Administratoren im Onlineshop
@Entity
@Table(name = "administrator")
public class Administrator {
 
// Validierungen und Attribute
@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
@Column(name="admin_id")
private Long id;
@NotBlank
@Column(unique = true)
private String username;


@NotBlank
// JsonIgnore um das Passwort nicht in API-Antworten zu senden
@JsonIgnore
private String passwort;

// Konstruktoren
public Administrator(){

}

public Administrator(String username, String passwort){
    this.username = username;
    this.passwort=passwort;
}


// Getter und Setter
public Long getAdminId(){
    return id;
}

public String getUsername(){
return username;
}

public void setUsername(String username){
    this.username = username;
}

public String getPasswort(){
    return passwort;
}
public void setPasswort(String passwort){
    this.passwort = passwort;
}

}
