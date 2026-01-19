"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { getGastToken } from "@/lib/gastToken";

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
  const [loading, setLoading] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function submit() {
  try {
    setLoading(true);
    const token = getGastToken();

    const payload = {
      gastToken: token,
      ...form 
    };

    const res = await fetch("http://localhost:8080/api/checkout/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include", // <--- Erlaubt dem Backend Kurt zu erkennen!
      body: JSON.stringify(payload)
    });
  
    if (!res.ok) {
      const errorMsg = await res.text();
      alert("Fehler bei der Bestellung: " + errorMsg);
      return;
    }

    const order = await res.json();
    
    // LocalStorage nach Erfolg setzen
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
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Gast-Checkout</h1>

      <div className="space-y-3">
        <input name="vorname" value={form.vorname} placeholder="Vorname" className="border p-2 w-full rounded" onChange={handleChange} />
        <input name="nachname" value={form.nachname} placeholder="Nachname" className="border p-2 w-full rounded" onChange={handleChange} />
        <input name="email" value={form.email} placeholder="E-Mail" className="border p-2 w-full rounded" onChange={handleChange} />
        <input name="strasse" value={form.strasse} placeholder="Straße" className="border p-2 w-full rounded" onChange={handleChange} />
        <input name="hausnummer" value={form.hausnummer} placeholder="Hausnummer" className="border p-2 w-full rounded" onChange={handleChange} />
        <input name="plz" value={form.plz} placeholder="PLZ" className="border p-2 w-full rounded" onChange={handleChange} />
        <input name="ort" value={form.ort} placeholder="Ort" className="border p-2 w-full rounded" onChange={handleChange} />
        <input name="telefonnummer" value={form.telefonnummer} placeholder="Telefonnummer" className="border p-2 w-full rounded" onChange={handleChange} />

        <button
          onClick={submit}
          disabled={loading}
          className="bg-green-600 text-white px-4 py-2 rounded w-full"
        >
          {loading ? "Bestelle..." : "Bestellung abschließen"}
        </button>
      </div>
    </div>
  );
}