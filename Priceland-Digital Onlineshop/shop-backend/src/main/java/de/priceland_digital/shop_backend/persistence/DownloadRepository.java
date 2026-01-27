package de.priceland_digital.shop_backend.persistence;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import de.priceland_digital.shop_backend.entity.Download;

// Repository-Interface für Download-Entitäten
public interface DownloadRepository extends JpaRepository<Download, Long> {

    // Downloads anhand der Kunden-ID finden
    List<Download> findByKundeId(Long kundenId);
    
}
