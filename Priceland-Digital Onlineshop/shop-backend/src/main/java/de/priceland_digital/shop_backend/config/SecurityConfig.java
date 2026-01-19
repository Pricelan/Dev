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

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            // 1. CORS aktivieren und CSRF für lokale Entwicklung deaktivieren
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))
            .csrf(csrf -> csrf.disable())
            
            // 2. Standard-Logins von Spring Security abschalten (du nutzt eigene Controller)
            .formLogin(form -> form.disable())
            .httpBasic(basic -> basic.disable())

            // 3. Session-Management konfigurieren
            .sessionManagement(session -> session
            .sessionCreationPolicy(SessionCreationPolicy.IF_REQUIRED) // Erstellt Session nur wenn nötig
            .sessionFixation().migrateSession() // SICHERER: Übernimmt Attribute in eine neue Session-ID
)

            // 4. Alle Requests erlauben (da du die Logik in den Controllern prüfst)
            .authorizeHttpRequests(auth -> auth
                .anyRequest().permitAll()
            )
            .logout(logout -> logout
            .logoutUrl("/api/auth/logout") // Der Pfad für dein Frontend
                .invalidateHttpSession(true)   // Vernichtet die Session im Server
                .deleteCookies("JSESSIONID")   // Löscht den Cookie im Browser
                .permitAll()
            );  
        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        
        // Erlaubt das Next.js Frontend
        configuration.setAllowedOrigins(List.of("http://localhost:3000"));
        
        // Erlaubt alle gängigen HTTP-Methoden
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        
        // Erlaubt wichtige Header (Cookie ist entscheidend für Sessions!)
        configuration.setAllowedHeaders(List.of("Content-Type", "Authorization", "Cookie", "Accept"));
        
        // WICHTIG: Erlaubt das Senden und Empfangen von Cookies (JSESSIONID)
        configuration.setAllowCredentials(true); 

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        // Wendet diese Regeln auf alle API-Endpunkte an
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}