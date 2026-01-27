package de.priceland_digital.shop_backend.controller;

import org.springframework.web.bind.annotation.RestController;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import lombok.RequiredArgsConstructor;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.constraints.NotNull;
import de.priceland_digital.shop_backend.service.DownloadService;
import de.priceland_digital.shop_backend.service.dto.antwort.DownloadAntwort;
import org.springframework.web.bind.annotation.CrossOrigin;

// Controller für Download-Operationen im Onlineshop
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/downloads")
public class DownloadController {
    
private final DownloadService downloadService;

    // Alle Downloads eines Kunden abrufen
    @GetMapping
    public List<DownloadAntwort> downloadsVonKunde(@RequestParam Long kundenId) {
    return downloadService.findeDownloadsVonKunde(kundenId);
}

    // Download einer Software für einen Kunden
    @PostMapping("/{softwareId}")
    @ResponseStatus(HttpStatus.CREATED)
    public DownloadAntwort download(
        @PathVariable @NotNull Long softwareId,
        @RequestParam @NotNull Long kundenId,
        HttpServletRequest request
) {
    return downloadService.download(softwareId, kundenId, request);
}

    // Eigene Downloads abrufen
    @GetMapping("/meine-Downloads")
    public List<DownloadAntwort> meineDownloads(HttpSession session) {
        Long kundeId = (Long) session.getAttribute("kundeId");
        if (kundeId == null) throw new RuntimeException("Nicht eingeloggt");

    return downloadService.findeDownloadsVonKunde(kundeId);
}

}