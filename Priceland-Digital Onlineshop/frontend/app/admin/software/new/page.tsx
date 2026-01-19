"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Hersteller {
  id: number;
  name: string;
}


export default function NewSoftwareForm() {

  const [name, setName] = useState("");
  const [version, setVersion] = useState("");
  const [preis, setPreis] = useState("");
  const [downloadLink, setDownloadLink] = useState("");
  const [beschreibung, setBeschreibung] = useState("");
  const [herstellerId, setHerstellerId] = useState<number | null>(null);
  const [herstellerListe, setHerstellerListe] = useState<Hersteller[]>([]);
  const [kategorieListe, setKategorieListe] = useState<string>("SOFTWARE");
  const [typ, setTyp] = useState("LIZENZ");
 

useEffect(() => {
  fetch("http://localhost:8080/api/admin/hersteller", {
    credentials: "include"
  })
    .then(res => {
      if (!res.ok) throw new Error("Nicht eingeloggt");
      return res.json();
    })
    .then(data => {
      if (Array.isArray(data)) {
        setHerstellerListe(data);
      } else if (Array.isArray(data.content)) {
        setHerstellerListe(data.content);
      } else {
        throw new Error("Unerwartete Response");
      }
    });
}, []);

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!herstellerId || isNaN(Number(herstellerId))) {
    alert("Bitte einen Hersteller auswählen");
    return;
  }

  const body = {
    name,
    version,
    preis: Number(preis) || 0,
    downloadLink: downloadLink || "",
    softwareBeschreibung: beschreibung || "",
    herstellerId: Number(herstellerId),
    kategorieListe: kategorieListe,
    typ: typ,
  };
  console.log("HERSTELLER ID", herstellerId);
  console.log("SEND JSON", body);

  const res = await fetch("http://localhost:8080/api/admin/software", {
  method: "POST",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
});

  const text = await res.text();
  console.log("SERVER RESPONSE:", text, res.status);

  if (!res.ok) {
    alert("Fehler beim Speichern:\n\n" + text);
    return;
  }

  window.location.href = "/admin/software";
};

  return (
    <div className="p-8 bg-gray-50 min-h-screen flex justify-center">
      <form onSubmit={handleSubmit} className="bg-white p-8 shadow-xl rounded-2xl max-w-3xl w-full border border-gray-100">
        
        <Link href="/admin" className="text-blue-600 hover:underline mb-4 inline-block text-sm font-medium">
          ← Zurück zum Dashboard
        </Link>
        
        <h2 className="text-3xl font-extrabold mb-8 text-gray-900">Neue Software anlegen</h2>

        {/* Erste Zeile: Typen */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1">Software Typ (System)</label>
            <select value={typ} onChange={e => setTyp(e.target.value)} className="w-full border-2 border-gray-200 p-3 rounded-xl focus:border-blue-500 outline-none transition">
              <option value="LIZENZ">Lizenz Software</option>
              <option value="SPIEL">Computer Spiel</option>
              <option value="KOSTENLOS">Software Kostenlos</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1">Shop Kategorie</label>
            <select value={kategorieListe} onChange={e => setKategorieListe(e.target.value)} className="w-full border-2 border-gray-200 p-3 rounded-xl focus:border-blue-500 outline-none transition">
              <option value="SOFTWARE">Standard Software</option>
              <option value="GAMES">Spiele</option>
              <option value="FREEWARE">Freeware</option>
            </select>
          </div>
        </div>

        {/* Zweite Zeile: Name & Version */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <input placeholder="Name der Software" value={name} onChange={e => setName(e.target.value)} className="w-full border-2 border-gray-200 p-3 rounded-xl focus:border-blue-500 outline-none transition" required />
          <input placeholder="Version (z.B. v1.0)" value={version} onChange={e => setVersion(e.target.value)} className="w-full border-2 border-gray-200 p-3 rounded-xl focus:border-blue-500 outline-none transition" required />
        </div>

        {/* Dritte Zeile: Preis & Hersteller */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <input type="number" step="0.01" placeholder="Preis (€)" value={preis} onChange={e => setPreis(e.target.value)} className="w-full border-2 border-gray-200 p-3 rounded-xl focus:border-blue-500 outline-none transition" />
          <select value={herstellerId ?? ""} onChange={e => setHerstellerId(Number(e.target.value))} className="w-full border-2 border-gray-200 p-3 rounded-xl focus:border-blue-500 outline-none transition" required>
            <option value="">Hersteller wählen...</option>
            {herstellerListe.map(h => <option key={h.id} value={h.id}>{h.name}</option>)}
          </select>
        </div>

        {/* Vierte Zeile: Download (Optional) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="relative">
            <input type="url" placeholder="Download Link (Optional)" value={downloadLink} onChange={e => setDownloadLink(e.target.value)} className="w-full border-2 border-gray-100 p-3 rounded-xl bg-gray-50 focus:border-blue-400 outline-none transition" />
            <span className="absolute right-3 top-3 text-xs text-gray-400">Optional</span>
          </div>
        </div>

        {/* Beschreibung */}
        <textarea placeholder="Beschreibung der Software..." value={beschreibung} onChange={e => setBeschreibung(e.target.value)} className="w-full border-2 border-gray-200 p-3 rounded-xl h-32 mb-8 focus:border-blue-500 outline-none transition" />

        <button className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-700 shadow-lg shadow-blue-200 active:scale-[0.98] transition-all">
          Software Speichern
        </button>
      </form>
    </div>
  );
}