"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";
import Link from "next/link";
import { Bestellung } from "@/types/bestellung";

// Funktion zur Bestimmung der Stilklasse basierend auf dem Bestellstatus
const getStatusStyle = (status: string) => {
  switch (status) {
    case 'BEZAHLT':
    case 'ABGESCHLOSSEN':
      return 'bg-emerald-50 text-emerald-600 border-emerald-100';
    case 'IN_BEARBEITUNG':
      return 'bg-amber-50 text-amber-600 border-amber-100';
    case 'STORNIERT':
      return 'bg-rose-50 text-rose-600 border-rose-100';
    default:
      return 'bg-slate-50 text-slate-500 border-slate-100';
  }
};

// Hauptkomponente für die Bestellverwaltung
export default function AdminOrders() {
  const [orders, setOrders] = useState<Bestellung[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Bestellung | null>(null);

  const loadOrders = () => {
    setLoading(true);
    apiFetch("/bestellungen") 
      .then(data => {
        setOrders(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  };

  // useEffect Hook um Bestellungen zu laden
  useEffect(() => {
    // Nutzung von Promise.resolve().then() um sicherzustellen, dass der Ladevorgang nach der Initialisierung erfolgt
    Promise.resolve().then(() => loadOrders());
  }, []);

  return (
    <div className="space-y-8 relative">
      {/* HEADER BEREICH */}
      <div className="flex justify-between items-center">
        <div>
          <Link href="/admin" className="text-blue-600 font-black text-[10px] uppercase tracking-[0.2em] mb-2 block hover:underline">
            ← Dashboard
          </Link>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Bestellverwaltung</h1>
          <p className="text-slate-500 text-sm font-medium">Überwachung aller Transaktionen</p>
        </div>
        
        <button onClick={loadOrders} className="bg-white border border-slate-200 p-3 rounded-xl hover:bg-slate-50 transition-all shadow-sm">
            <span className="text-lg">🔄</span>
        </button>
      </div>

      {/* TABELLE KARTE */}
      <div className="bg-white/70 backdrop-blur-md border border-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.04)] overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-100">
              <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Order ID</th>
              <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Kunde</th>
              <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Status</th>
              <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Summe</th>
              <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Aktion</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {!loading && orders.map((order) => (
              <tr key={order.id} className="hover:bg-slate-50/50 transition-colors group">
                <td className="px-8 py-6">
                  <div className="flex flex-col">
                    <span className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">#{order.id}</span>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">
                        {new Date(order.erstelltAm).toLocaleDateString("de-DE")}
                    </span>
                  </div>
                </td>
                <td className="px-8 py-6">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center text-[10px] font-black text-slate-400">
                        {order.käuferName?.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-sm font-bold text-slate-700">{order.käuferName}</span>
                  </div>
                </td>
                <td className="px-8 py-6 text-center">
                  <span className={`inline-block px-4 py-1.5 rounded-xl border text-[9px] font-black uppercase tracking-widest ${getStatusStyle(order.status)}`}>
                    {order.status}
                  </span>
                </td>
                <td className="px-8 py-6">
                  <span className="text-lg font-black text-slate-900">
                    {Number(order.gesamtpreis).toLocaleString("de-DE", { minimumFractionDigits: 2 })} €
                  </span>
                </td>
                <td className="px-8 py-6 text-right">
                  <button 
                    onClick={() => setSelectedOrder(order)}
                    className="bg-slate-900 text-white px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 transition-all shadow-lg active:scale-95"
                  >
                    Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* DETAIL MODAL */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" 
            onClick={() => setSelectedOrder(null)}
          ></div>
          <div className="relative bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl p-8 md:p-12 overflow-hidden border border-white">
            <div className="flex justify-between items-start mb-8">
                <div>
                    <h2 className="text-3xl font-black text-slate-900 tracking-tight">Bestellung #{selectedOrder.id}</h2>
                    <p className="text-slate-500 font-medium">Details und Rechnungsdaten</p>
                </div>
                <button 
                    onClick={() => setSelectedOrder(null)}
                    className="text-slate-400 hover:text-slate-900 text-2xl font-bold"
                >✕</button>
            </div>

            <div className="space-y-6">
                <div className="bg-slate-50 p-6 rounded-3xl space-y-4">
                    <div>
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Kunde</label>
                        <p className="font-bold text-slate-900">{selectedOrder.käuferName}</p>
                    </div>
                    <div>
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Gesamtsumme</label>
                        <p className="text-2xl font-black text-blue-600">{Number(selectedOrder.gesamtpreis).toFixed(2)} €</p>
                    </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex gap-4">
                    <button className="flex-1 bg-slate-100 text-slate-900 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-200 transition-all">
                        PDF Rechnung
                    </button>
                    <button className="flex-1 bg-blue-600 text-white py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-700 transition-all">
                        Status ändern
                    </button>
                </div>
            </div>
          </div>
        </div>
      )}

      {loading && (
        <div className="p-20 text-center font-black text-slate-300 uppercase tracking-[0.3em] text-[10px] animate-pulse">
          Lade Daten...
        </div>
      )}
    </div>
  );
}