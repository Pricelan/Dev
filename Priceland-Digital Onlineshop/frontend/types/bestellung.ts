// Definition des Bestelltyps im Onlineshop
export type Bestellung = {
    id: number;
    // Name des Käufers (Kunde oder Gast)
    käuferName: string; 
    gesamtpreis: number;
    status: string;
    erstelltAm: string; 
    zahlung?: {
        betrag: number;
        status: string;
        zahlungsMethode: string;
        zeitpunkt: string;
    };
    // Detaillierte Positionen der Bestellung
    positionen: {
        software: {
            name: string;
            preis: number;
        };
        menge: number;
        einzelpreis: number;
    }[];
};