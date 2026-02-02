"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Hersteller } from "@/types/hersteller";  
import { apiFetch } from "@/lib/api";


// Hauptkomponente für das Formular zur Erstellung neuer Software
export default function NewSoftwareForm() {
  const [name, setName] = useState("");
  const [version, setVersion] = useState("");
  const [preis, setPreis] = useState("");
  const [downloadLink, setDownloadLink] = useState("");
  const [beschreibung, setBeschreibung] = useState("");
  const [herstellerId, setHerstellerId] = useState<number | null>(null);
  const [herstellerListe, setHerstellerListe] = useState<Hersteller[]>([]);
  const [kategorie, setKategorie] = useState<string>("LIZENZIERTE_SOFTWARE");

  // useEffect Hook zum Laden der Herstellerliste beim Initialisieren
  useEffect(() => {
    apiFetch("/hersteller/all")
      .then(data => {
        if (Array.isArray(data)) setHerstellerListe(data);
      })
      .catch(err => console.error("Hersteller-Fehler:", err));
  }, []);

  // Funktion zum Handhaben des Formular-Submits
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!herstellerId) return alert("Bitte einen Hersteller auswählen");

    // Vorbereitung der Daten für die API  
    const body = {
      name,
      version,
      preis: Number(preis) || 0,
      downloadLink: downloadLink || "",
      softwareBeschreibung: beschreibung || "",
      herstellerId: Number(herstellerId),
      kategorie: kategorie,
      typ: kategorie
    };
   // API-Aufruf zum Erstellen der neuen Software
    try {
      // apiFetch wirft Fehler bei nicht-ok Status
      await apiFetch("/admin/software", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      // Erfolgsmeldung und Weiterleitung zur Software-Übersicht
      alert("Software erfolgreich angelegt!");
      window.location.href = "/admin/software";
    } catch (err: unknown) {
      // Fehlerbehandlung
      console.error("Speicher-Fehler:", err);
      let message = "Unbekannter Fehler";
      if (err instanceof Error) {
        message = err.message;
      }
      alert("Fehler beim Speichern: " + message);
    } 
  };

  return (
    <div className="min-h-screen py-12 px-4 flex justify-center items-start">
      <main className="max-w-4xl w-full relative">
        
        {/* Hintergrund-Deko */}
        <div className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-blue-200/20 rounded-full blur-3xl -z-10"></div>
        
        <form onSubmit={handleSubmit} className="bg-white/70 backdrop-blur-2xl border border-white p-10 md:p-16 rounded-[3rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)]">
          
          <header className="mb-12">
            <Link href="/admin/software" className="text-blue-600 font-black text-[10px] uppercase tracking-[0.3em] mb-4 inline-block hover:underline">
              ← Zurück zur Übersicht
            </Link>
            <h2 className="text-4xl font-black text-slate-900 tracking-tight">Software anlegen</h2>
            <p className="text-slate-500 font-medium mt-2">Fülle die Details aus, um ein neues Produkt zu veröffentlichen.</p>
          </header>

          <div className="space-y-8">
            
            {/* Sektion 1: Kategorie */}
            <div className="bg-slate-50/50 p-6 rounded-4xl border border-slate-100">
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 ml-2">Kategorie</label>
              <select 
                value={kategorie} 
                onChange={e => setKategorie(e.target.value)} 
                className="w-full bg-white border border-slate-200 p-4 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-bold text-slate-700 appearance-none"
              >
                <option value="LIZENZIERTE_SOFTWARE">💻 Lizenzierte Software</option>
                <option value="COMPUTER_SPIELE">🎮 Computerspiel</option>
                <option value="KOSTENLOSE_SOFTWARE">🎁 Kostenlose Software</option>
              </select>
            </div>

            {/* Sektion 2: Stammdaten */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Produktname</label>
                <input 
                  placeholder="z.B. Microsoft Office" 
                  value={name} onChange={e => setName(e.target.value)} 
                  className="w-full bg-white border border-slate-200 p-4 rounded-2xl focus:border-blue-500 outline-none transition-all" required 
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Version</label>
                <input 
                  placeholder="z.B. 2024 (v1.2)" 
                  value={version} onChange={e => setVersion(e.target.value)} 
                  className="w-full bg-white border border-slate-200 p-4 rounded-2xl focus:border-blue-500 outline-none transition-all" required 
                />
              </div>
            </div>

            {/* Sektion 3: Preis & Hersteller */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Listenpreis (€)</label>
                <input 
                  type="number" step="0.01" placeholder="0.00" 
                  value={preis} onChange={e => setPreis(e.target.value)} 
                  className="w-full bg-white border border-slate-200 p-4 rounded-2xl focus:border-blue-500 outline-none transition-all font-black text-blue-600" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Hersteller</label>
                <select 
                  value={herstellerId ?? ""} 
                  onChange={e => setHerstellerId(Number(e.target.value))} 
                  className="w-full bg-white border border-slate-200 p-4 rounded-2xl focus:border-blue-500 outline-none transition-all font-bold" 
                  required
                >
                  <option value="">Wählen...</option>
                  {herstellerListe.map(h => <option key={h.id} value={h.id}>{h.name}</option>)}
                </select>
              </div>
            </div>

            {/* Sektion 4: Links & Beschreibung */}
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Download-URL (Optional)</label>
                <input 
                  type="url" placeholder="https://download.priceland.com/..." 
                  value={downloadLink} onChange={e => setDownloadLink(e.target.value)} 
                  className="w-full bg-slate-50 border border-slate-200 p-4 rounded-2xl focus:bg-white focus:border-blue-500 outline-none transition-all text-sm font-mono" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Beschreibung</label>
                <textarea 
                  placeholder="Detaillierte Produktinformationen..." 
                  value={beschreibung} onChange={e => setBeschreibung(e.target.value)} 
                  className="w-full bg-white border border-slate-200 p-4 rounded-4xl h-40 focus:border-blue-500 outline-none transition-all resize-none" 
                />
              </div>
            </div>

            <button className="w-full bg-slate-900 text-white py-6 rounded-4xl font-black text-sm uppercase tracking-[0.2em] hover:bg-blue-600 transition-all shadow-2xl shadow-slate-200 active:scale-[0.98] mt-4">
              Produkt veröffentlichen
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}