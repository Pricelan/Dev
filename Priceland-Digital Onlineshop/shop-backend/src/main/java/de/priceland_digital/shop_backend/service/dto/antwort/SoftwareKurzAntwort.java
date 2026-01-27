package de.priceland_digital.shop_backend.service.dto.antwort;

import java.math.BigDecimal;

// Antwort DTO für eine Software in Kurzform
public class SoftwareKurzAntwort {

    private Long id;
    private String name;
    private BigDecimal preis;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public BigDecimal getPreis() {
        return preis;
    }

    public void setPreis(BigDecimal preis) {
        this.preis = preis;
    }
    
}
