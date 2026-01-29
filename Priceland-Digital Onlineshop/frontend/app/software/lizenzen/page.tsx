"use client";

import { useEffect, useState } from "react";
import { getGastToken } from "@/lib/gastToken";
import { Software } from "@/types/software";
import { useWarenkorb } from "@/context/warenkorbContext";
import SoftwareCard from "@/app/components/SoftwareCard";
import Link from "next/link";

interface ShopProps {
  kategorieFilter: "LIZENZIERTE_SOFTWARE" | "COMPUTER_SPIELE" | "KOSTENLOSE_SOFTWARE";
  titel: string;
}

export default function SoftwareShopPage({}: ShopProps) {
  const [software, setSoftware] = useState<Software[]>([]);
  const [loading, setLoading] = useState(true);
  const { refresh } = useWarenkorb();

useEffect(() => {
  setLoading(true);
  fetch("http://localhost:8080/api/software")
    .then((res) => res.json())
    .then((data) => {
      // 1. Sicherstellen, dass data ein Array ist
      const dataArray = Array.isArray(data) ? data : (data.content || []);

      // 2. Filtern basierend auf der Kategorie "LIZENZIERTE_SOFTWARE"
      const filtered = dataArray.filter((s: Software) => 
        s.kategorie === "LIZENZIERTE_SOFTWARE"
      );

      console.log("Lizenzen gefunden:", filtered.length); 
      setSoftware(filtered);
    })
    .catch((err) => {
      console.error("Fehler beim Laden der Lizenzen:", err);
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
        body: JSON.stringify({ softwareId, menge: 1, gastToken: token }),
      });
      if (!res.ok) throw new Error("Fehler beim Hinzufügen");
      await refresh();
      alert("Erfolgreich zum Warenkorb hinzugefügt!");
    } catch (err) {
      alert("Fehler: " + (err instanceof Error ? err.message : "Unbekannt"));
    }
  }

  return (
    <div className="p-6 max-w-5xl mx-auto min-h-screen">
      <Link href="/" className="text-blue-600 hover:underline mb-4 inline-block font-medium">
        ← Zurück zur Startseite
      </Link>

      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-2 text-gray-900">Lizenzen-Shop</h1>
        <p className="text-gray-600 mb-8">
          Wähle eine lizenzierte Software aus und lege sie direkt in den Warenkorb.
        </p>

        {loading ? (
          /* Moderne Lade-Animation */
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-gray-400 font-medium">Lizenzen-Katalog wird geladen...</p>
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
              /* Anzeige wenn keine Lizenzen gefunden wurden */
              <div className="text-center py-20 bg-white rounded-2xl border-2 border-dashed border-gray-200">
                <p className="text-gray-400 text-lg">Aktuell sind keine Lizenzen im Angebot.</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}