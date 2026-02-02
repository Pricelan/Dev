"use client";

import { createContext, ReactNode, useState, useContext, useEffect, useCallback } from "react";
import { Kunde } from "@/types/kunde";
import { apiFetch } from "@/lib/api";

// Definieren des Typs für den Kunde-Kontext
type KundeContextType = {
  kunde: Kunde | null;
  setKunde: React.Dispatch<React.SetStateAction<Kunde | null>>;
  logout: () => void;
  loading: boolean;
};

// Erstellen des Kunde-Kontexts
export const KundeContext = createContext<KundeContextType | undefined>(undefined);

// Anbieter-Komponente für den Kunde-Kontext
export function KundeProvider({ children }: { children: ReactNode }) {
  const [kunde, setKunde] = useState<Kunde | null>(null);
  
  // Ladezustand für die Authentifizierung
  const [loading, setLoading] = useState(true);

  const checkUser = useCallback(async () => {
    // Überprüfen, ob der Benutzer eingeloggt ist
    try {
      const data = await apiFetch("/kunden/auth/me");
      setKunde(data || null);
    } catch {
      setKunde(null);
    } finally {
      setLoading(false);
    }
  }, []);

  // useEffect Hook zum Überprüfen des Benutzers beim Initialisieren
  useEffect(() => {
    checkUser();
  }, [checkUser]);

  // Funktion zum Ausloggen des Benutzers
  const logout = async () => {
    try {
      await apiFetch("/auth/logout", { method: "POST" });
    } catch (err) {
      console.error("Logout fehlgeschlagen", err);
    } finally {
      setKunde(null);
      window.location.href = "/";
    }
  };


  return (
    <KundeContext.Provider value={{ kunde, setKunde, logout, loading }}>
      {children}
    </KundeContext.Provider>
  );
}

// Custom Hook zum Verwenden des Kunde-Kontexts
export function useKunde() {
  const context = useContext(KundeContext);
  if (context === undefined) {
    throw new Error("useKunde must be used within a KundeProvider");
  }
  return context;
}