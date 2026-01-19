package de.priceland_digital.shop_backend.service;
import java.util.Optional;

import de.priceland_digital.shop_backend.exceptions.CustomerAlreadyExistsException;
import de.priceland_digital.shop_backend.entity.Kunde;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import de.priceland_digital.shop_backend.persistence.KundenRepository;
import de.priceland_digital.shop_backend.service.dto.anfrage.KundenAnfrage;
import java.util.List;


@Service

public class KundenVerwaltung {

    private final KundenRepository repo;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

        
    public KundenVerwaltung(KundenRepository repo) {
        this.repo = repo;
    }

   
    public Kunde findeKundeById (Long kundenId) {
       
        return repo.findById(kundenId).orElse(null);  
    }   
    public Kunde findeKundeByEmail (String email) {
        Optional<Kunde> kundeOpt = repo.findByEmail(email);

        return kundeOpt.orElse(null);
    }   
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
public List<Kunde> findeAlleKunden() {
    return repo.findAll();
}
public boolean existsByEmail(String email) {
    return repo.existsByEmail(email);
}

    

  
      
}
