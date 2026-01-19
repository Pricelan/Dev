"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Software } from "@/types/software"; 
import { getGastToken } from "@/lib/gastToken";
import { useWarenkorb } from "@/context/warenkorbContext";
import Link from "next/link";

export default function SoftwareDetail() {
  const params = useParams<{ id: string }>();
  const [software, setSoftware] = useState<Software | null>(null);
  const [isNotFound, setIsNotFound] = useState(false);
  const [loading, setLoading] = useState(true);
  const { refresh } = useWarenkorb();

  useEffect(() => {
    fetch(`http://localhost:8080/api/software/${params.id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Not found");
        return res.json();
      })
      .then((data) => {
        setSoftware(data);
        setLoading(false);
      })
      .catch(() => {
        setIsNotFound(true);
        setLoading(false);
      });
  }, [params.id]);

  // WICHTIG: Die Warenkorb-Logik für die Detailseite
  async function addToCart() {
    if (!software) return;
    const token = getGastToken();

    try {
      const res = await fetch("http://localhost:8080/api/warenkorb/add", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          softwareId: software.id,
          menge: 1,
          gastToken: token,
        }),
      });

      if (!res.ok) throw new Error("Fehler beim Hinzufügen");
      
      await refresh(); // Warenkorb-Icon aktualisieren
      alert(`${software.name} wurde dem Warenkorb hinzugefügt!`);
    } catch {
      alert("Fehler: Konnte Produkt nicht hinzufügen.");
    }
  }

  if (loading) return <div className="p-10 text-center">Lade Software-Details...</div>;
  if (isNotFound || !software) return <div className="p-10 text-center text-red-500">Software wurde nicht gefunden.</div>;

  return (


    <div className="min-h-screen bg-gray-50 p-6">
    <div className="max-w-4xl mx-auto">
      
      {/* NAVIGATIONSPFAD */}
      <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-8 bg-white p-3 rounded-lg shadow-sm">
        <Link href="/" className="hover:text-blue-600">Shop</Link>
        <span>/</span>
        
        {/* Dynamischer Link zur Kategorie */}
        {software.kategorieListe === "SOFTWARE" && (
          <Link href="/software/lizenzen" className="hover:text-blue-600">Lizenzen</Link>
        )}
        {software.kategorieListe === "GAMES" && (
          <Link href="/software/games" className="hover:text-blue-600">Games</Link>
        )}
        {software.kategorieListe === "FREEWARE" && (
          <Link href="/software/kostenlos" className="hover:text-blue-600">Freeware</Link>
        )}
        
        <span>/</span>
        <span className="text-gray-900 font-semibold truncate">{software.name}</span>
      </nav>
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-xl mt-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
  
        {/* Linke Seite: Infos */}
        <div>
          <h1 className="text-4xl font-bold text-gray-800">{software.name}</h1>
          <p className="text-blue-600 font-medium text-lg mt-1">Version: {software.version}</p>
          
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <p className="text-gray-700 leading-relaxed italic">
              &quot;{software.softwareBeschreibung || "Keine Beschreibung verfügbar."}&quot;
            </p>
          </div>
        </div>

        {/* Rechte Seite: Preis & Kauf */}
        <div className="flex flex-col justify-center items-center border-l border-gray-100 pl-8">
          <div className="text-3xl font-bold text-gray-900 mb-6">
            {software.preis === 0 ? "Kostenlos" : `${software.preis.toFixed(2)} €`}
          </div>
          
          <button
            onClick={addToCart}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-lg shadow-lg transition-all active:scale-95"
          >
            🛒 In den Warenkorb
          </button>
          
          <p className="text-xs text-gray-400 mt-4 text-center">
            Hersteller: {software.hersteller?.name || "Unbekannt"}<br />
            Digitale Lieferung per E-Mail
          </p>
        </div>
      </div>
    </div>
    </div>
  );

    </div>
  );
} 
