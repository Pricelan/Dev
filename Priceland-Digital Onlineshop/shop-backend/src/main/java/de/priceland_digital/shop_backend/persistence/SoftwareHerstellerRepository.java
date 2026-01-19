package de.priceland_digital.shop_backend.persistence;

import org.springframework.data.jpa.repository.JpaRepository;
import de.priceland_digital.shop_backend.entity.SoftwareHersteller;

public interface SoftwareHerstellerRepository extends JpaRepository<SoftwareHersteller, Long> {
    
}
