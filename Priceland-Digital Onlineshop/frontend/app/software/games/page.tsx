"use client";

import { useEffect, useState } from "react";
import { getGastToken } from "@/lib/gastToken";
import { Software } from "@/types/software";
import { useWarenkorb } from "@/context/warenkorbContext";
import SoftwareCard from "@/app/components/SoftwareCard";
import Link from "next/link";

export default function GamesShopPage() {
  const [software, setSoftware] = useState<Software[]>([]);
  const [loading, setLoading] = useState(true);
  const { refresh } = useWarenkorb();

  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:8080/api/software")
      .then((res) => res.json())
      .then((data) => {
        // FILTER: Nur Einträge mit der Kategorie "GAMES" passend zum Java-Enum
        const filtered = data.filter((s: Software) => s.kategorie === "COMPUTER_SPIELE");
        setSoftware(filtered);
      })
      .catch((err: unknown) => {
        console.error("Fehler beim Laden der Games", err);
      })
      .finally(() => {
        setLoading(false);
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

      await refresh();
      alert("Spiel wurde dem Warenkorb hinzugefügt");
    } catch (err: unknown) {
      let message = "Ein unerwarteter Fehler ist aufgetreten";
      if (err instanceof Error) message = err.message;
      
      console.error("ADD ERROR:", err);
      alert("Fehler: " + message);
    }
  }

  return (
    <div className="p-6 max-w-5xl mx-auto min-h-screen">
      <Link href="/" className="text-blue-600 hover:underline mb-4 inline-block font-medium">
        ← Zurück zur Startseite
      </Link>

      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-2 text-gray-900">Games-Shop</h1>
        <p className="text-gray-600 mb-8">
          Wähle ein spannendes Spiel aus und lege es direkt in den Warenkorb.
        </p>

        {loading ? (
          /* Moderne Lade-Animation */
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-gray-400 font-medium">Spiele-Katalog wird geladen...</p>
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
              /* Anzeige wenn keine Games gefunden wurden */
              <div className="text-center py-20 bg-white rounded-2xl border-2 border-dashed border-gray-200">
                <p className="text-gray-400 text-lg">Aktuell sind keine Spiele im Angebot.</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}