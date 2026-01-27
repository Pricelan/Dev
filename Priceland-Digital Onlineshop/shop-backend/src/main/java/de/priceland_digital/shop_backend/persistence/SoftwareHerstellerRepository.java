package de.priceland_digital.shop_backend.persistence;

import org.springframework.data.jpa.repository.JpaRepository;
import de.priceland_digital.shop_backend.entity.SoftwareHersteller;

// Repository-Interface für SoftwareHersteller-Entitäten
public interface SoftwareHerstellerRepository extends JpaRepository<SoftwareHersteller, Long> {
    
}
