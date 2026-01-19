"use client";

import { useEffect, useState } from "react";
import { getGastToken } from "@/lib/gastToken";
import { Warenkorb } from "@/types/warenkorb";
import { useRouter } from "next/navigation";
import { useKunde } from "@/context/kundeContext";

export default function WarenkorbPage() {
  const { kunde } = useKunde();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [warenkorb, setWarenkorb] = useState<Warenkorb>({
    warenkorbId: 0,
    gesamtmenge: 0,
    gesamtpreis: 0,
    positionen: []
  });

  const gesamtpreis = warenkorb?.gesamtpreis ?? 0;

  // Hilfsfunktion zum Laden des Warenkorbs (damit wir sie wiederverwenden können)
  const fetchWarenkorb = () => {
    const token = getGastToken();
    fetch(`http://localhost:8080/api/warenkorb?gastToken=${token}`)
      .then(res => res.json())
      .then(data => {
        setWarenkorb(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Fehler beim Laden:", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchWarenkorb();
  }, []);

  // Funktionen MÜSSEN innerhalb der WarenkorbPage Komponente bleiben
  function removePosition(positionId: number) {
    const token = getGastToken();
    fetch(`http://localhost:8080/api/warenkorb/position/${positionId}?gastToken=${token}`, {
      method: "DELETE",
    })
    .then(() => {
      // Besser: Warenkorb neu vom Server laden, damit Preis & Menge stimmen
      fetchWarenkorb();
    });
  }

  async function checkout() {
    const token = getGastToken();
    let body;

    if (kunde) {
      body = { gastToken: token, kundeId: kunde.id };
    } else {
      const gastData = JSON.parse(localStorage.getItem("gastCheckout") || "{}");
      body = {
        gastToken: token,
        ...gastData // Spread-Operator übernimmt alle Felder (vorname, nachname, etc.)
      };
    }

    try {
      const res = await fetch("http://localhost:8080/api/checkout/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", 
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const text = await res.text();
        alert("Checkout fehlgeschlagen: " + text);
        return;
      }

      const bestellung = await res.json();
      router.push("/checkout/erfolgreich?orderId=" + bestellung.id);
    } catch (err) {
      console.error(err);
      alert("Backend nicht erreichbar");
    }
  }

  // --- RENDERING ---
  if (loading) return <div className="p-10 text-center">Lade Warenkorb...</div>;
  
  if (!warenkorb || warenkorb.positionen.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold">Dein Warenkorb ist leer.</h1>
        <button onClick={() => router.push("/")} className="mt-4 text-blue-500 underline">
          Zurück zum Shop
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Warenkorb</h1>

        <div className="space-y-4">
          {warenkorb.positionen.map(pos => (
            <div key={pos.itemId} className="bg-white rounded-lg border p-4 flex justify-between items-center shadow-sm">
              <div>
                <p className="font-semibold text-lg">{pos.software.name}</p>
                <p className="text-sm text-gray-500">Menge: {pos.menge}</p>
              </div>
              <div className="text-right">
                <p className="font-bold">{(pos.software.preis * pos.menge).toFixed(2)} €</p>
                <button onClick={() => removePosition(pos.itemId)} className="text-sm text-red-500 hover:text-red-700 mt-1">
                  Entfernen
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 bg-white border rounded-lg p-6 shadow-md">
          <div className="flex justify-between mb-6">
            <span className="text-xl font-semibold">Gesamtsumme</span>
            <span className="text-xl font-bold text-green-700">{gesamtpreis.toFixed(2)} €</span>
          </div>

          <button
            onClick={() => kunde ? checkout() : router.push("/gastcheckout")}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-colors"
          >
            {kunde ? "Kostenpflichtig bestellen" : "Weiter zum Gast-Checkout"}
          </button>
        </div>
      </div>
    </div>
  );
}