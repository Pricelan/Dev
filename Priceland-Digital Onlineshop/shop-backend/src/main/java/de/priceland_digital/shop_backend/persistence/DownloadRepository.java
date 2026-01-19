package de.priceland_digital.shop_backend.persistence;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import de.priceland_digital.shop_backend.entity.Download;

public interface DownloadRepository extends JpaRepository<Download, Long> {

    List<Download> findByKundeId(Long kundenId);
    
}
