package de.priceland_digital.shop_backend.service;

import de.priceland_digital.shop_backend.entity.SoftwareHersteller;
import de.priceland_digital.shop_backend.persistence.SoftwareHerstellerRepository;
import de.priceland_digital.shop_backend.service.dto.anfrage.SoftwareHerstellerAnfrage;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;


import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class SoftwareHerstellerService {

    private final SoftwareHerstellerRepository repository;
   
    // Neuer Hersteller anlegen
    public SoftwareHersteller create(SoftwareHerstellerAnfrage request) {
        SoftwareHersteller h = new SoftwareHersteller(
            request.getName(),
            request.getAdresse(),
            request.getEmail(),
            request.getWebseite()
        );

        return repository.save(h);
    }

    // Hersteller anhand der ID finden
    public SoftwareHersteller find(Long id) {
        return repository.findById(id)
            .orElseThrow(() -> new RuntimeException("Hersteller nicht gefunden"));
    }
    // Alle Hersteller abrufen
    public List<SoftwareHersteller> findAll() {
        return repository.findAll();
    }
}