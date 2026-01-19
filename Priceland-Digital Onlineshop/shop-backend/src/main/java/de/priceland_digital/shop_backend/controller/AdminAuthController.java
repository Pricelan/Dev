package de.priceland_digital.shop_backend.controller;

import de.priceland_digital.shop_backend.service.dto.anfrage.LoginAdminAnfrage;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;

import java.util.Map;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/api/admin/auth")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class AdminAuthController {

    // 1. Check-Admin (Damit der Admin im Dashboard bleibt)
    // Erreichbar unter: GET http://localhost:8080/api/admin/auth/check-admin
    @GetMapping("/check-admin")
    public ResponseEntity<Boolean> checkAdmin(HttpSession session) {
        Object adminId = session.getAttribute("ADMIN_ID");
        return ResponseEntity.ok(adminId != null);
    }

    // 2. Login (Prüft hart auf admin/admin)
    // Erreichbar unter: POST http://localhost:8080/api/admin/auth/login
    @PostMapping("/login")
public ResponseEntity<?> login(@RequestBody LoginAdminAnfrage request, HttpServletRequest httpRequest) {
    
    if ("admin".equals(request.getUsername()) && "admin".equals(request.getPasswort())) {
        
        // 1. Alte Session holen und löschen (falls vorhanden)
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
    // 3. Logout
    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpSession session) {
        if (session != null) {
            session.invalidate();
        }
        return ResponseEntity.ok().body(Map.of("message", "Session vernichtet"));
    }

    // 4. Me (Info über den Admin)
    @GetMapping("/me")
    public ResponseEntity<?> me(HttpSession session) {
        if (session.getAttribute("ADMIN_ID") == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        return ResponseEntity.ok(Map.of("username", "admin", "role", "admin"));
    }
}