"use client";

import { useEffect, useState } from "react";
import { getGastToken } from "@/lib/gastToken";
import { Software } from "@/types/software";
import { useWarenkorb } from "@/context/warenkorbContext";
import SoftwareCard from "@/app/components/SoftwareCard";
import Link from "next/link";
import { apiFetch } from "@/lib/api";

// Hauptkomponente für die Game-Shop-Seite
export default function GameShopPage() {
  const [software, setSoftware] = useState<Software[]>([]);
  const [loading, setLoading] = useState(true); 
  const { refresh } = useWarenkorb();

  // useEffect Hook zum Laden der Spiele-Daten beim Initialisieren
  useEffect(() => {
    setLoading(true);
    apiFetch("/software")
      .then((res) => res.json())
      .then((data) => {
        const dataArray = Array.isArray(data) ? data : (data.content || []);
        const filtered = dataArray.filter((s: Software) => s.kategorie === "COMPUTER_SPIELE");
        setSoftware(filtered);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  // Funktion zum Hinzufügen der Software zum Warenkorb
  async function addToCart(softwareId: string | number) {
    const token = getGastToken();
    const idNum = typeof softwareId === "string" ? parseInt(softwareId, 10) : softwareId;
    // API-Aufruf zum Hinzufügen der Software zum Warenkorb
    try {
      const res = await apiFetch("/warenkorb/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ softwareId: idNum, menge: 1, gastToken: token }),
      });
      if (!res.ok) throw new Error();
      await refresh();
      alert("In den Warenkorb gelegt!");
    } catch {
      alert("Fehler beim Hinzufügen");
    }
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] relative overflow-hidden">
      
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-100/30 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-10 left-10 w-64 h-64 bg-blue-100/20 rounded-full blur-[100px] -z-10" />

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Navigations-Header */}
        <header className="mb-16">
          <Link href="/" className="group flex items-center gap-2 text-slate-400 hover:text-emerald-600 transition-colors mb-8 no-underline w-fit">
            <span className="bg-white p-2 rounded-xl shadow-sm group-hover:shadow-md group-hover:bg-emerald-50 transition-all">←</span>
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Zurück zur Startseite</span>
          </Link>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="text-emerald-600 font-black text-[10px] uppercase tracking-[0.4em] mb-2 block">Games & more</span>
              <h1 className="text-5xl font-black text-slate-900 tracking-tight">Game-Shop</h1>
            </div>
            <p className="max-w-md text-slate-500 font-medium leading-relaxed">
              Tauche ein in neue Welten: Entdecke die neuesten Blockbuster, packende Indie-Highlights und zeitlose Klassiker für dein ultimatives Gaming-Erlebnis.
            </p>
          </div>
        </header>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-32">
            <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-4xl animate-spin mb-6" />
            <p className="text-slate-400 font-black text-[10px] uppercase tracking-widest">Katalog wird geladen</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {software.length > 0 ? (
              software.map((s) => (
                <SoftwareCard key={s.id} software={s} onAddToCart={addToCart} />
              ))
            ) : (
              <div className="col-span-full bg-white/50 backdrop-blur-md border-2 border-dashed border-slate-200 rounded-[3rem] py-32 text-center">
                <div className="text-4xl mb-4">🎮</div>
                <p className="text-slate-400 font-bold uppercase tracking-widest text-sm">Aktuell keine Spiele im Katalog</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}