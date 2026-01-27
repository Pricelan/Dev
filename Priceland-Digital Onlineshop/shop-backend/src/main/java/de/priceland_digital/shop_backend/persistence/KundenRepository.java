package de.priceland_digital.shop_backend.persistence;
import org.springframework.data.jpa.repository.JpaRepository;
import de.priceland_digital.shop_backend.entity.Kunde;
import java.util.Optional;

// Repository-Interface für Kunden-Entitäten
public interface KundenRepository extends JpaRepository<Kunde, Long> {

    // Kunde anhand der E-Mail-Adresse finden
    Optional<Kunde> findByEmail(String email);
    
    // Überprüfen, ob ein Kunde mit der gegebenen E-Mail-Adresse existiert
    boolean existsByEmail(String email);
    
}
