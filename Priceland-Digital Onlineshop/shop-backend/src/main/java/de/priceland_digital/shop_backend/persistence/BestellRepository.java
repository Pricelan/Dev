package de.priceland_digital.shop_backend.persistence;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import de.priceland_digital.shop_backend.entity.Bestellung;
import de.priceland_digital.shop_backend.entity.Kunde;
import de.priceland_digital.shop_backend.entity.Software;

import java.math.BigDecimal;
import java.util.List;


// Repository-Interface für Bestellung-Entitäten
public interface BestellRepository extends JpaRepository<Bestellung, Long> {

  // Überprüfen, ob eine Bestellung für einen bestimmten Kunden und eine bestimmte Software existiert
  boolean existsByKundeAndPositionen_Software(Kunde kunde, Software software);

  // Alle Bestellungen für einen bestimmten Kunden finden
  List<Bestellung> findByKundeId(Long id);

  // Gesamten Umsatz aus allen bezahlten Bestellungen summieren
  @Query("SELECT SUM(b.gesamtpreis) FROM Bestellung b WHERE b.zahlung IS NOT NULL")
  BigDecimal summiereGesamtenUmsatz();
   
    
}
