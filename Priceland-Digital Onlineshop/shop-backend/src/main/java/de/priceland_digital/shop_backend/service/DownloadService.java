package de.priceland_digital.shop_backend.service;

import de.priceland_digital.shop_backend.persistence.KundenRepository;
import de.priceland_digital.shop_backend.entity.Bestellung;
import de.priceland_digital.shop_backend.entity.Download;
import de.priceland_digital.shop_backend.entity.Kunde;
import de.priceland_digital.shop_backend.entity.Software;
import de.priceland_digital.shop_backend.exceptions.CustomerNotFoundException;
import de.priceland_digital.shop_backend.exceptions.SoftwareNotFoundException;
import de.priceland_digital.shop_backend.persistence.BestellRepository;
import de.priceland_digital.shop_backend.persistence.DownloadRepository;
import de.priceland_digital.shop_backend.persistence.SoftwareRepository;
import de.priceland_digital.shop_backend.service.dto.antwort.DownloadAntwort;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import de.priceland_digital.shop_backend.exceptions.ForbiddenDownloadException;
import java.util.List;


import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Transactional
public class DownloadService {
    
    private final DownloadRepository downloadRepository;
    private final KundenRepository kundenRepository;
    private final SoftwareRepository softwareRepository;    
    private final BestellRepository bestellRepository;

    // Hilfsmethode zur Auflösung der IP-Adresse aus dem HttpServletRequest
    private String resolveIp(HttpServletRequest request) {
    String forwarded = request.getHeader("X-Forwarded-For");
    if (forwarded != null && !forwarded.isBlank()) {
        return forwarded.split(",")[0].trim(); // erste echte IP
    }
    return request.getRemoteAddr();
    }

    // Download erstellen
    public DownloadAntwort download(Long softwareId, Long kundenId, HttpServletRequest request) {

        // Überprüfen, ob der Kunde existiert
        var kunde = kundenRepository.findById(kundenId)
            .orElseThrow(() -> new CustomerNotFoundException("Kunde nicht gefunden"));

        // Überprüfen, ob die Software existiert
        var software = softwareRepository.findById(softwareId)
            .orElseThrow(() -> new SoftwareNotFoundException("Software nicht gefunden"));
        if(!bestellRepository.existsByKundeAndPositionen_Software(kunde, software)){
        throw new ForbiddenDownloadException("Kunde hat die Software nicht gekauft");
        }

        Download download = new Download();
        download.setSoftware(software);
        download.setZeitpunkt(java.time.LocalDateTime.now());
        download.setIpAdresse(resolveIp(request));
        download.setKunde(kunde);
        download.setLizenzKey("GENERATED_LICENSE_KEY"); // Beispiel für das Setzen eines Lizenzschlüssels
        Download gespeichert = downloadRepository.save(download);
        return new DownloadAntwort(
        gespeichert.getSoftware().getId(),
        gespeichert.getSoftware().getName(),
        gespeichert.getSoftware().getVersion(),
        gespeichert.getLizenzKey(),
        gespeichert.getSoftware().getDownloadLink(),
        gespeichert.getZeitpunkt().toLocalDate(),
        gespeichert.getIpAdresse()
    );

}

    // Lizenzen für einen Kunden finden
    public List<DownloadAntwort> findLizenzenFuerKunde(Long kundeId) {
    List<Bestellung> bestellungen =
        bestellRepository.findByKundeId(kundeId);
    // Alle bestellten Software-Elemente extrahieren und in DownloadAntwort umwandeln
    return bestellungen.stream()
        .flatMap(b -> b.getPositionen().stream())
        .map(p -> {
            Software s = p.getSoftware();
            return new DownloadAntwort(
                s.getId(),
                s.getName(),
                s.getVersion(),
                s.getPreis().toString(),
                s.getDownloadLink(),
                null,
                null
            );
        })
        .toList();
}
    // Alle Downloads eines Kunden abrufen
    public List<DownloadAntwort> findeDownloadsVonKunde(Long kundenId) {
        kundenRepository.findById(kundenId)
            .orElseThrow(() -> new CustomerNotFoundException("Kunde nicht gefunden"));

    return downloadRepository.findByKundeId(kundenId)
            .stream()
            .map(download -> new DownloadAntwort(
                    download.getSoftware().getId(),
                    download.getSoftware().getName(),
                    download.getSoftware().getVersion(),
                    download.getLizenzKey(),
                    download.getSoftware().getDownloadLink(),
                    download.getZeitpunkt().toLocalDate(),
                    download.getIpAdresse()
            ))
            .toList();
}

    // Lizenz für eine Software und einen Kunden erstellen
public static void createLizenz(Kunde kunde, Software software) {
    // Logik zum Erstellen einer Lizenz für die gegebene Software und den Kunden
    // Dies könnte das Generieren eines Lizenzschlüssels, das Speichern in der Datenbank usw. umfassen
    System.out.println("Lizenz für Software " + software.getName() + " für Kunde " + kunde.getVorname() + " " + kunde.getNachname() + " erstellt.");


}
}