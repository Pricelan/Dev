"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { getGastToken } from "@/lib/gastToken";
import { apiFetch } from "@/lib/api";

// Hauptkomponente für die Gast-Checkout-Seite
export default function GastCheckoutPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    vorname: "",
    nachname: "",
    email: "",
    strasse: "",
    hausnummer: "",
    plz: "",
    ort: "",
    telefonnummer: ""
  });

  // Zustand für die gewählte Zahlungsmethode
  const [zahlungsMethode, setZahlungsMethode] = useState("VORKASSE");
  // Zustand für den Ladezustand
  const [loading, setLoading] = useState(false);

  // Funktion zum Aktualisieren des Formularzustands
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  // Funktion zum Absenden der Bestellung
  async function submit() {
    try {
      setLoading(true);
      const token = getGastToken();

      // Vorbereitung der Nutzlast für die API
      const payload = {
        gastToken: token,
        zahlungsMethode: zahlungsMethode,
        ...form 
      };

      // API-Aufruf zum Erstellen der Bestellung
      const res = await apiFetch("/checkout/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      // Überprüfung der Antwort
      if (!res.ok) {
        const errorMsg = await res.text();
        alert("Fehler bei der Bestellung: " + errorMsg);
        return;
      }
      // Erfolgreiche Bestellung - Weiterleitung zur Erfolgsseite
      const order = await res.json();
      localStorage.setItem("gastCheckout", JSON.stringify(form));
      router.push(`/checkout/erfolgreich?orderId=${order.id}`);
    } catch (err) {
      console.error(err);
      alert("Netzwerkfehler.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-lg rounded-2xl my-10">
      <h1 className="text-2xl font-black mb-6 text-slate-900 uppercase tracking-tight">Gast-Checkout</h1>

      {/* Adress-Sektion */}
      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-3">
            <input name="vorname" value={form.vorname} placeholder="Vorname" className="border p-3 w-full rounded-xl bg-slate-50 outline-none focus:ring-2 focus:ring-blue-600 transition" onChange={handleChange} />
            <input name="nachname" value={form.nachname} placeholder="Nachname" className="border p-3 w-full rounded-xl bg-slate-50 outline-none focus:ring-2 focus:ring-blue-600 transition" onChange={handleChange} />
        </div>
        <input name="email" value={form.email} placeholder="E-Mail" className="border p-3 w-full rounded-xl bg-slate-50 outline-none focus:ring-2 focus:ring-blue-600 transition" onChange={handleChange} />
        
        <div className="grid grid-cols-3 gap-3">
            <input name="strasse" value={form.strasse} placeholder="Straße" className="col-span-2 border p-3 w-full rounded-xl bg-slate-50 outline-none focus:ring-2 focus:ring-blue-600 transition" onChange={handleChange} />
            <input name="hausnummer" value={form.hausnummer} placeholder="Nr." className="border p-3 w-full rounded-xl bg-slate-50 outline-none focus:ring-2 focus:ring-blue-600 transition" onChange={handleChange} />
        </div>

        <div className="grid grid-cols-3 gap-3">
            <input name="plz" value={form.plz} placeholder="PLZ" className="border p-3 w-full rounded-xl bg-slate-50 outline-none focus:ring-2 focus:ring-blue-600 transition" onChange={handleChange} />
            <input name="ort" value={form.ort} placeholder="Ort" className="col-span-2 border p-3 w-full rounded-xl bg-slate-50 outline-none focus:ring-2 focus:ring-blue-600 transition" onChange={handleChange} />
        </div>
        <input name="telefonnummer" value={form.telefonnummer} placeholder="Telefonnummer" className="border p-3 w-full rounded-xl bg-slate-50 outline-none focus:ring-2 focus:ring-blue-600 transition" onChange={handleChange} />
      </div>

      {/* ZAHLUNGSMETHODEN */}
      <div className="mt-6 p-4 bg-slate-900 rounded-2xl text-white">
          <label className="block text-[10px] font-black uppercase tracking-widest mb-2 opacity-50 text-blue-400">Bezahlmethode wählen:</label>
          <select 
            value={zahlungsMethode} 
            onChange={(e) => setZahlungsMethode(e.target.value)}
            className="w-full bg-slate-800 border-none p-3 rounded-xl font-bold outline-none text-sm appearance-none cursor-pointer hover:bg-slate-700 transition"
          >
            <option value="PAYPAL">💳 PayPal</option>
            <option value="KREDITKARTE">🛡️ Kreditkarte</option>
            <option value="LASTSCHRIFT">📝 Lastschrift (SEPA)</option>
            <option value="VORKASSE">🏦 Vorkasse (Überweisung)</option>
          </select>
      </div>

      <button
        onClick={submit}
        disabled={loading}
        className="mt-6 bg-blue-600 hover:bg-blue-500 text-white font-black py-5 rounded-2xl w-full uppercase tracking-widest text-sm transition-all shadow-xl active:scale-95 disabled:opacity-50"
      >
        {loading ? "Wird verarbeitet..." : "Kostenpflichtig bestellen"}
      </button>
    </div>
  );
}