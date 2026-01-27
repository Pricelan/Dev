package de.priceland_digital.shop_backend.persistence;
import org.springframework.data.jpa.repository.JpaRepository;
import de.priceland_digital.shop_backend.entity.Software;
import java.util.List;


// Repository-Interface für Software-Entitäten
public interface SoftwareRepository extends JpaRepository<Software, Long> {
    
   // Software anhand eines Teils des Namens finden (Groß-/Kleinschreibung ignorieren)
   List<Software> findByNameContainingIgnoreCase(String name);
   

}
