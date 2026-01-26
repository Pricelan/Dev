package de.priceland_digital.shop_backend.testklassen;

import de.priceland_digital.shop_backend.entity.Kunde;
import de.priceland_digital.shop_backend.exceptions.CustomerAlreadyExistsException;
import de.priceland_digital.shop_backend.persistence.KundenRepository;
import de.priceland_digital.shop_backend.service.KundenVerwaltung;
import de.priceland_digital.shop_backend.service.dto.anfrage.KundenAnfrage;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class KundenVerwaltungTest {

    @Mock
    private KundenRepository kundenRepo;

    @InjectMocks
    private KundenVerwaltung kundenVerwaltung;

    @BeforeEach
    void setUp() {
        // Initialisiert die Mocks vor jedem Test
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void registrieren_erfolgreich_wennEmailNeu() throws CustomerAlreadyExistsException {
        // Arrange
        KundenAnfrage anfrage = new KundenAnfrage();
        anfrage.setVorname("Max");
        anfrage.setEmail("max@test.de");
        anfrage.setPasswort("geheim123");

        // Wenn nach der Email gesucht wird, soll "nichts gefunden" (Optional.empty) zurückkommen
        when(kundenRepo.findByEmail("max@test.de")).thenReturn(Optional.empty());
        // Beim Speichern geben wir das Objekt einfach wieder zurück
        when(kundenRepo.save(any(Kunde.class))).thenAnswer(i -> i.getArguments()[0]);

        // Act
        Kunde ergebnis = kundenVerwaltung.registrieren(anfrage);

        // Assert
        assertNotNull(ergebnis);
        assertEquals("Max", ergebnis.getVorname());
        // Prüfen, ob das Passwort nicht mehr im Klartext vorliegt
        assertNotEquals("geheim123", ergebnis.getPasswort());
        verify(kundenRepo, times(1)).save(any(Kunde.class));
    }

    @Test
    void registrieren_wirftException_wennEmailBereitsExistiert() {
        // Arrange
        KundenAnfrage anfrage = new KundenAnfrage();
        anfrage.setEmail("existiert@test.de");

        // Simuliere: Kunde existiert bereits
        when(kundenRepo.findByEmail("existiert@test.de")).thenReturn(Optional.of(new Kunde()));

        // Act & Assert
        assertThrows(CustomerAlreadyExistsException.class, () -> {
            kundenVerwaltung.registrieren(anfrage);
        });

        // Sicherstellen, dass save() nie aufgerufen wurde
        verify(kundenRepo, never()).save(any(Kunde.class));
    }

    @Test
    void findeKundeById_gibtKundeZurueck() {
        // Arrange
        Kunde testKunde = new Kunde();
        testKunde.setVorname("Erika");
        when(kundenRepo.findById(1L)).thenReturn(Optional.of(testKunde));

        // Act
        Kunde gefunden = kundenVerwaltung.findeKundeById(1L);

        // Assert
        assertNotNull(gefunden);
        assertEquals("Erika", gefunden.getVorname());
    }
}
