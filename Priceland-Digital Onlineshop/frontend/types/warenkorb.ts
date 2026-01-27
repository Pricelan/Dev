// Definition der Typen für den Warenkorb im Onlineshop
export type WarenkorbItem = {
  itemId: number;
  menge: number;
  software: {
    id: number;
    name: string;
    preis: number;
  };
};

// Gesamtstruktur des Warenkorbs
export type Warenkorb = {
  warenkorbId: number;
  positionen: WarenkorbItem[];
  gesamtmenge: number;
  gesamtpreis: number;
};