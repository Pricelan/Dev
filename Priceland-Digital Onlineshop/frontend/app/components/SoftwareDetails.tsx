"use client";

import Link from "next/link";
import { Software } from '@/types/software';

export default function SoftwareDetails({ software, addToCart }: { software: Software, addToCart: () => void }) {
  
  // 1. Sicherheitscheck: Wenn software noch nicht da ist, zeige nichts
  if (!software) return null;

  const getCategoryPath = () => {
    switch (software.kategorie) {
      case "COMPUTER_SPIELE": return "/software/games";
      case "LIZENZIERTE_SOFTWARE": return "/software/lizenzen";
      case "KOSTENLOSE_SOFTWARE": return "/software/kostenlos";
      default: return "/shop";
    }
  };

  // 2. Sicherheitscheck für den Preis: Fallback auf 0, falls undefined
  const price = software.preis ?? 0;

  return (
    <div className="min-h-screen bg-slate-50/50 py-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Navigation */}
        <nav className="flex items-center gap-2 text-sm font-medium text-slate-400 mb-8">
          <Link href="/" className="hover:text-blue-600 transition">Shop</Link>
          <span className="opacity-30">/</span>
          <Link 
            href={getCategoryPath()} 
            className="text-slate-600 uppercase tracking-tight hover:text-blue-600 transition font-black"
          >
            {software.kategorie?.replace("_", " ") || "Kategorie"}
          </Link>
          <span className="opacity-30">/</span>
          <span className="text-slate-400">{software.name}</span>
        </nav>

        {/* Die Haupt-Karte */}
        <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-200/60 overflow-hidden flex flex-col lg:flex-row">
          <div className="flex-[1.4] p-8 md:p-16">
            <h1 className="text-5xl font-black text-slate-900 mb-4">{software.name}</h1>
            <p className="text-xl text-slate-400 mb-8">Version {software.version}</p>
            <div className="bg-slate-50 rounded-3xl p-8 text-slate-600 leading-relaxed whitespace-pre-line text-lg">
              {software.softwareBeschreibung || "Keine Beschreibung verfügbar."}
            </div>
          </div>

          <div className="flex-1 bg-slate-900 p-8 md:p-16 text-white flex flex-col justify-between">
            <div>
              <span className="text-white/40 text-xs font-bold uppercase block mb-4">
                {price === 0 ? "Status" : "Preis"}
              </span>
              {/* Preisanzeige mit Bedingung für Gratis-Software */}
              <div className="text-7xl font-black">
                {price === 0 ? "Gratis" : `${price.toFixed(2)}€`}
              </div>
            </div>
            <button onClick={addToCart} className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black py-6 rounded-2xl text-xl transition-all">
              {price === 0 ? "Kostenlos sichern" : "In den Warenkorb"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}