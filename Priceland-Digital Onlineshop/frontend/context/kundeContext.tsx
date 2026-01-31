"use client";

import { createContext, ReactNode, useState, useContext, useEffect } from "react";
import { Kunde } from "@/types/kunde";
import { apiFetch } from "@/lib/api";

// Definition des Typs für den Kunden-Kontext
type KundeContextType = {
  kunde: Kunde | null;
  setKunde: React.Dispatch<React.SetStateAction<Kunde | null>>;
  logout: () => void;
  loading: boolean; 
};

// Erstellung des Kunden-Kontexts
export const KundeContext = createContext<KundeContextType | undefined>(undefined);

// Kunden-Provider-Komponente zur Bereitstellung des Kunden-Kontexts
export function KundeProvider({ children }: { children: ReactNode }) {
  const [kunde, setKunde] = useState<Kunde | null>(null);
  const [loading, setLoading] = useState(true);

// Überprüfung des angemeldeten Kunden beim Laden der Komponente
useEffect(() => {
  const checkUser = async () => {
   // Admin-Bereich überspringen
    if (window.location.pathname.startsWith('/admin')) {
      setLoading(false);
      return;
    }
    
    try {
      const res = await apiFetch("/kunden/auth/me");
        if (res.ok) {
        setKunde(res);
      } else {
        setKunde(null);
      }
    } catch {
      setKunde(null);
    } finally {
      setLoading(false);
    }
  };
  checkUser();
}, []);

  // Funktion zum Ausloggen des Kunden
  const logout = async () => {
    try {
      // Anfrage an das Backend zum Ausloggen
      await apiFetch("/auth/logout", {
        method: "POST" 
      });
    } catch (err) {
      console.error("Logout fehlgeschlagen", err);
    } finally {
      // Kundenstatus zurücksetzen
      setKunde(null);
      // Weiterleitung zur Startseite
      window.location.href = "/";
    }
  };

  // Bereitstellung des Kunden-Kontexts für die Kindkomponenten
  return (
    <KundeContext.Provider value={{ kunde, setKunde, logout, loading }}>
      {children}
    </KundeContext.Provider>
  );
}

// Custom Hook zum Zugriff auf den Kunden-Kontext
export function useKunde() {
  const context = useContext(KundeContext);
  if (context === undefined) {
    throw new Error("useKunde must be used within a KundeProvider");
  }
  return context;
}
