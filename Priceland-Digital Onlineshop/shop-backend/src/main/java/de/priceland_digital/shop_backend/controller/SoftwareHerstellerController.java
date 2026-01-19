package de.priceland_digital.shop_backend.controller;
import de.priceland_digital.shop_backend.entity.SoftwareHersteller;
import de.priceland_digital.shop_backend.service.SoftwareHerstellerService;
import de.priceland_digital.shop_backend.service.dto.anfrage.SoftwareHerstellerAnfrage;
import jakarta.validation.Valid;


import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;


@RestController
@RequestMapping("/api/hersteller")
@CrossOrigin(
    origins = "http://localhost:3000",
    allowCredentials = "true"
)
public class SoftwareHerstellerController {

    private final SoftwareHerstellerService service;
  
 

    public SoftwareHerstellerController(SoftwareHerstellerService service) {
        this.service = service;
    
    }

    @PostMapping
    public ResponseEntity<SoftwareHersteller> create(
            @RequestBody @Valid SoftwareHerstellerAnfrage request) {

        return ResponseEntity
                .status(201)
                .body(service.create(request));
    }
    @GetMapping("/all")
    public List<SoftwareHersteller> findAll() {
        return service.findAll();
    }

  
}