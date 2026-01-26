package de.priceland_digital.shop_backend.controller;

import de.priceland_digital.shop_backend.service.dto.anfrage.KundenAnfrage;
import de.priceland_digital.shop_backend.service.dto.antwort.DownloadAntwort;
import de.priceland_digital.shop_backend.component.mapper.DownloadMapper;
import de.priceland_digital.shop_backend.component.mapper.KundenMapper;
import jakarta.validation.Valid;



import de.priceland_digital.shop_backend.entity.Kunde;
import de.priceland_digital.shop_backend.persistence.DownloadRepository;

import org.springframework.security.crypto.password.PasswordEncoder;
import de.priceland_digital.shop_backend.service.dto.antwort.KundenAntwort;
import de.priceland_digital.shop_backend.persistence.KundenRepository;

import java.util.List;




import org.springframework.web.bind.annotation.*;


@CrossOrigin(
    origins = "http://localhost:3000",
    allowCredentials = "true"
)
@RestController
@RequestMapping("/api/kunden")

public class KundenController {
    
    
    private final DownloadRepository downloadRepository;
    private final KundenRepository kundenRepository;
    private final PasswordEncoder passwordEncoder;
    private final KundenMapper kundenMapper;
    private final DownloadMapper downloadMapper;
    
   

    public KundenController(DownloadRepository downloadRepository, KundenRepository kundenRepository, PasswordEncoder passwordEncoder , KundenMapper kundenMapper, DownloadMapper downloadMapper) {
        
        this.downloadRepository = downloadRepository;
        this.kundenRepository = kundenRepository;
        this.passwordEncoder = passwordEncoder;
        this.kundenMapper = kundenMapper;
        this.downloadMapper = downloadMapper;
    
    }

    @PostMapping("/register")
    public KundenAntwort register(@Valid @RequestBody KundenAnfrage dto) {
       Kunde kunde = new Kunde();
       kunde.setEmail(dto.getEmail());
       kunde.setPasswort(passwordEncoder.encode(dto.getPasswort()));

        return kundenMapper.toAntwort(kundenRepository.save(kunde));
    }

    @GetMapping("/{kundeId}/lizenzen")
    public List<DownloadAntwort> meineLizenzen(@PathVariable Long kundeId) {
     return downloadRepository.findByKundeId(kundeId)
        .stream()
        .map(downloadMapper::toAntwort)
        .toList();
}

}