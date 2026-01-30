"use client";

import React, { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";
import Link from "next/link";

export default function EditSoftware({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = React.use(params);
  const id = resolvedParams.id;

  const [name, setName] = useState("");
  const [version, setVersion] = useState("");
  const [preis, setPreis] = useState("");
  const [beschreibung, setBeschreibung] = useState("");
  const [downloadLink, setDownloadLink] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiFetch(`/admin/software/details/${id}`)
      .then(data => {
        setName(data.name || "");
        setVersion(data.version || "");
        setPreis(data.preis || "");
        setBeschreibung(data.softwareBeschreibung || "");
        setDownloadLink(data.downloadLink || "");
        setLoading(false);
      })
      .catch(err => {
        console.error("Ladefehler:", err);
        setLoading(false);
      });
  }, [id]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const updateData = {
      name,
      version,
      preis: Number(preis),
      softwareBeschreibung: beschreibung,
      downloadLink
    };

    const res = await fetch(`http://localhost:8080/api/admin/software/details/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updateData),
      credentials: "include"
    });

    if (res.ok) {
      window.location.href = "/admin/software";
    } else {
      const errorText = await res.text();
      alert("Fehler beim Speichern: " + errorText);
    }
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center py-24">
      <div className="animate-spin rounded-2xl h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
      <p className="mt-4 font-black text-slate-400 uppercase tracking-widest text-[10px]">Daten werden geladen...</p>
    </div>
  );

  return (
    <div className="min-h-screen py-12 px-4 flex justify-center items-start">
      <main className="max-w-4xl w-full relative">
        
        {/* Hintergrund-Deko analog zur "Neu"-Seite */}
        <div className="absolute top-[-5%] left-[-5%] w-72 h-72 bg-blue-100/30 rounded-full blur-3xl -z-10"></div>
        
        <form onSubmit={handleSave} className="bg-white/70 backdrop-blur-2xl border border-white p-10 md:p-16 rounded-[3rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)]">
          
          <header className="mb-12">
            <Link href="/admin/software" className="text-blue-600 font-black text-[10px] uppercase tracking-[0.3em] mb-4 inline-block hover:underline">
              ← Zurück zur Liste
            </Link>
            <div className="flex items-center gap-4">
               <h2 className="text-4xl font-black text-slate-900 tracking-tight">Software bearbeiten</h2>
               <span className="bg-slate-900 text-white text-[10px] font-black px-3 py-1 rounded-lg uppercase self-center mt-1">ID: {id}</span>
            </div>
            <p className="text-slate-500 font-medium mt-2">Aktualisiere die Stammdaten und Preise für dieses Produkt.</p>
          </header>

          <div className="space-y-8">
            
            {/* Produktname & Version */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Produktname</label>
                <input 
                  value={name} 
                  onChange={e => setName(e.target.value)} 
                  className="w-full bg-white border border-slate-200 p-4 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 outline-none transition-all font-bold text-slate-800"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Version</label>
                <input 
                  value={version} 
                  onChange={e => setVersion(e.target.value)} 
                  className="w-full bg-white border border-slate-200 p-4 rounded-2xl focus:border-blue-500 outline-none transition-all font-medium text-slate-600"
                />
              </div>
            </div>

            {/* Preis & Link */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Listenpreis (€)</label>
                <input 
                  type="number"
                  step="0.01"
                  value={preis} 
                  onChange={e => setPreis(e.target.value)} 
                  className="w-full bg-white border border-slate-200 p-4 rounded-2xl focus:border-blue-500 outline-none transition-all font-black text-blue-600 text-xl"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Download-URL</label>
                <input 
                  value={downloadLink} 
                  onChange={e => setDownloadLink(e.target.value)} 
                  className="w-full bg-slate-50 border border-slate-200 p-4 rounded-2xl focus:bg-white focus:border-blue-500 outline-none transition-all text-sm font-mono text-slate-500"
                />
              </div>
            </div>

            {/* Beschreibung */}
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Softwarebeschreibung</label>
              <textarea 
                value={beschreibung} 
                onChange={e => setBeschreibung(e.target.value)} 
                className="w-full bg-white border border-slate-200 p-4 rounded-4xl h-48 focus:border-blue-500 outline-none transition-all resize-none text-slate-700 leading-relaxed"
              />
            </div>

            {/* Buttons */}
            <div className="flex flex-col md:flex-row gap-4 pt-4">
              <button 
                type="submit"
                className="flex-2 bg-slate-900 text-white py-6 rounded-4xl font-black text-sm uppercase tracking-[0.2em] hover:bg-blue-600 transition-all shadow-2xl shadow-slate-200 active:scale-[0.98]"
              >
                Änderungen speichern
              </button>
              
              <Link 
                href="/admin/software"
                className="flex-1 bg-white border border-slate-200 text-slate-400 py-6 rounded-4xl font-black text-sm uppercase tracking-[0.2em] text-center hover:bg-slate-50 transition-all"
              >
                Abbrechen
              </Link>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
}