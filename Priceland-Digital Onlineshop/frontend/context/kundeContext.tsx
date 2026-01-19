"use client";
import { createContext, ReactNode, useState, useContext, useEffect } from "react";
import { Kunde } from "@/types/kunde";

type KundeContextType = {
  kunde: Kunde | null;
  setKunde: React.Dispatch<React.SetStateAction<Kunde | null>>;
  logout: () => void;
  loading: boolean; 
};

export const KundeContext = createContext<KundeContextType | undefined>(undefined);

export function KundeProvider({ children }: { children: ReactNode }) {
  const [kunde, setKunde] = useState<Kunde | null>(null);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  const checkUser = async () => {
    // Wenn die URL "/admin" enthält, brechen wir den Kunden-Check ab
    if (window.location.pathname.startsWith('/admin')) {
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("http://localhost:8080/api/kunden/auth/me", { 
        credentials: "include" 
      });

      if (res.ok) {
        const data = await res.json();
        setKunde(data);
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

  const logout = async () => {
    try {
      // Wichtig: Wir rufen den Logout-Endpunkt auf
      await fetch("http://localhost:8080/api/auth/logout", { 
        credentials: "include", 
        method: "POST" 
      });
    } catch (err) {
      console.error("Logout fehlgeschlagen", err);
    } finally {
      // Egal ob Erfolg oder Fehler: Lokal alles löschen
      setKunde(null);
      // Hard Redirect vernichtet alle Reste im State
      window.location.href = "/";
    }
  };

  return (
    <KundeContext.Provider value={{ kunde, setKunde, logout, loading }}>
      {children}
    </KundeContext.Provider>
  );
}

export function useKunde() {
  const context = useContext(KundeContext);
  if (context === undefined) {
    throw new Error("useKunde must be used within a KundeProvider");
  }
  return context;
}
