import React from "react";
import Link from "next/link";
import { Software } from "@/types/software";

interface SoftwareCardProps {
  software: Software;
  onAddToCart: (id: number) => void; // Funktion für den Warenkorb
}

// SoftwareCard-Komponente zur Anzeige von Software-Informationen
export default function SoftwareCard({ software, onAddToCart }: SoftwareCardProps) {
  if (!software) return null;
return (
    <div className="bg-white p-6 rounded-[--radius-card] shadow-[--shadow-card] border border-white hover:border-blue-100 flex flex-col justify-between transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl relative overflow-hidden group">
      
     
      <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-blue-500 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity" />

      <div>
        <div className="flex justify-between items-start mb-3">
          <Link href={`/software/${software.id}`} className="no-underline">
            <h3 className="text-lg font-extrabold text-slate-800 group-hover:text-[--color-primary] transition-colors leading-tight">
              {software.name}
            </h3>
          </Link>
          <span className="bg-slate-100 text-slate-500 text-[10px] px-2 py-1 rounded-md font-bold uppercase tracking-tighter">
            {software.version}
          </span>
        </div>

      <p className="text-slate-500 text-sm leading-relaxed mb-6 line-clamp-3">
          {software.softwareBeschreibung ? (
            software.softwareBeschreibung
          ) : (
            <span className="text-slate-300 italic">Keine Beschreibung im System hinterlegt</span>
          )}
        </p>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-slate-50">
        <div className="flex flex-col">
          <span className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">Preis</span>
          <span className="text-xl font-black text-slate-900">
            {software.preis === 0 ? (
              <span className="text-emerald-500">Gratis</span>
            ) : (
              `${software.preis.toFixed(2)} €`
            )}
          </span>
        </div>

        <button
          onClick={() => onAddToCart(software.id)}
          className="bg-[--color-primary] hover:bg-[--color-primary-dark] text-white p-3 rounded-[--radius-btn] shadow-lg shadow-blue-100 transition-all active:scale-90 flex items-center justify-center"
        >
          <span className="text-lg">🛒</span>
        </button>
      </div>
    </div>
  );
}