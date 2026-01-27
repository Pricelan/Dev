package de.priceland_digital.shop_backend.persistence;
import org.springframework.data.jpa.repository.JpaRepository;
import de.priceland_digital.shop_backend.entity.Warenkorb;
import de.priceland_digital.shop_backend.entity.Kunde;
import java.util.Optional;

// Repository-Interface für Warenkorb-Entitäten
public interface WarenkorbRepository extends JpaRepository<Warenkorb, Long> {

    // Warenkorb anhand des Gast-Tokens finden
    Optional<Warenkorb> findByGastToken(String gastToken);

    // Warenkorb anhand des Kunden finden
    Optional<Warenkorb> findByKunde(Kunde kunde);

}