"use client";

import { apiFetch } from "@/lib/api";
import { Warenkorb, WarenkorbItem } from "@/types/warenkorb";
import { createContext, useContext, useEffect, useState } from "react";

type WarenkorbContextType = {
  warenkorb: Warenkorb | null;
  items: WarenkorbItem[];
  gesamtMenge: number;
  gesamtPreis: number;
  refresh: () => Promise<void>;
};

const WarenkorbContext = createContext<WarenkorbContextType | null>(null);

function getOrCreateGastToken(): string {
  if (typeof window === "undefined") return "";
  let token = localStorage.getItem("gastToken");
  if (!token) {
    token = crypto.randomUUID();
    localStorage.setItem("gastToken", token);
  }
  return token;
}

export function WarenkorbProvider({ children }: { children: React.ReactNode }) {
  const [warenkorb, setWarenkorb] = useState<Warenkorb | null>(null);

  const refresh = async () => {
    const gastToken = getOrCreateGastToken();
    
    try {
      // apiFetch gibt direkt die Daten zurück (oder null bei 401/Gast)
      const data = await apiFetch(`/warenkorb?gastToken=${gastToken}`);

      if (!data) {
        // Wenn data null ist, setzen wir den State auf null (Gast-Modus)
        setWarenkorb(null);
        return;
      }

      setWarenkorb(data);
    } catch (error) {
      console.error("Warenkorb konnte nicht geladen werden", error);
      setWarenkorb(null);
    }
  };

  useEffect(() => {
    // Avoid calling setState synchronously in effect
    const fetchWarenkorb = async () => {
      await refresh();
    };
    fetchWarenkorb();
  }, []);

  const items = warenkorb?.positionen ?? [];
  const gesamtMenge = items.reduce((sum, p) => sum + p.menge, 0);
  const gesamtPreis = items.reduce(
    (sum, p) => sum + p.menge * p.software.preis,
    0
  );

  return (
    <WarenkorbContext.Provider
      value={{ warenkorb, items, gesamtMenge, gesamtPreis, refresh }}
    >
      {children}
    </WarenkorbContext.Provider>
  );
}

export function useWarenkorb() {
  const ctx = useContext(WarenkorbContext);
  if (!ctx) throw new Error("useWarenkorb must be used inside WarenkorbProvider");
  return ctx;
}