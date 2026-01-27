package de.priceland_digital.shop_backend.controller;

import de.priceland_digital.shop_backend.service.dto.antwort.DownloadAntwort;
import de.priceland_digital.shop_backend.component.mapper.DownloadMapper;
import lombok.RequiredArgsConstructor;
import de.priceland_digital.shop_backend.persistence.DownloadRepository;
import java.util.List;
import org.springframework.web.bind.annotation.*;


// Controller für Kunden-Operationen im Onlineshop
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/kunden")
public class KundenController {
    
    
    private final DownloadRepository downloadRepository;
    private final DownloadMapper downloadMapper;
    
    
    // Lizenzen (Downloads) des Kunden abrufen
    @GetMapping("/{kundeId}/lizenzen")
    public List<DownloadAntwort> meineLizenzen(@PathVariable Long kundeId) {
     return downloadRepository.findByKundeId(kundeId)
        .stream()
        .map(downloadMapper::toAntwort)
        .toList();
}

}