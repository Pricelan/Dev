package de.priceland_digital.shop_backend.component.mapper;

import de.priceland_digital.shop_backend.entity.WarenkorbItem;
import de.priceland_digital.shop_backend.service.dto.antwort.WarenkorbItemAntwort;

public class WarenkorbItemMapper {

    public static WarenkorbItemAntwort toAntwort(WarenkorbItem item) {
        return new WarenkorbItemAntwort(
                item.getId(),
                SoftwareMapper.toAntwort(item.getSoftware()),
                item.getMenge()
        );
    }
}