package de.priceland_digital.shop_backend.testklassen;

import de.priceland_digital.shop_backend.entity.Software;
import de.priceland_digital.shop_backend.service.AdminService;
import de.priceland_digital.shop_backend.service.dto.anfrage.ErstelleSoftwareAnfrage;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import java.math.BigDecimal;
import de.priceland_digital.shop_backend.controller.AdminController;
import tools.jackson.databind.ObjectMapper;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(AdminController.class)
class AdminControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockitoBean
    private AdminService adminService;

    @Test
    void erstelleSoftware_validRequest_returns201() throws Exception {
        // Arrange: Request DTO
        ErstelleSoftwareAnfrage request = new ErstelleSoftwareAnfrage();
        request.setName("Test Software");
        request.setSoftwareBeschreibung("Eine Testsoftware");
        request.setPreis(BigDecimal.valueOf(19.99));
        request.setVersion("1.0");
        request.setDownloadLink("https://example.com/download");
        

        // Arrange: Service-Rückgabe
        Software software = org.mockito.Mockito.mock(Software.class);
        when(software.getName()).thenReturn("Test Software");

        when(adminService.erstelleSoftware(any()))
                .thenReturn(software);

        // Act & Assert
        mockMvc.perform(post("/api/admin/software")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isCreated());
    }
}