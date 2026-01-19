export type WarenkorbItem = {
  itemId: number;
  menge: number;
  software: {
    id: number;
    name: string;
    preis: number;
  };
};


export type Warenkorb = {
  warenkorbId: number;
  positionen: WarenkorbItem[];
  gesamtmenge: number;
  gesamtpreis: number;
};