package de.priceland_digital.shop_backend.controller;
import de.priceland_digital.shop_backend.entity.SoftwareHersteller;
import de.priceland_digital.shop_backend.service.SoftwareHerstellerService;
import de.priceland_digital.shop_backend.service.dto.anfrage.SoftwareHerstellerAnfrage;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;


import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

// Controller für SoftwareHersteller-Operationen im Onlineshop
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/hersteller")
public class SoftwareHerstellerController {

    private final SoftwareHerstellerService service;
  
    // Neuer Hersteller anlegen
    @PostMapping
    public ResponseEntity<SoftwareHersteller> create(
            @RequestBody @Valid SoftwareHerstellerAnfrage request) {

        return ResponseEntity
                .status(201)
                .body(service.create(request));
    }

    // Hersteller anhand der ID finden
    @GetMapping("/all")
    public List<SoftwareHersteller> findAll() {
        return service.findAll();
    }

  
}