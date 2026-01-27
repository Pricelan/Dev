package de.priceland_digital.shop_backend.component.mapper;

import de.priceland_digital.shop_backend.persistence.AdministratorRepository;
import de.priceland_digital.shop_backend.entity.Administrator;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;

// Initialisiert einen Standard-Administrator bei Anwendungstart
@Component
@RequiredArgsConstructor
public class AdminInitializer {

    private final AdministratorRepository repo;
    private final PasswordEncoder encoder;
    
    // Initialisierungsmethode, die einen Admin-Benutzer anlegt, falls keiner existiert
   @PostConstruct
    public void init() {
    if (repo.findByUsername("admin").isEmpty()) {
        Administrator a = new Administrator();
        a.setUsername("admin");
        a.setPasswort(encoder.encode("admin"));   // HASH
        repo.save(a);
        System.out.println("ADMIN ANGELEGT: admin / admin");
    }
}
}

