package de.priceland_digital.shop_backend.persistence;

import de.priceland_digital.shop_backend.entity.Gast;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface GastRepository extends JpaRepository<Gast, Long> {
    List<Gast> findAllByEmail(String email);
    
 }