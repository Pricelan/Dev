package de.priceland_digital.shop_backend.testklassen;

import de.priceland_digital.shop_backend.entity.Bestellposition;
import de.priceland_digital.shop_backend.entity.Software;
import org.junit.jupiter.api.Test;

import java.math.BigDecimal;

import static org.junit.jupiter.api.Assertions.*;

class BestellPositionTest {

    @Test
    void testKonstruktorMitGueltigenWerten() {
        Software software = new Software() {}; // Anonyme Klasse als Dummy-Objekt
        Bestellposition bp = new Bestellposition(software, 2, new BigDecimal("19.99"));

        assertEquals(2, bp.getMenge());
        assertEquals(new BigDecimal("19.99"), bp.getEinzelpreis());
        assertEquals(software, bp.getSoftware());
    }

    @Test
    void testKonstruktorWirftExceptionWennProduktNull() {
        assertThrows(IllegalArgumentException.class, () ->
                new Bestellposition(null, 1, new BigDecimal("9.99"))
        );
    }

    @Test
    void testKonstruktorWirftExceptionWennMengeKleinerEins() {
        Software software = new Software() {};
        assertThrows(IllegalArgumentException.class, () ->
                new Bestellposition(software, 0, new BigDecimal("9.99"))
        );
    }

    @Test
    void testKonstruktorWirftExceptionWennPreisNegativ() {
        Software software = new Software() {};
        assertThrows(IllegalArgumentException.class, () ->
                new Bestellposition(software, 1, new BigDecimal("-1.00"))
        );
    }

    @Test
    void testBerechneGesamtpreis() {
        Software software = new Software() {};
        Bestellposition bp = new Bestellposition(software, 3, new BigDecimal("10.00"));

        BigDecimal expected = new BigDecimal("30.00");
        assertEquals(expected, bp.berechneGesamtpreis());
    }

    @Test
    void testBerechneGesamtpreisMitDezimalwerten() {
        Software software = new Software() {};
        Bestellposition bp = new Bestellposition(software, 3, new BigDecimal("19.99"));

        BigDecimal expected = new BigDecimal("59.97"); // 19.99 * 3
        assertEquals(expected, bp.berechneGesamtpreis());
    }
}