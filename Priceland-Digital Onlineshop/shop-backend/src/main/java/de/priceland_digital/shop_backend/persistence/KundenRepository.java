package de.priceland_digital.shop_backend.persistence;
import org.springframework.data.jpa.repository.JpaRepository;
import de.priceland_digital.shop_backend.entity.Kunde;
import java.util.Optional;

public interface KundenRepository extends JpaRepository<Kunde, Long> {
    Optional<Kunde> findByEmail(String email);

    boolean existsByEmail(String email);
    
}
