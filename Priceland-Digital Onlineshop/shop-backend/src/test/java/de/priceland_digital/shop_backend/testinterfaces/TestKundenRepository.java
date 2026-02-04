package de.priceland_digital.shop_backend.testinterfaces;

import de.priceland_digital.shop_backend.entity.Kunde;
import java.util.Optional;

public interface TestKundenRepository {
    Optional<Kunde> findByEmail(String email);
    Optional<Kunde> findById(Long id);
    Kunde save(Kunde kunde);
}

