package de.priceland_digital.shop_backend.config;

import java.util.List;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

// Sicherheitskonfiguration für den Onlineshop
@Configuration
@EnableWebSecurity
public class SecurityConfig {

    // Sicherheitsfilterkette definieren
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            // 1. CORS aktivieren und CSRF für lokale Entwicklung deaktivieren
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))
            .csrf(csrf -> csrf.disable())
            
            // 2. Standard-Login-Formular und HTTP-Basic-Authentifizierung deaktivieren
            .formLogin(form -> form.disable())
            .httpBasic(basic -> basic.disable())

            // 3. Session-Management konfigurieren
            .sessionManagement(session -> session
            .sessionCreationPolicy(SessionCreationPolicy.IF_REQUIRED) // Sessions nur bei Bedarf erstellen
            .sessionFixation().migrateSession() // Session-Fixation verhindern
)

            // 4. Alle Requests erlauben 
            .authorizeHttpRequests(auth -> auth
                .anyRequest().permitAll()
            )
            .logout(logout -> logout
            .logoutUrl("/api/auth/logout") // Logout-URL definieren
                .invalidateHttpSession(true)   // Session ungültig machen
                .deleteCookies("JSESSIONID")   // JSESSIONID-Cookie löschen
                .permitAll()
            );  
        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        
        // Erlaubt Anfragen von der React-Entwicklungsumgebung
        configuration.setAllowedOrigins(List.of("http://localhost:3000"));
        
        // Erlaubt gängige HTTP-Methoden
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        
        // Erlaubt wichtige Header für Authentifizierung und Content-Type
        configuration.setAllowedHeaders(List.of("Content-Type", "Authorization", "Cookie", "Accept"));
        
        // WICHTIG: Erlaubt das Senden und Empfangen von Cookies (JSESSIONID)
        configuration.setAllowCredentials(true); 

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        // CORS-Konfiguration für alle Pfade anwenden
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    // Passwort-Encoder für sichere Passwortspeicherung
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}