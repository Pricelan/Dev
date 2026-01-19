package de.priceland_digital.shop_backend.persistence;
import org.springframework.data.jpa.repository.JpaRepository;
import de.priceland_digital.shop_backend.entity.Warenkorb;
import de.priceland_digital.shop_backend.entity.Kunde;
import java.util.Optional;

public interface WarenkorbRepository
        extends JpaRepository<Warenkorb, Long> {

    Optional<Warenkorb> findByGastToken(String gastToken);

    Optional<Warenkorb> findByKunde(Kunde kunde);
}