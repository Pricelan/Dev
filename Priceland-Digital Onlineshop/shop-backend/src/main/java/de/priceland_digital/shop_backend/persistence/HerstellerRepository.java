package de.priceland_digital.shop_backend.persistence;

import de.priceland_digital.shop_backend.entity.SoftwareHersteller;
import org.springframework.data.jpa.repository.JpaRepository;

// Repository-Interface für Hersteller-Entitäten
public interface HerstellerRepository extends JpaRepository<SoftwareHersteller, Long> {
        
}