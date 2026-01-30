"use client";
import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";
import { Kunde } from "@/types/kunde";
import Link from "next/link";

export default function KundenVerwaltung() {
  const [kunden, setKunden] = useState<Kunde[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiFetch("/admin/kunden")
      .then(data => {
        setKunden(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const handleSperren = (id: number) => {
    if (confirm(`Kunde #${id} wirklich sperren?`)) {
      // Hier käme dein API-Call zum Sperren hin
      console.log("Kunde gesperrt:", id);
    }
  };

  if (loading) return <div className="p-10 animate-pulse text-slate-400">Lade Kundendaten...</div>;

  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <Link href="/admin" className="text-blue-600 font-black text-[10px] uppercase tracking-[0.2em] mb-2 block hover:underline">
            ← Dashboard
          </Link>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Kunden-Management</h1>
          <p className="text-slate-500 text-sm font-medium">Insgesamt {kunden.length} registrierte Nutzer</p>
        </div>
        
        <button className="bg-emerald-500 text-white px-6 py-3 rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-emerald-600 transition-all shadow-xl shadow-emerald-100 flex items-center gap-2">
          📊 Excel Export
        </button>
      </div>

      {/* TABLE CARD */}
      <div className="bg-white/70 backdrop-blur-md border border-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.04)] overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-100">
              <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Kunde</th>
              <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Kontakt</th>
              <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Anschrift</th>
              <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Aktion</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {kunden.map((k) => (
              <tr key={k.id} className="hover:bg-slate-50/50 transition-colors group">
                {/* Name & ID */}
                <td className="px-8 py-6">
                  <div className="flex flex-col">
                    <span className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                      {k.vorname} {k.nachname}
                    </span>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">ID #{k.id}</span>
                  </div>
                </td>

                {/* E-Mail & Tel */}
                <td className="px-8 py-6">
                  <div className="flex flex-col text-sm">
                    <span className="text-slate-700 font-medium">{k.email}</span>
                    <span className="text-slate-400 text-xs">{k.telefonnummer || "Keine Nummer"}</span>
                  </div>
                </td>

                {/* Adresse kombiniert */}
                <td className="px-8 py-6">
                  <div className="text-sm text-slate-600 leading-relaxed">
                    {k.strasse} {k.hausnummer}<br />
                    <span className="font-bold text-slate-400">{k.plz} {k.ort}</span>
                  </div>
                </td>

                {/* Aktion */}
                <td className="px-8 py-6 text-right">
                  <button 
                    onClick={() => handleSperren(k.id)}
                    className="bg-red-50 text-red-500 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all active:scale-95 border border-red-100"
                  >
                    Sperren
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}