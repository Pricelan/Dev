package de.priceland_digital.shop_backend.service;
import java.util.Optional;

import de.priceland_digital.shop_backend.exceptions.CustomerAlreadyExistsException;
import de.priceland_digital.shop_backend.entity.Kunde;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import de.priceland_digital.shop_backend.persistence.KundenRepository;
import de.priceland_digital.shop_backend.service.dto.anfrage.KundenAnfrage;
import java.util.List;


@Service
@RequiredArgsConstructor
@Transactional
public class KundenVerwaltung {

    private final KundenRepository repo;
    // Passwort-Encoder für die Verschlüsselung
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
       
   
   
    // Kunde anhand der ID finden
    public Kunde findeKundeById (Long kundenId) {
    return repo.findById(kundenId).orElse(null);  
    }   

    // Kunde anhand der E-Mail finden
    public Kunde findeKundeByEmail (String email) {
        Optional<Kunde> kundeOpt = repo.findByEmail(email);
    return kundeOpt.orElse(null);
    }   

    // Neuer Kunde registrieren
     public Kunde registrieren(String vorname, String nachname, String email, String strasse, String hausnummer, String plz, String ort, String telefonnummer, String passwort) throws CustomerAlreadyExistsException {
        
        // 1. Prüfen ob E-Mail existiert
        if (repo.findByEmail(email).isPresent()) {
            throw new CustomerAlreadyExistsException("Ein Kunde mit dieser E-Mail-Adresse ist bereits registriert.");
        }

        // 2. Passwort verschlüsseln (Hashing)
        String verschluesseltesPasswort = passwordEncoder.encode(passwort);

        // 3. Kunde mit verschlüsseltem Passwort erstellen
        Kunde neuerKunde = new Kunde(vorname, nachname, email, strasse, hausnummer, plz, ort, telefonnummer, verschluesseltesPasswort, true);
        
        return repo.save(neuerKunde);
    }
    // Überladene Methode zur Registrierung mit KundenAnfrage
    public Kunde registrieren(KundenAnfrage request) {
    return registrieren(
        request.getVorname(),
        request.getNachname(),
        request.getEmail(),
        request.getStrasse(),
        request.getHausnummer(),
        request.getPlz(),
        request.getOrt(),
        request.getTelefonnummer(),
        request.getPasswort()
    );
    }

    // Alle Kunden abrufen
    public List<Kunde> findeAlleKunden() {
    return repo.findAll();
    }

    // Prüfen, ob ein Kunde mit der gegebenen E-Mail existiert
    public boolean existsByEmail(String email) {
    return repo.existsByEmail(email);
    }

    

  
      
}
