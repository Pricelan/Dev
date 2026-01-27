package de.priceland_digital.shop_backend.service;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;
import de.priceland_digital.shop_backend.persistence.WarenkorbRepository;
import de.priceland_digital.shop_backend.entity.Kunde;
import de.priceland_digital.shop_backend.entity.Software;
import de.priceland_digital.shop_backend.entity.Warenkorb;
import de.priceland_digital.shop_backend.persistence.WarenkorbItemRepository;    
import de.priceland_digital.shop_backend.entity.WarenkorbItem;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;


@Service
@RequiredArgsConstructor
@Transactional // Transaktionale Methoden
public class WarenkorbService {

    private final WarenkorbRepository warenkorbRepository;
    private final WarenkorbItemRepository warenkorbPositionRepository;
  
    // Alle Warenkörbe abrufen
    public List<Warenkorb> getAllWarenkoerbe() {
        return warenkorbRepository.findAll();
    }

    // Gast-basierten Warenkorb holen oder erstellen
    public Warenkorb getOrCreateForGast(String gastToken){
       List<Warenkorb> warenkoerbe = warenkorbRepository.findAll();
            for(Warenkorb w : warenkoerbe){
            if(w.getGastToken() != null && w.getGastToken().equals(gastToken)){
               return w;
           }
       }
       Warenkorb neuerWarenkorb = new Warenkorb();
       neuerWarenkorb.setGastToken(gastToken);
       return warenkorbRepository.save(neuerWarenkorb);
   }

   // Kunde-basierten Warenkorb holen oder erstellen
    public Warenkorb getOrCreateForKunde(Kunde kunde){
        List<Warenkorb> warenkoerbe = warenkorbRepository.findAll();
        for(Warenkorb w : warenkoerbe){
            if(w.getKunde() != null && w.getKunde().getId().equals(kunde.getId())){
            return w;
        }
    }
    Warenkorb neuerWarenkorb = new Warenkorb();
        neuerWarenkorb.setKunde(kunde);
    return warenkorbRepository.save(neuerWarenkorb);
}

    // Software zum Warenkorb hinzufügen
    public Warenkorb addSoftware(Warenkorb warenkorb, Software software, int menge) {

    if (warenkorb.getPositionen() == null) {
        warenkorb.setPositionen(new ArrayList<>());
    }

    // Prüfen, ob die Software bereits im Warenkorb ist
    for (WarenkorbItem pos : warenkorb.getPositionen()) {
        if (pos.getSoftware().getId().equals(software.getId())) {
            pos.setMenge(pos.getMenge() + menge);
            return warenkorbRepository.save(warenkorb);
        }
    }

    // Neue Position erstellen, wenn die Software noch nicht im Warenkorb ist
    WarenkorbItem neuePosition = new WarenkorbItem();
    neuePosition.setWarenkorb(warenkorb);
    neuePosition.setSoftware(software);
    neuePosition.setMenge(menge);

    warenkorb.getPositionen().add(neuePosition);
    return warenkorbRepository.save(warenkorb);
}

    // Position aus dem Warenkorb entfernen
    public void removePosition(
        Warenkorb warenkorb,
        Long positionId
    ){
        WarenkorbItem zuEntfernendePosition = null;
            for(WarenkorbItem position : warenkorb.getPositionen()){
            if(position.getId().equals(positionId)){
            zuEntfernendePosition = position;
            break;
        }
        }
            if(zuEntfernendePosition != null){
        warenkorb.getPositionen().remove(zuEntfernendePosition);
        warenkorbPositionRepository.delete(zuEntfernendePosition);
    }
}
    // Warenkorb leeren
    public void clear(Warenkorb warenkorb){
            for(WarenkorbItem position : warenkorb.getPositionen()){
        warenkorbPositionRepository.delete(position);
    }
        warenkorb.getPositionen().clear();
}

    //Warenkorb zusammenführen (Gast → Kunde)
    public Warenkorb mergeGastIntoKunde(String gastToken, Kunde kunde) {

            Warenkorb gastWarenkorb =
            warenkorbRepository.findByGastToken(gastToken).orElse(null);

            Warenkorb kundenWarenkorb =
            warenkorbRepository.findByKunde(kunde)
                    .orElseGet(() -> {
                        Warenkorb w = new Warenkorb();
                        w.setKunde(kunde);
                        return warenkorbRepository.save(w);
                    });

            if (gastWarenkorb == null) {
            return kundenWarenkorb;
    }

            for (WarenkorbItem pos : gastWarenkorb.getPositionen()) {
                addSoftware(
                kundenWarenkorb,
                pos.getSoftware(),
                pos.getMenge()
        );
    }

    warenkorbRepository.delete(gastWarenkorb);
    return kundenWarenkorb;
}

    //Warenkorb übertragen (z.B. Gast → Kunde), ohne Löschen des Quell-Warenkorbs

    public void uebertrageWarenkorb(Warenkorb von, Warenkorb nach) {
        for (WarenkorbItem item : von.getPositionen()) {
        // Erstelle neue Items für den Ziel-Warenkorb
            WarenkorbItem newItem = new WarenkorbItem();
            newItem.setSoftware(item.getSoftware());
            newItem.setMenge(item.getMenge());
            newItem.setWarenkorb(nach);
            nach.getPositionen().add(newItem);
    }
    // Gast-Warenkorb danach leeren
        von.getPositionen().clear();
}



}