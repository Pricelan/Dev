"use client";
import { useEffect, useState } from "react";
import { useKunde } from "@/context/kundeContext";
import { Bestellung } from "@/types/bestellung";

export default function KundenProfil() {
  const { kunde } = useKunde();
  const [bestellungen, setBestellungen] = useState<Bestellung[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Bestellung | null>(null);

  useEffect(() => {
    if (!kunde?.id) return;

    fetch(`http://localhost:8080/api/bestellungen/kunde/${kunde.id}`, {
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
      <div className="min-h-screen flex items-center justify-center bg-gray-50 text-gray-400 font-medium">
        Lade Kundendaten...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        
        <header className="mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900">Mein Konto</h1>
          <p className="text-gray-500 font-medium">Willkommen zurück, {kunde.vorname}!</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Linke Spalte: Profil-Info */}
          <div className="md:col-span-1 space-y-6">
            <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold shadow-inner">
                  {kunde.vorname[0]}{kunde.nachname[0]}
                </div>
                <div>
                  <h2 className="font-bold text-lg text-gray-800">{kunde.vorname} {kunde.nachname}</h2>
                  <p className="text-sm text-gray-500">{kunde.email}</p>
                </div>
              </div>
              
              <div className="space-y-4 border-t pt-4">
                <div>
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Rechnungsadresse</label>
                  <p className="text-gray-700 mt-1 font-medium">{kunde.strasse} {kunde.hausnummer}</p>
                  <p className="text-gray-700 font-medium">{kunde.plz} {kunde.ort}</p>
                </div>
              </div>
            </section>
          </div>

          {/* Rechte Spalte: Bestellhistorie */}
          <div className="md:col-span-2">
            <section className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-white">
                <h3 className="font-bold text-xl text-gray-800">Meine Bestellungen</h3>
                <span className="bg-blue-50 text-blue-600 text-xs font-bold px-3 py-1 rounded-full border border-blue-100">
                  {bestellungen.length} Einträge
                </span>
              </div>

              {bestellungen.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="bg-gray-50 text-gray-400 text-xs uppercase font-bold">
                      <tr>
                        <th className="px-6 py-4">Bestell-Nr.</th>
                        <th className="px-6 py-4">Datum</th>
                        <th className="px-6 py-4">Status</th>
                        <th className="px-6 py-4 text-right">Details</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {bestellungen.map((b) => (
                        <tr key={b.id} className="hover:bg-gray-50 transition-colors group">
                          <td className="px-6 py-4 font-bold text-gray-700">#{b.id}</td>
                          <td className="px-6 py-4 text-gray-600 text-sm">
                            {new Date(b.erstelltAm).toLocaleDateString("de-DE")}
                          </td>
                          <td className="px-6 py-4">
                            <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                              b.status === 'BEZAHLT' 
                                ? 'bg-green-100 text-green-700' 
                                : 'bg-amber-100 text-amber-700'
                            }`}>
                              {b.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <button 
                              onClick={() => setSelectedOrder(b)}
                              className="bg-gray-100 text-gray-600 group-hover:bg-blue-600 group-hover:text-white p-2 rounded-lg transition-all"
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
                <div className="p-12 text-center text-gray-400">
                  <span className="text-4xl block mb-2">📦</span>
                  <p className="font-medium">Noch keine Bestellungen vorhanden.</p>
                </div>
              )}
            </section>
          </div>
        </div>
      </div>

      {/* --- DETAIL MODAL (REIN INFORMATIV) --- */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-6 border-b flex justify-between items-center bg-gray-50">
              <div>
                <h2 className="text-xl font-bold text-gray-800">Bestellung #{selectedOrder.id}</h2>
                <p className="text-xs text-gray-500">{new Date(selectedOrder.erstelltAm).toLocaleString("de-DE")}</p>
              </div>
              <button onClick={() => setSelectedOrder(null)} className="text-3xl text-gray-300 hover:text-gray-600 transition-colors">×</button>
            </div>
            
            <div className="p-6">
              <div className="space-y-3 mb-8">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Positionen</p>
                {selectedOrder.positionen?.map((pos, idx) => (
                  <div key={idx} className="flex justify-between items-center text-sm bg-gray-50 p-3 rounded-xl border border-gray-100">
                    <span className="font-semibold text-gray-700">{pos.software.name} <span className="text-gray-400 font-normal">x{pos.menge}</span></span>
                    <span className="font-bold text-gray-900">{(pos.einzelpreis ?? 0).toFixed(2)} €</span>
                  </div>
                ))}
              </div>

              <div className="bg-blue-600 rounded-2xl p-5 text-white shadow-lg shadow-blue-200">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-xs font-bold text-blue-200 uppercase">Status</p>
                    <p className="font-bold text-lg">{selectedOrder.status}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-bold text-blue-200 uppercase">Gesamtbetrag</p>
                    <p className="text-2xl font-black">{(selectedOrder.gesamtpreis ?? 0).toFixed(2)} €</p>
                  </div>
                </div>
              </div>

              <button 
                onClick={() => setSelectedOrder(null)}
                className="w-full mt-8 py-4 bg-gray-900 text-white rounded-2xl font-bold hover:bg-black transition-all active:scale-95 shadow-xl shadow-gray-200"
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