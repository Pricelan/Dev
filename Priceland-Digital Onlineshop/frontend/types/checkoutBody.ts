export type CheckoutBody = {
     kundenId: number | null;
    gastToken: string;
    vorname?: string;
    nachname?: string;
    email?: string;
    strasse?: string;
    hausnummer?: string;
    plz?: string;
    ort?: string;
    telefonnummer?: string;
  };
