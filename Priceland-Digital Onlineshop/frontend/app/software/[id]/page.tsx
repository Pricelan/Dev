"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Software } from "@/types/software"; 
import { getGastToken } from "@/lib/gastToken";
import { useWarenkorb } from "@/context/warenkorbContext";
import Link from "next/link";
import { getErrorMessage } from "@/lib/error-utils";

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

    if (!res.ok) {
      const errorBody = await res.text();
      throw new Error(errorBody || "Server-Fehler beim Hinzufügen");
    }
    
    await refresh();
    alert(`${software.name} wurde dem Warenkorb hinzugefügt!`);
  } catch (err) {
    
    const message = getErrorMessage(err);
    alert("Fehler: " + message);
    console.error("Cart-Error:", err);
  }
}

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      <p className="mt-4 text-gray-500">Details werden geladen...</p>
    </div>
  );

  if (isNotFound || !software) return <div className="p-10 text-center text-red-500">Software wurde nicht gefunden.</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        
        {/* NAVIGATIONSPFAD (Breadcrumbs) */}
        <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-8 bg-white p-3 rounded-lg shadow-sm border border-gray-100">
          <Link href="/" className="hover:text-blue-600">Shop</Link>
          <span>/</span>
          
          {/* Dynamischer Link zur richtigen Unterkategorie */}
          {software.kategorie === "LIZENZIERTE_SOFTWARE" && (
            <Link href="/software/lizenzen" className="hover:text-blue-600 font-medium">Lizenzen</Link>
          )}
          {software.kategorie === "COMPUTER_SPIELE" && (
            <Link href="/software/games" className="hover:text-blue-600 font-medium">Games</Link>
          )}
          {software.kategorie === "KOSTENLOSE_SOFTWARE" && (
            <Link href="/software/kostenlos" className="hover:text-blue-600 font-medium">Freeware</Link>
          )}
          
          <span>/</span>
          <span className="text-gray-900 font-semibold truncate">{software.name}</span>
        </nav>

        {/* DETAIL KARTE */}
        <div className="bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            
            {/* Linke Seite: Infos */}
            <div className="p-8 md:p-12">
              <span className="inline-block px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-wider mb-4">
                {software.kategorie}
              </span>
              <h1 className="text-4xl font-extrabold text-gray-900 leading-tight">{software.name}</h1>
              <p className="text-gray-400 font-medium text-lg mt-2">Version: {software.version}</p>
              
              <div className="mt-8">
                <h3 className="text-sm font-bold text-gray-900 uppercase mb-2">Beschreibung</h3>
                <p className="text-gray-600 leading-relaxed text-lg">
                  {software.softwareBeschreibung || "Keine Beschreibung verfügbar."}
                </p>
              </div>
            </div>

            {/* Rechte Seite: Preis & Kauf */}
            <div className="bg-gray-50 p-8 md:p-12 flex flex-col justify-center items-center border-l border-gray-100">
              <div className="text-5xl font-black text-gray-900 mb-2">
                {software.preis === 0 ? "FREE" : `${software.preis.toFixed(2)}€`}
              </div>
              <p className="text-gray-400 text-sm mb-8">inkl. MwSt. / Sofort-Download</p>
              
              <button
                onClick={addToCart}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-5 px-8 rounded-2xl shadow-lg shadow-blue-200 transition-all active:scale-95 text-xl"
              >
                🛒 Jetzt kaufen
              </button>
              
              <div className="mt-8 space-y-2 text-center">
                <p className="text-sm font-semibold text-gray-700">Hersteller: {software.hersteller?.name || "Unbekannt"}</p>
                <div className="flex items-center justify-center space-x-2 text-green-600 text-sm font-medium">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                  <span>Produkt auf Lager</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}