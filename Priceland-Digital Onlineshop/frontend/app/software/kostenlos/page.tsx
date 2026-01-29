"use client";

import { useEffect, useState } from "react";
import { getGastToken } from "@/lib/gastToken";
import { Software } from "@/types/software";
import { useWarenkorb } from "@/context/warenkorbContext";
import SoftwareCard from "@/app/components/SoftwareCard";
import Link from "next/link";

export default function SoftwareShopPage() {
  const [software, setSoftware] = useState<Software[]>([]);
  const [loading, setLoading] = useState(true); // Neu: Lade-Status
  const { refresh } = useWarenkorb();

  useEffect(() => {
    setLoading(true);
    // Stelle sicher, dass die URL exakt so im Backend existiert
    fetch("http://localhost:8080/api/software")
      .then((res) => res.json())
      .then((data) => {
        // FILTER: Nutzt das neue Enum-Feld 'kategorie'
        // Für andere Seiten hier "SOFTWARE" oder "GAMES" einsetzen
        const filtered = data.filter((s: Software) => s.kategorie === "KOSTENLOSE_SOFTWARE");
        setSoftware(filtered);
      })
      .catch((err) => {
        console.error("Fehler beim Laden der Software", err);
      })
      .finally(() => {
        setLoading(false); // Laden beendet
      });
  }, []);

  async function addToCart(softwareId: number) {
    const token = getGastToken();

    try {
      const res = await fetch("http://localhost:8080/api/warenkorb/add", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          softwareId: softwareId,
          menge: 1,
          gastToken: token,
        }),
      });

      const text = await res.text();

      if (!res.ok) {
        throw new Error(text || "Fehler beim Hinzufügen");
      }

      // Warenkorb im Header aktualisieren
      await refresh();
      alert("Produkt wurde dem Warenkorb hinzugefügt");
    } catch (err: unknown) {
      console.error("ADD ERROR:", err);
      if (err instanceof Error) {
        alert("Fehler: " + err.message);
      } else {
        alert("Ein unbekannter Fehler ist aufgetreten.");
      }
    }
  }



return (
    <div className="p-6 max-w-5xl mx-auto min-h-screen">
      <Link href="/" className="text-blue-600 hover:underline mb-4 inline-block font-medium">
        ← Zurück zur Startseite
      </Link>

      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-2 text-gray-900">Kostenlose Software</h1>
        <p className="text-gray-600 mb-8">
          Wähle eine kostenlose Software aus und lege sie direkt in den Warenkorb.
        </p>

        {loading ? (
          /* Moderne Lade-Animation */
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-gray-400 font-medium">Kostenlose Software wird geladen...</p>
          </div>
        ) : (
          <>
            {software.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {software.map((s) => (
                  <SoftwareCard 
                    key={s.id} 
                    software={s} 
                    onAddToCart={addToCart} 
                  />
                ))}
              </div>
            ) : (
              <p className="text-gray-500">Keine kostenlose Software gefunden.</p>
            )}
          </>
        )}
      </div>
    </div>
  );
}