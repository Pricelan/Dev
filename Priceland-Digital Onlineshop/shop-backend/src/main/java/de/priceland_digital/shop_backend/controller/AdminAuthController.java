package de.priceland_digital.shop_backend.controller;

import de.priceland_digital.shop_backend.service.dto.anfrage.LoginAdminAnfrage;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;

// Controller für Admin-Authentifizierung im Onlineshop
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RestController
@RequestMapping("/api/admin/auth")
public class AdminAuthController {

    // Check Admin-Status
    @GetMapping("/check-admin")
    public ResponseEntity<Boolean> checkAdmin(HttpSession session) {
        Object adminId = session.getAttribute("ADMIN_ID");
        return ResponseEntity.ok(adminId != null);
    }


    // Login
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginAdminAnfrage request, HttpServletRequest httpRequest) {
    
        if ("admin".equals(request.getUsername()) && "admin".equals(request.getPasswort())) {
        
        // 1. Alte Session holen und löschen (sofern vorhanden)
        HttpSession oldSession = httpRequest.getSession(false);
        if (oldSession != null) {
            oldSession.invalidate();
        }

        // 2. Neue Session erstellen
        HttpSession newSession = httpRequest.getSession(true);
        newSession.setAttribute("ADMIN_ID", 999L);
        
        return ResponseEntity.ok(Map.of(
            "role", "admin", 
            "username", "admin"
        ));
    }
    
    return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                         .body(Map.of("error", "Falsche Admin-Daten"));
}
    // Logout
    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpSession session) {
        if (session != null) {
            session.invalidate();
        }
        return ResponseEntity.ok().body(Map.of("message", "Session vernichtet"));
    }

    // Admin-Details abrufen
    @GetMapping("/me")
    public ResponseEntity<?> me(HttpSession session) {
        if (session.getAttribute("ADMIN_ID") == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        return ResponseEntity.ok(Map.of("username", "admin", "role", "admin"));
    }
}