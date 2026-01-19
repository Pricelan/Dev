"use client";

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

    const res = await fetch(
      `http://localhost:8080/api/warenkorb?gastToken=${gastToken}`
    );

    if (!res.ok) {
      console.error("Warenkorb konnte nicht geladen werden", res.status);
      setWarenkorb(null);
      return;
    }

    setWarenkorb(await res.json());
  };

  useEffect(() => {
    (async () => {
      await refresh();
    })();
  }, []);

  const items = warenkorb?.positionen ?? [];
  const gesamtMenge = items.reduce((sum, p) => sum + p.menge, 0);
  const gesamtPreis = items.reduce(
    (sum, p) => sum + p.menge * p.software.preis,
    0
  );


 

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