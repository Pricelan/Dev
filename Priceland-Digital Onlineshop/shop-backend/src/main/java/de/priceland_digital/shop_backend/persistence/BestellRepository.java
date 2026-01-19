package de.priceland_digital.shop_backend.persistence;

import org.springframework.data.jpa.repository.JpaRepository;

import de.priceland_digital.shop_backend.entity.Bestellung;
import de.priceland_digital.shop_backend.entity.Kunde;
import de.priceland_digital.shop_backend.entity.Software;

import java.util.List;



public interface BestellRepository extends JpaRepository<Bestellung, Long> {

  boolean existsByKundeAndPositionen_Software(Kunde kunde, Software software);
  List<Bestellung> findByKundeId(Long id);
 

    
    
}
