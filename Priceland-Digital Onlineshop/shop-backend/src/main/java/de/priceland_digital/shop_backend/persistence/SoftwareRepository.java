package de.priceland_digital.shop_backend.persistence;
import org.springframework.data.jpa.repository.JpaRepository;
import de.priceland_digital.shop_backend.entity.Software;
import java.util.List;



public interface SoftwareRepository extends JpaRepository<Software, Long> {
    
   List<Software> findByNameContainingIgnoreCase(String name);
   

}
