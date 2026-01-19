package de.priceland_digital.shop_backend.testklassen;

import de.priceland_digital.shop_backend.entity.Bestellposition;
import de.priceland_digital.shop_backend.entity.Bestellung;
import de.priceland_digital.shop_backend.entity.Kunde;
import de.priceland_digital.shop_backend.entity.Software;
import de.priceland_digital.shop_backend.entity.Gast;

import org.junit.jupiter.api.Test;

import java.math.BigDecimal;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

class BestellungTest {

    @Test
    void testKonstruktorMitGueltigenWerten() {
        Kunde kunde = new Kunde();  // genügt als Dummy
        Gast gast = new Gast();
        Software sw = new Software() {
            
        };

        Bestellposition p1 = new Bestellposition(sw, 2, new BigDecimal("10.00"));
        Bestellposition p2 = new Bestellposition(sw, 1, new BigDecimal("5.00"));

        Bestellung bestellung = new Bestellung(kunde, gast, List.of(p1, p2));

        assertEquals(kunde, bestellung.getKunde());
        assertEquals(2, bestellung.getPositionen().size());
        assertNotNull(bestellung.getErstelltAm());
    }

    @Test
    void testKonstruktorWirftExceptionWennKundeNull() {
        Software sw = new Software() {
            
        };
        Bestellposition p = new Bestellposition(sw, 1, new BigDecimal("10.00"));
        Gast gast = new Gast();

        assertThrows(IllegalArgumentException.class, () ->
                new Bestellung(null, gast, List.of(p))
        );
    }

    @Test
    void testKonstruktorWirftExceptionWennPositionenNull() {
        Kunde kunde = new Kunde();
        Gast gast = new Gast();

        assertThrows(IllegalArgumentException.class, () ->
                new Bestellung(kunde, gast, null)
        );
    }

    @Test
    void testKonstruktorWirftExceptionWennPositionenLeer() {
        Kunde kunde = new Kunde();
        Gast gast = new Gast();

        assertThrows(IllegalArgumentException.class, () ->
                new Bestellung(kunde, gast, List.of())
        );
    }

    @Test
    void testBidirektionaleBeziehungWirdGesetzt() {
        Kunde kunde = new Kunde();
        Gast gast = new Gast();
        Software sw = new Software() {
        };
        Bestellposition p = new Bestellposition(sw, 1, new BigDecimal("20.00"));

        Bestellung bestellung = new Bestellung(kunde, gast, List.of(p));

        assertEquals(bestellung, p.getBestellung());
    }

    @Test
    void testBerechneGesamtpreis() {
        Kunde kunde = new Kunde();
        Gast gast = new Gast();
        Software sw = new Software() {
        };

        Bestellposition p1 = new Bestellposition(sw, 2, new BigDecimal("10.00")); // 20.00
        Bestellposition p2 = new Bestellposition(sw, 3, new BigDecimal("5.00"));  // 15.00

        Bestellung bestellung = new Bestellung(kunde, gast, List.of(p1, p2));

        BigDecimal expected = new BigDecimal("35.00");
        assertEquals(expected, bestellung.berechneGesamtpreis());
    }
}