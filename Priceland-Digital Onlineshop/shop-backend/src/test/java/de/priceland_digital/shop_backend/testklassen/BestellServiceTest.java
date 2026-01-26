package de.priceland_digital.shop_backend.testklassen;


import de.priceland_digital.shop_backend.entity.*;
import de.priceland_digital.shop_backend.exceptions.CustomerNotFoundException;
import de.priceland_digital.shop_backend.persistence.*;
import de.priceland_digital.shop_backend.service.BestellService;
import de.priceland_digital.shop_backend.service.dto.anfrage.PositionsAnfrage;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

    class BestellServiceTest {

    private BestellRepository bestellRepo;
    private KundenRepository kundenRepo;
    private SoftwareRepository softwareRepo;
    private BestellService service;
    private GastRepository gastRepo;

    @BeforeEach
    void setup() {
        bestellRepo = mock(BestellRepository.class);
        kundenRepo = mock(KundenRepository.class);
        softwareRepo = mock(SoftwareRepository.class);
        WarenkorbRepository warenkorbRepo = mock(WarenkorbRepository.class);
        gastRepo = mock(GastRepository.class);
     

        service = new BestellService(bestellRepo, kundenRepo, softwareRepo, warenkorbRepo, gastRepo);
    }

    @Test
    void testErstelleBestellungWirftExceptionWennKundeNichtExistiert() {
        when(kundenRepo.findById(1L)).thenReturn(Optional.empty());

        assertThrows(CustomerNotFoundException.class, () ->
                service.erstelleBestellung(1L, List.of(new PositionsAnfrage(10L, 1)))
        );
    }

    @Test
    void testErstelleBestellungWirftExceptionWennSoftwareNichtExistiert() {
        Kunde kunde = new Kunde();
        when(kundenRepo.findById(1L)).thenReturn(Optional.of(kunde));
        when(softwareRepo.findById(10L)).thenReturn(Optional.empty());

        assertThrows(IllegalArgumentException.class, () ->
                service.erstelleBestellung(1L, List.of(new PositionsAnfrage(10L, 1)))
        );
    }

    @Test
    void testErstelleBestellungWirftExceptionBeiUngueltigerMenge() {
        Kunde kunde = new Kunde();
        Software software = mock(Software.class);

        when(kundenRepo.findById(1L)).thenReturn(Optional.of(kunde));
        when(softwareRepo.findById(10L)).thenReturn(Optional.of(software));

        assertThrows(IllegalArgumentException.class, () ->
                service.erstelleBestellung(1L, List.of(new PositionsAnfrage(10L, 0)))
        );
    }

    @Test
    void testErstelleBestellungSpeichertUndGibtBestellungZurueck() {
        Kunde kunde = new Kunde();
        Software software = mock(Software.class);
        when(software.getPreis()).thenReturn(new BigDecimal("10.00"));  // falls du einen Preis hast

        when(kundenRepo.findById(1L)).thenReturn(Optional.of(kunde));
        when(softwareRepo.findById(10L)).thenReturn(Optional.of(software));

        PositionsAnfrage req = new PositionsAnfrage(10L, 2);

        service.erstelleBestellung(1L, List.of(req));

        ArgumentCaptor<Bestellung> captor = ArgumentCaptor.forClass(Bestellung.class);
        verify(bestellRepo).save(captor.capture());

        Bestellung gespeicherte = captor.getValue();

        assertEquals(kunde, gespeicherte.getKunde());
        assertEquals(1, gespeicherte.getPositionen().size());
        assertEquals(software, gespeicherte.getPositionen().get(0).getSoftware());
        assertEquals(2, gespeicherte.getPositionen().get(0).getMenge());
    }

   @Test
   
    void testBerechnungDesGesamtpreises() {
        // 1. Arrange (Vorbereitung)
        Kunde kunde = new Kunde();
        Software software = mock(Software.class);
        when(software.getPreis()).thenReturn(new BigDecimal("12.50"));
    when(kundenRepo.findById(1L)).thenReturn(Optional.of(kunde));
    when(softwareRepo.findById(10L)).thenReturn(Optional.of(software));
    
    // WICHTIG: Das Repository muss die Bestellung zurückgeben, sonst bleibt sie null!
    when(bestellRepo.save(any(Bestellung.class))).thenAnswer(invocation -> invocation.getArgument(0));

    PositionsAnfrage req = new PositionsAnfrage(10L, 3); // 3 * 12.50 = 37.50

    // 2. Act (Ausführung)
    Bestellung bestellung = service.erstelleBestellung(1L, List.of(req));

    // 3. Assert (Prüfung)
    assertNotNull(bestellung, "Die Bestellung sollte nicht null sein!");
    assertEquals(new BigDecimal("37.50"), bestellung.berechneGesamtpreis());
}
}