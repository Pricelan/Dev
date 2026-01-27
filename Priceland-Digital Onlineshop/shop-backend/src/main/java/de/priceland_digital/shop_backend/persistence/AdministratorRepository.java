package de.priceland_digital.shop_backend.persistence;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import de.priceland_digital.shop_backend.entity.Administrator;

// Repository-Interface für Administrator-Entitäten
public interface AdministratorRepository extends JpaRepository<Administrator, Long> {

    // Überprüfen, ob ein Administrator mit dem gegebenen Benutzernamen existiert
    boolean existsByUsername(String username);

    // Administrator anhand des Benutzernamens finden
    Optional<Administrator> findByUsername(String username);

}