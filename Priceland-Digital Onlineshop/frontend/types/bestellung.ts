export type Bestellung = {
    id: number;
    käuferName: string; // Entspricht deiner Variable im BestellMapper
    gesamtpreis: number;
    status: string;
    erstelltAm: string; // Entspricht bestellung.getErstelltAm()
    zahlung?: {
        betrag: number;
        status: string;
        zahlungsMethode: string;
        zeitpunkt: string;
    };
    positionen: {
        // Hier ggf. BestellPositionMapper Struktur nutzen
        software: {
            name: string;
            preis: number;
        };
        menge: number;
        einzelpreis: number;
    }[];
};