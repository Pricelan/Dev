package de.priceland_digital.shop_backend.persistence;

import de.priceland_digital.shop_backend.entity.Gast;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

// Repository-Interface für Gast-Entitäten
public interface GastRepository extends JpaRepository<Gast, Long> {

    // Alle Gäste mit der angegebenen E-Mail-Adresse finden
    List<Gast> findAllByEmail(String email);
    
 }