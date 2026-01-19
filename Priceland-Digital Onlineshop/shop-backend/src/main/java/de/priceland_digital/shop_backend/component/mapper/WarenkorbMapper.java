package de.priceland_digital.shop_backend.component.mapper;

import de.priceland_digital.shop_backend.entity.Warenkorb;
import de.priceland_digital.shop_backend.entity.WarenkorbItem;
import de.priceland_digital.shop_backend.service.dto.antwort.*;

import java.util.List;

public class WarenkorbMapper {

    public static WarenkorbAntwort toAntwort(Warenkorb warenkorb) {
        List<WarenkorbItemAntwort> positionen =
                warenkorb.getPositionen().stream()
                        .map(WarenkorbMapper::toItemAntwort)
                        .toList();

        int gesamtMenge = positionen.stream()
                .mapToInt(WarenkorbItemAntwort::menge)
                .sum();

        var gesamtPreis = positionen.stream()
                .map(p -> p.software().preis().multiply(
                        java.math.BigDecimal.valueOf(p.menge())))
                .reduce(java.math.BigDecimal.ZERO, java.math.BigDecimal::add);

        return new WarenkorbAntwort(
                warenkorb.getId(),
                positionen,
                gesamtMenge,
                gesamtPreis
        );
    }

    private static WarenkorbItemAntwort toItemAntwort(WarenkorbItem item) {
        return new WarenkorbItemAntwort(
                item.getId(),
                SoftwareMapper.toAntwort(item.getSoftware()),
                item.getMenge()
        );
    }
}