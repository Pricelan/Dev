export type CheckoutBody = {
    kundeId: number | null;
    gastToken: string;
    vorname?: string;
    nachname?: string;
    email?: string;
    strasse?: string;
    hausnummer?: string;
    plz?: string;
    ort?: string;
    telefonnummer?: string;
    zahlungsMethode: string;
  };
