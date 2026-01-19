package de.priceland_digital.shop_backend.testklassen;

import de.priceland_digital.shop_backend.entity.Kunde;
import de.priceland_digital.shop_backend.service.KundenVerwaltung;
import de.priceland_digital.shop_backend.service.dto.anfrage.KundenAnfrage;
import tools.jackson.databind.ObjectMapper;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;
import de.priceland_digital.shop_backend.controller.KundenController;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(KundenController.class)
class KundenControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockitoBean
    private KundenVerwaltung kundenVerwaltung;

    @Test
    void erstelleKunde_validRequest_returns201() throws Exception {
        KundenAnfrage request = new KundenAnfrage();
        request.setVorname("Max");
        request.setNachname("Mustermann");
        request.setEmail("max@test.de");

        Kunde gespeicherterKunde = new Kunde();
        gespeicherterKunde.setVorname("Max");
        gespeicherterKunde.setNachname("Mustermann");

        when(kundenVerwaltung.registrieren(any(KundenAnfrage.class)))
                .thenReturn(gespeicherterKunde);

        mockMvc.perform(post("/api/kunden")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isCreated());
    }

    @Test
    void erstelleKunde_leererName_returns400() throws Exception {
        KundenAnfrage request = new KundenAnfrage();
        request.setVorname("");
        request.setNachname("");
        request.setEmail("max@test.de");

        mockMvc.perform(post("/api/kunden")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest());
    }
}