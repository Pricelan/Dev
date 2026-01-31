"use client";

import { useEffect, useState } from "react";
import { useKunde } from "@/context/kundeContext";
import { Bestellung } from "@/types/bestellung";
import { apiFetch } from "@/lib/api";

// Hauptkomponente für das Kundenprofil
export default function KundenProfil() {
  const { kunde } = useKunde();
  const [bestellungen, setBestellungen] = useState<Bestellung[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Bestellung | null>(null);

  // useEffect Hook zum Laden der Bestellungen des Kunden beim Initialisieren
  useEffect(() => {
    if (!kunde?.id) return;

    apiFetch(`/bestellungen/kunde/${kunde.id}`, {
      method: 'GET',
      credentials: "include" 
    })
    .then(async res => {
      if (!res.ok) {
        const errorText = await res.text();
        console.error("Backend meldet:", res.status, errorText);
        return [];
      }
      return res.json();
    })
    .then(data => setBestellungen(data))
    .catch(err => console.error("Netzwerkfehler:", err));
  }, [kunde]);

  if (!kunde) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f1f5f9] text-slate-400 font-bold uppercase tracking-widest text-xs">
        <div className="animate-pulse">Lade Kundendaten...</div>
      </div>
    );
  }

  
  return (
    <div className="min-h-screen bg-[#f1f5f9] relative overflow-hidden py-12 px-4 md:px-8">
      
      {/* Hintergrund-Deko */}
      <div className="absolute top-[-10%] left-[-5%] w-160 h-160 bg-blue-100/40 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-0 right-[-5%] w-120 h-120 bg-indigo-100/40 rounded-full blur-[100px]"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        <header className="mb-12">
          <span className="text-blue-600 font-black text-[10px] uppercase tracking-[0.3em] mb-3 block">Dashboard</span>
          <h1 className="text-5xl font-black text-slate-900 tracking-tight">Mein Konto</h1>
          <p className="text-slate-500 font-medium mt-2 text-lg">Willkommen zurück, {kunde.vorname}!</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* LINK: Profil-Card */}
          <div className="lg:col-span-1 space-y-6">
            <section className="bg-slate-50/70 backdrop-blur-xl p-8 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-white/60">
              <div className="flex flex-col items-center text-center mb-8">
                <div className="w-24 h-24 bg-linear-to-br from-blue-600 to-indigo-700 text-white rounded-3xl flex items-center justify-center text-3xl font-black shadow-xl shadow-blue-200 mb-4">
                  {kunde.vorname[0]}{kunde.nachname[0]}
                </div>
                <h2 className="font-black text-2xl text-slate-800">{kunde.vorname} {kunde.nachname}</h2>
                <p className="text-slate-400 font-medium">{kunde.email}</p>
              </div>
              
              <div className="space-y-6 border-t border-slate-200/50 pt-8">
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Rechnungsadresse</label>
                  <div className="bg-slate-100/50 p-5 rounded-2xl border border-slate-200/30">
                    <p className="text-slate-700 font-bold">{kunde.strasse} {kunde.hausnummer}</p>
                    <p className="text-slate-600 font-medium">{kunde.plz} {kunde.ort}</p>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* RECHTS: Bestellhistorie */}
          <div className="lg:col-span-2">
            <section className="bg-slate-50/70 backdrop-blur-xl rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-white/60 overflow-hidden">
              <div className="p-8 border-b border-slate-200/50 flex justify-between items-center bg-white/40">
                <h3 className="font-black text-2xl text-slate-800 tracking-tight">Bestellungen</h3>
                <span className="bg-blue-600 text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest shadow-lg shadow-blue-100">
                  {bestellungen.length} Einträge
                </span>
              </div>

              {bestellungen.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="bg-slate-100/50 text-slate-400 text-[10px] uppercase font-black tracking-widest">
                      <tr>
                        <th className="px-8 py-5">Order ID</th>
                        <th className="px-8 py-5">Datum</th>
                        <th className="px-8 py-5">Status</th>
                        <th className="px-8 py-5 text-right">Aktion</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200/30">
                      {bestellungen.map((b) => (
                        <tr key={b.id} className="hover:bg-blue-50/50 transition-colors group">
                          <td className="px-8 py-6 font-bold text-slate-700">#{b.id}</td>
                          <td className="px-8 py-6 text-slate-500 font-medium">
                            {new Date(b.erstelltAm).toLocaleDateString("de-DE")}
                          </td>
                          <td className="px-8 py-6">
                            <span className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider ${
                              b.status === 'BEZAHLT' 
                                ? 'bg-green-100 text-green-600' 
                                : 'bg-amber-100 text-amber-600'
                            }`}>
                              {b.status}
                            </span>
                          </td>
                          <td className="px-8 py-6 text-right">
                            <button 
                              onClick={() => setSelectedOrder(b)}
                              className="bg-white border border-slate-200 text-slate-400 group-hover:bg-slate-900 group-hover:text-white group-hover:border-slate-900 w-10 h-10 rounded-xl transition-all flex items-center justify-center ml-auto shadow-sm"
                            >
                              →
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="p-20 text-center">
                  <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl">📦</div>
                  <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Noch keine Bestellungen</p>
                </div>
              )}
            </section>
          </div>
        </div>
      </div>

      {/* Detail-Modal für Bestellungen */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-[3rem] shadow-[0_40px_100px_rgba(0,0,0,0.3)] max-w-lg w-full overflow-hidden animate-in fade-in zoom-in duration-300">
            <div className="p-10 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <div>
                <h2 className="text-2xl font-black text-slate-800 tracking-tight">Bestellung #{selectedOrder.id}</h2>
                <p className="text-sm text-slate-400 font-medium">{new Date(selectedOrder.erstelltAm).toLocaleString("de-DE")}</p>
              </div>
              <button onClick={() => setSelectedOrder(null)} className="text-4xl text-slate-300 hover:text-slate-900 transition-colors">&times;</button>
            </div>
            
            <div className="p-10">
              <div className="space-y-4 mb-10">
                <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] mb-2">Positionen</p>
                {selectedOrder.positionen?.map((pos, idx) => (
                  <div key={idx} className="flex justify-between items-center bg-slate-50 p-5 rounded-2xl border border-slate-100">
                    <div>
                      <p className="font-bold text-slate-800">{pos.software.name}</p>
                      <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-1">Menge: {pos.menge}</p>
                    </div>
                    <span className="font-black text-slate-900 text-lg">{(pos.einzelpreis ?? 0).toFixed(2)} €</span>
                  </div>
                ))}
              </div>

              <div className="bg-slate-900 rounded-4xl p-8 text-white shadow-2xl shadow-blue-900/20">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-1">Status</p>
                    <p className="font-black text-xl italic">{selectedOrder.status}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-1">Gesamtbetrag</p>
                    <p className="text-3xl font-black text-blue-400">{(selectedOrder.gesamtpreis ?? 0).toFixed(2)} €</p>
                  </div>
                </div>
              </div>

              <button 
                onClick={() => setSelectedOrder(null)}
                className="w-full mt-10 py-5 bg-blue-600 text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-blue-500 transition-all active:scale-95 shadow-xl shadow-blue-100"
              >
                Zurück zur Übersicht
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}