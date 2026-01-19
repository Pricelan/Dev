package de.priceland_digital.shop_backend.persistence;
import org.springframework.data.jpa.repository.JpaRepository;
import de.priceland_digital.shop_backend.entity.WarenkorbItem;

public interface WarenkorbItemRepository extends JpaRepository<WarenkorbItem, Long> {
    
}
