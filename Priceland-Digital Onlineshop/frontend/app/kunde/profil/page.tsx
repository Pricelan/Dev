"use client";
import { useEffect, useState } from "react";
import { useKunde } from "@/context/kundeContext";
import { Bestellung } from "@/types/bestellung";

export default function KundenProfil() {
  const { kunde } = useKunde();
  const [bestellungen, setBestellungen] = useState<Bestellung[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Bestellung | null>(null);
   const handlePayment = async (id: number) => {
  try {
    const res = await fetch(`http://localhost:8080/api/bestellungen/${id}/bezahlen`, {
      method: "POST",
      credentials: "include" // Wichtig für die Session!
    });

    if (res.ok) {
      alert("Bezahlung war erfolgreich!");
      // Modal schließen und Daten neu laden
      setSelectedOrder(null);
      window.location.reload(); 
    } else {
      const errorData = await res.json();
      alert("Fehler: " + (errorData.error || "Unbekannter Fehler"));
    }
  } catch (err) {
    console.error("Netzwerkfehler beim Bezahlen:", err);
    alert("Das Backend ist gerade nicht erreichbar.");
  }
};
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

  // Wenn noch kein Kunde da ist (Session lädt)
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
          <p className="text-gray-500">Willkommen zurück, {kunde.vorname}!</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Linke Spalte: Profil-Info */}
          <div className="md:col-span-1 space-y-6">
            <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold">
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
                  <p className="text-gray-700 mt-1">{kunde.strasse} {kunde.hausnummer}</p>
                  <p className="text-gray-700">{kunde.plz} {kunde.ort}</p>
                </div>
              </div>
              
              <button className="w-full mt-6 py-2 border border-blue-600 text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-colors">
                Daten bearbeiten
              </button>
            </section>
          </div>

          {/* Rechte Spalte: Bestellhistorie */}
          <div className="md:col-span-2">
            <section className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                <h3 className="font-bold text-xl text-gray-800">Meine Bestellungen</h3>
                <span className="bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full">
                  {bestellungen.length} Bestellungen
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
                        <th className="px-6 py-4 text-right">Aktion</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {bestellungen.map((b) => (
                        <tr key={b.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4 font-bold text-gray-700">#{b.id}</td>
                          <td className="px-6 py-4 text-gray-600 text-sm">
                            {new Date(b.erstelltAm).toLocaleDateString("de-DE")}
                          </td>
                          <td className="px-6 py-4">
                            <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase bg-blue-100 text-blue-700">
                              {b.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <button 
                              onClick={() => setSelectedOrder(b)}
                              className="text-blue-600 hover:underline font-medium text-sm"
                            >
                              Details
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
                  <p>Du hast noch keine Bestellungen getätigt.</p>
                </div>
              )}
            </section>
          </div>
        </div>
      </div>

      {/* --- DETAIL MODAL --- */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden">
            <div className="p-6 border-b flex justify-between items-center bg-gray-50">
              <h2 className="text-xl font-bold">Bestellung #{selectedOrder.id}</h2>
              <button onClick={() => setSelectedOrder(null)} className="text-2xl text-gray-400 hover:text-gray-600">×</button>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {selectedOrder.positionen?.map((pos, idx) => (
                  <div key={idx} className="flex justify-between border-b pb-2 text-sm">
                    <span>{pos.software.name} (x{pos.menge})</span>
                    {(pos.einzelpreis ?? 0).toFixed(2)} €
                  </div>
                ))}
              </div>
              <div className="flex justify-between items-center p-4 bg-gray-50 rounded-xl">
              <div>
                <p className="text-sm text-gray-500">Status</p>
                <p className="font-bold">{selectedOrder.status}</p>
              </div>
  
              {selectedOrder.status === "IN_BEARBEITUNG" && (
           <button 
            onClick={() => handlePayment(selectedOrder.id)}
           className="bg-green-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-green-700 transition"
          >
           💳 Jetzt bezahlen
          </button>
  )}
</div>
              <div className="mt-6 flex justify-between items-center font-bold text-lg">
                <span>Gesamtsumme:</span>
                <span className="text-blue-600">{(selectedOrder.gesamtpreis ?? 0).toFixed(2)} €</span>
              </div>
              <button 
                onClick={() => setSelectedOrder(null)}
                className="w-full mt-6 py-3 bg-gray-900 text-white rounded-xl font-bold hover:bg-black transition-colors"
              >
                Schließen
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

