package de.priceland_digital.shop_backend.service;
import de.priceland_digital.shop_backend.entity.Administrator;
import de.priceland_digital.shop_backend.persistence.AdministratorRepository;
import lombok.RequiredArgsConstructor;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

public class AdminUserDetailService {
    
    @Service
    @RequiredArgsConstructor
    @Transactional
    public class AdminUserDetailsService implements UserDetailsService {

    private final AdministratorRepository repo;

  

    @Override
    public UserDetails loadUserByUsername(String username) {
        Administrator admin = repo.findByUsername(username)
            .orElseThrow(() -> new UsernameNotFoundException("Admin nicht gefunden"));

        return org.springframework.security.core.userdetails.User.builder()
            .username(admin.getUsername())
            .password(admin.getPasswort())
            .roles("ADMIN")
            .build();
    }
}
}
