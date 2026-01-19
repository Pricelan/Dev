package de.priceland_digital.shop_backend.persistence;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import de.priceland_digital.shop_backend.entity.Administrator;

public interface AdministratorRepository extends JpaRepository<Administrator, Long> {

    boolean existsByUsername(String username);

    Optional<Administrator> findByUsername(String username);

}