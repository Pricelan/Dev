"use client";

import React, { useState } from "react";
import Link from "next/link"; 
import { Software } from "@/types/software";

interface SoftwareCardProps {
  software: Software;
  onAddToCart: (id: string | number) => void;
}

export default function SoftwareCard({ software, onAddToCart }: SoftwareCardProps) {
  const [added, setAdded] = useState(false);

  if (!software) return null;

  const handleBtnClick = (e: React.MouseEvent) => {
    e.preventDefault();   
    e.stopPropagation();  
    
    console.log("Button geklickt für:", software.name);
    
    onAddToCart(software.id);
    setAdded(true);

    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="bg-white/70 backdrop-blur-2xl p-8 rounded-[2.5rem] border border-white shadow-[0_20px_50px_rgba(0,0,0,0.04)] flex flex-col justify-between transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_30px_60px_rgba(59,130,246,0.1)] group relative">
      
      {/* Software Info Bereich */}
      <div>
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
             <span className="bg-blue-600 w-2 h-2 rounded-full animate-pulse" />
             <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Verfügbar</span>
          </div>
          
          <Link href={`/software/${software.id}`} className="block relative z-10">
            <h3 className="text-2xl font-black text-slate-900 leading-tight tracking-tight group-hover:text-blue-600 transition-colors italic">
              {software.name}
            </h3>
          </Link>

          <span className="inline-block mt-2 bg-slate-100 text-slate-500 text-[9px] px-3 py-1 rounded-lg font-black uppercase tracking-widest">
            V. {software.version}
          </span>
        </div>

        <p className="text-slate-500 text-sm leading-relaxed mb-10 line-clamp-3 font-medium">
          {software.softwareBeschreibung || "Professionelle Lösung für höchste Ansprüche."}
        </p>
      </div>

      <div className="flex items-end justify-between pt-6 border-t border-slate-50 relative">
        <div className="flex flex-col">
          <span className="text-[10px] text-slate-400 uppercase font-black tracking-widest mb-1">Preis</span>
          <span className="text-3xl font-black text-slate-900 tracking-tighter">
            {software.preis === 0 ? (
              <span className="text-emerald-500">Gratis</span>
            ) : (
              <>{software.preis.toFixed(2)} <span className="text-blue-600 text-lg">€</span></>
            )}
          </span>
        </div>

        {/* Warenkorb-Button */}
        <button
          type="button"
          onClick={handleBtnClick}
          className={`relative z-50 w-14 h-14 rounded-2xl shadow-xl transition-all active:scale-90 flex items-center justify-center border-2 ${
            added 
            ? "bg-emerald-500 border-emerald-400 text-white" 
            : "bg-slate-900 border-slate-900 hover:bg-blue-600 hover:border-blue-500 text-white"
          }`}
        >
          <span className="text-xl pointer-events-none">
            {added ? "✅" : "🛒"}
          </span>
        </button>
      </div>
    </div>
  );
}