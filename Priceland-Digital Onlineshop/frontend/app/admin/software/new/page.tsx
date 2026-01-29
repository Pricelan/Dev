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
  const [kategorie, setKategorie] = useState<string>("LIZENZIERTE_SOFTWARE");

  useEffect(() => {
    fetch("http://localhost:8080/api/hersteller/all", {
      credentials: "include"
    })
      .then(res => {
        if (!res.ok) throw new Error("Fehler beim Laden der Hersteller");
        return res.json();
      })
      .then(data => {
        if (Array.isArray(data)) setHerstellerListe(data);
      })
      .catch(err => console.error("Hersteller-Fehler:", err));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!herstellerId) {
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
      kategorie: kategorie, 
      typ: kategorie === "COMPUTER_SPIELE" ? "COMPUTER_SPIELE" : 
       kategorie === "KOSTENLOSE_SOFTWARE" ? "KOSTENLOSE_SOFTWARE" : 
       "LIZENZIERTE_SOFTWARE" 
};


    try {
      const res = await fetch("http://localhost:8080/api/admin/software", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const text = await res.text();
      if (!res.ok) {
        alert("Fehler beim Speichern:\n\n" + text);
        return;
      }

      window.location.href = "/admin/software";
    } catch {
      alert("Netzwerkfehler zum Backend.");
    }
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen flex justify-center">
      <form onSubmit={handleSubmit} className="bg-white p-8 shadow-xl rounded-2xl max-w-3xl w-full border border-gray-100">
        
        <Link href="/admin" className="text-blue-600 hover:underline mb-4 inline-block text-sm font-medium">
          ← Zurück zum Dashboard
        </Link>
        
        <h2 className="text-3xl font-extrabold mb-8 text-gray-900">Neue Software anlegen</h2>

        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-600 mb-1">Kategorie wählen</label>
          <select 
            value={kategorie} 
            onChange={e => setKategorie(e.target.value)} 
            className="w-full border-2 border-gray-200 p-3 rounded-xl focus:border-blue-500 outline-none transition bg-white"
          >
            
            <option value="LIZENZIERTE_SOFTWARE">Software (Lizenz)</option>
            <option value="COMPUTER_SPIELE">Computerspiele</option>
            <option value="KOSTENLOSE_SOFTWARE">Kostenlose Software</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <input placeholder="Name der Software" value={name} onChange={e => setName(e.target.value)} className="w-full border-2 border-gray-200 p-3 rounded-xl focus:border-blue-500 outline-none transition" required />
          <input placeholder="Version (z.B. v1.0)" value={version} onChange={e => setVersion(e.target.value)} className="w-full border-2 border-gray-200 p-3 rounded-xl focus:border-blue-500 outline-none transition" required />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <input type="number" step="0.01" placeholder="Preis (€)" value={preis} onChange={e => setPreis(e.target.value)} className="w-full border-2 border-gray-200 p-3 rounded-xl focus:border-blue-500 outline-none transition" />
          <select 
            value={herstellerId ?? ""} 
            onChange={e => setHerstellerId(Number(e.target.value))} 
            className="w-full border-2 border-gray-200 p-3 rounded-xl focus:border-blue-500 outline-none transition" 
            required
          >
            <option value="">Hersteller wählen...</option>
            {herstellerListe.map(h => <option key={h.id} value={h.id}>{h.name}</option>)}
          </select>
        </div>

        <div className="mb-6">
          <input type="url" placeholder="Download Link (Optional)" value={downloadLink} onChange={e => setDownloadLink(e.target.value)} className="w-full border-2 border-gray-100 p-3 rounded-xl bg-gray-50 focus:border-blue-400 outline-none transition" />
        </div>

        <textarea placeholder="Beschreibung der Software..." value={beschreibung} onChange={e => setBeschreibung(e.target.value)} className="w-full border-2 border-gray-200 p-3 rounded-xl h-32 mb-8 focus:border-blue-500 outline-none transition" />

        <button className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-700 shadow-lg transition-all">
          Software Speichern
        </button>
      </form>
    </div>
  );
}