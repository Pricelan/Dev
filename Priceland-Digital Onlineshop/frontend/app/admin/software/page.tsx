"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { apiFetch } from "@/lib/api";
import { Hersteller } from '../../../types/hersteller';

interface SoftwareItem {
  id: number;
  name: string;
  version: string;
  preis: number;
  hersteller?: Hersteller;
}

export default function AdminSoftwareList() {
  const [software, setSoftware] = useState<SoftwareItem[]>([]);
  const [loading, setLoading] = useState(true);

  const handleDelete = async (id: number) => {
    if (!confirm("Möchtest du dieses Produkt wirklich löschen?")) return;
    try {
      // Nutze apiFetch für Konsistenz (Credentials sind dort meist integriert)
      await apiFetch(`/admin/software/löschen/${id}`, { method: "DELETE" });
      setSoftware(prev => prev.filter(s => s.id !== id));
    } catch {
      alert("Fehler beim Löschen.");
    }
  };

  useEffect(() => {
    apiFetch("/software") 
      .then(data => setSoftware(data))
      .catch(() => { /* Optional: Fehler-Handling */ })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return (
    <div className="flex justify-center py-20">
      <div className="animate-spin rounded-2xl h-10 w-10 border-4 border-blue-600 border-t-transparent"></div>
    </div>
  );

  return (
    <div className="space-y-8 pt-10">
      {/* GRID - Kompakter für die Dashboard-Ansicht */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {software.map(item => (
          <div key={item.id} className="bg-white/80 backdrop-blur-md border border-white rounded-[2.5rem] p-6 shadow-sm flex flex-col justify-between hover:shadow-xl hover:-translate-y-1 transition-all group">
            
            <div>
              <div className="flex justify-between items-start mb-4">
                <div className="max-w-[70%]">
                  <h3 className="text-lg font-black text-slate-900 leading-tight group-hover:text-blue-600 transition-colors truncate">
                    {item.name}
                  </h3>
                  <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">V. {item.version}</span>
                </div>
                <span className="bg-slate-100 text-slate-500 text-[8px] font-black px-2 py-1 rounded-lg uppercase">ID {item.id}</span>
              </div>

              {/* KOMPAKTE HERSTELLER BOX */}
              <div className="bg-slate-50/50 rounded-xl p-3 mb-4 border border-slate-100">
                 <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Brand</p>
                 <p className="text-sm font-bold text-slate-700">{item.hersteller?.name || "Standard"}</p>
              </div>

              <div className="mb-6">
                <p className="text-2xl font-black text-slate-900">{item.preis?.toFixed(2)} €</p>
              </div>
            </div>

            {/* KOMPAKTE BUTTONS */}
            <div className="flex gap-2">
              <Link 
                href={`/admin/software/bearbeiten/${item.id}`} 
                className="flex-1 bg-slate-900 text-white text-center py-3 rounded-xl font-black text-[9px] uppercase tracking-widest hover:bg-blue-600 transition-all shadow-md active:scale-95"
              >
                Edit
              </Link>
              
              <button 
                onClick={() => handleDelete(item.id)}
                className="px-4 bg-red-50 text-red-500 rounded-xl font-black text-[9px] uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all active:scale-95 border border-red-100"
              >
                🗑️
              </button>
            </div>

          </div>
        ))}

        {/* QUICK ADD CARD */}
        <Link href="/admin/software/new" className="border-2 border-dashed border-slate-200 rounded-[2.5rem] p-6 flex flex-col items-center justify-center text-slate-400 hover:border-blue-400 hover:text-blue-600 transition-all group min-h-[200px]">
          <span className="text-3xl mb-2 group-hover:scale-125 transition-transform">➕</span>
          <span className="font-black text-[10px] uppercase tracking-widest">Software hinzufügen</span>
        </Link>
      </div>
    </div>
  );
}