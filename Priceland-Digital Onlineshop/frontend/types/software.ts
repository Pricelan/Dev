// Definition des Software-Typs im Onlineshop
export interface Software {
  id: number;
  name: string;
  version: string;
  preis: number;
  softwareBeschreibung?: string;
  downloadLink?: string;
  // Kategorisierung der Software
   kategorie:  "LIZENZIERTE_SOFTWARE" | "KOSTENLOSE_SOFTWARE" | "COMPUTER_SPIELE";
  hersteller?: {
    id: number;
    name: string;
  };
};