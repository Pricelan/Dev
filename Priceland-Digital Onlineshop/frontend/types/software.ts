
export type Software = {
  id: number;
  name: string;
  version: string;
  preis: number;
  softwareBeschreibung?: string;
  downloadLink?: string;
   kategorieListe?: "SOFTWARE" | "GAMES" | "FREEWARE"; 
  hersteller?: {
    id: number;
    name: string;
  };
};