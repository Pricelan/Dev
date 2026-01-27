// Definition des Software-Typs im Onlineshop
export interface Software {
  id: number;
  name: string;
  version: string;
  preis: number;
  softwareBeschreibung?: string;
  downloadLink?: string;
  // Kategorisierung der Software
   kategorie: "SOFTWARE" | "GAMES" | "FREEWARE"; 
  hersteller?: {
    id: number;
    name: string;
  };
};