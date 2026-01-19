package de.priceland_digital.shop_backend.persistence;

import de.priceland_digital.shop_backend.entity.SoftwareHersteller;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HerstellerRepository
        extends JpaRepository<SoftwareHersteller, Long> {
}