"use client";

import { apiFetch } from "@/lib/api";
import { Warenkorb, WarenkorbItem } from "@/types/warenkorb";
import { createContext, useContext, useEffect, useState } from "react";

// Definition des Warenkorb-Kontexts
type WarenkorbContextType = {
  warenkorb: Warenkorb | null;
  items: WarenkorbItem[];
  gesamtMenge: number;
  gesamtPreis: number;
  refresh: () => Promise<void>;
};

// Erstellung des Warenkorb-Kontexts
const WarenkorbContext = createContext<WarenkorbContextType | null>(null);

// Funktion zum Abrufen oder Erstellen eines Gast-Tokens
function getOrCreateGastToken(): string {
  if (typeof window === "undefined") return "";
  
  let token = localStorage.getItem("gastToken");
  if (!token) {
    token = crypto.randomUUID();
    localStorage.setItem("gastToken", token);
  }
  return token;
}

// Warenkorb-Provider-Komponente
export function WarenkorbProvider({ children }: { children: React.ReactNode }) {
  const [warenkorb, setWarenkorb] = useState<Warenkorb | null>(null);
  // Funktion zum Aktualisieren des Warenkorbs
  const refresh = async () => {
    const gastToken = getOrCreateGastToken();
    // API-Aufruf zum Abrufen des Warenkorbs
    const res = await apiFetch(
      `/warenkorb?gastToken=${gastToken}`
    );

    if (!res.ok) {
      console.error("Warenkorb konnte nicht geladen werden", res.status);
      setWarenkorb(null);
      return;
    }

    setWarenkorb(res);
  };

  // useEffect Hook zum Laden des Warenkorbs beim Initialisieren
  useEffect(() => {
    (async () => {
      await refresh();
    })();
  }, []);

  // Berechnung der Gesamtmenge und des Gesamtpreises
  const items = warenkorb?.positionen ?? [];
  const gesamtMenge = items.reduce((sum, p) => sum + p.menge, 0);
  const gesamtPreis = items.reduce(
    (sum, p) => sum + p.menge * p.software.preis,
    0
  );


 
  // Rückgabe des Warenkorb-Kontexts mit den bereitgestellten Werten
  return (
    <WarenkorbContext.Provider
      value={{
        warenkorb,
        items,
        gesamtMenge,
        gesamtPreis,
        refresh,
      }}
    >
      {children}
    </WarenkorbContext.Provider>
  );
}


export function useWarenkorb() {
  const ctx = useContext(WarenkorbContext);
  if (!ctx) {
    throw new Error("useWarenkorb must be used inside WarenkorbProvider");
  }
  return ctx;
}