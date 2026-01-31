"use client";

import { useEffect, useState } from "react";
import { getGastToken } from "@/lib/gastToken";
import { Warenkorb } from "@/types/warenkorb";
import { CheckoutBody } from "@/types/checkoutBody";
import { useRouter } from "next/navigation";
import { useKunde } from "@/context/kundeContext";
import Link from "next/link";
import { apiFetch } from "@/lib/api";

// Hauptkomponente für die Warenkorb-Seite
export default function WarenkorbPage() {
  const { kunde, loading: kundeLoading } = useKunde();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  // Zustand für die ausgewählte Zahlungsmethode
  const [zahlungsMethode, setZahlungsMethode] = useState("PAYPAL");
  // Zustand für den Warenkorb
  const [warenkorb, setWarenkorb] = useState<Warenkorb>({
    warenkorbId: 0,
    gesamtmenge: 0,
    gesamtpreis: 0,
    positionen: []
  });

  // Gesamtpreis des Warenkorbs
  const gesamtpreis = warenkorb?.gesamtpreis ?? 0;
  // Prüfen, ob der Gesamtpreis null ist
  const istKostenlos = gesamtpreis === 0;

  // Funktion zum Laden des Warenkorbs
  const fetchWarenkorb = () => {
    const token = getGastToken();
    apiFetch(`/warenkorb?gastToken=${token}`)
      .then(res => {
        if (!res) throw new Error("Nicht gefunden");
        return res;
      })
      .then(data => {
        setWarenkorb(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Fehler beim Laden:", err);
        setLoading(false);
      });
  };

  // useEffect Hook zum Laden des Warenkorbs beim Initialisieren
  useEffect(() => {
    fetchWarenkorb();
  }, []);

  // Funktion zum Entfernen einer Position aus dem Warenkorb
  function removePosition(positionId: number) {
    const token = getGastToken();
    apiFetch(`/warenkorb/position/${positionId}?gastToken=${token}`, {
      method: "DELETE",
    })
    .then(() => fetchWarenkorb());
  }

  // Funktion zum Checkout-Prozess
  async function checkout() {
    const token = getGastToken();
    let body: CheckoutBody;
    // Vorbereitung der Checkout-Daten basierend auf Kunde oder Gast
    if (kunde) {
      body = { 
        kundeId: kunde.id, 
        gastToken: token,
        zahlungsMethode: zahlungsMethode
      };
    } else {
      // Gast-Checkout
      const gastData = JSON.parse(localStorage.getItem("gastCheckout") || "{}");
      body = {
        kundeId: null,
        gastToken: token,
        ...gastData 
      };
    }

    try {
      const res = await apiFetch("/checkout/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const text = await res.text();
        alert("Checkout fehlgeschlagen: " + text);
        return;
      }
      // Erfolgreicher Checkout
      const bestellung = await res.json();
      router.push("/checkout/erfolgreich?orderId=" + bestellung.id);
    } catch (err) {
      console.error(err);
      alert("Backend nicht erreichbar");
    }
  }
  // Ladeanzeige während des Ladens
  if (loading || kundeLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-blue-600"></div>
      </div>
    );
  }
  // Anzeige, wenn der Warenkorb leer ist
  if (!warenkorb || warenkorb.positionen.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6 text-center">
        <div className="bg-white p-10 rounded-2xl shadow-sm border border-gray-100">
          <span className="text-5xl mb-4 block">🛒</span>
          <h1 className="text-2xl font-black text-slate-800 tracking-tight">Dein Warenkorb ist leer</h1>
          <p className="text-slate-500 mt-2 mb-6">Such dir erst ein paar tolle Software-Angebote aus!</p>
          <Link href="/" className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:scale-105 transition-transform inline-block">
            Zum Shop
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] py-12 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-10">
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Dein Warenkorb</h1>
          <span className="bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full uppercase">
            {warenkorb.positionen.length} Artikel
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {warenkorb.positionen.map((pos) => (
              <div key={pos.itemId} className="bg-white rounded-2xl border border-slate-200 p-5 flex items-center justify-between shadow-sm hover:shadow-md transition-shadow">
                <div className="flex flex-col">
                  <span className="text-lg font-bold text-slate-800">{pos.software.name}</span>
                  <span className="text-sm text-slate-500 font-medium">Menge: {pos.menge}</span>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-xl font-black text-slate-900">{(pos.software.preis * pos.menge).toFixed(2)} €</span>
                  <button 
                    onClick={() => removePosition(pos.itemId)}
                    className="mt-2 text-xs font-bold text-red-500 hover:text-red-700 transition-colors py-1 px-2 hover:bg-red-50 rounded"
                  >
                    Entfernen
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xl sticky top-6">
              <h2 className="text-lg font-bold text-slate-900 mb-6 border-b pb-4">Bestellübersicht</h2>
              
              {/*/ Zahlungsoptionen nur anzeigen, wenn nicht kostenlos  */}
              {!istKostenlos && kunde && (
                <div className="mb-6 animate-in fade-in duration-500">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Bezahlmethode</label>
                  <select 
                    value={zahlungsMethode}
                    onChange={(e) => setZahlungsMethode(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="PAYPAL">PayPal</option>
                    <option value="KREDITKARTE">Kreditkarte</option>
                    <option value="VORKASSE">Vorkasse</option>
                  </select>
                </div>
              )}

              {istKostenlos && (
                 <div className="mb-6 p-4 bg-green-50 border border-green-100 rounded-xl text-green-700 text-xs font-bold flex items-center gap-2 shadow-sm animate-pulse">
                   <span>✨</span> Kostenlose Software - Keine Zahlung nötig
                 </div>
              )}

              <div className="flex justify-between items-center mb-8">
                <span className="text-slate-500 font-medium">Gesamtsumme</span>
                <span className="text-2xl font-black text-blue-600">
                    {istKostenlos ? "Gratis" : `${gesamtpreis.toFixed(2)} €`}
                </span>
              </div>

              <button
                onClick={() => (kunde ? checkout() : router.push("/gastcheckout"))}
                className={`w-full ${istKostenlos ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700'} text-white font-bold py-4 rounded-xl shadow-lg transition-all active:scale-[0.98] flex items-center justify-center gap-2`}
              >
                {istKostenlos 
                  ? "Kostenlos aktivieren" 
                  : (kunde ? "Jetzt bestellen" : "Weiter zum Gast-Checkout")}
                <span>→</span>
              </button>
              
              <p className="text-[10px] text-slate-400 text-center mt-4 uppercase font-bold tracking-tighter">
                Sichere SSL-Verschlüsselung
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}