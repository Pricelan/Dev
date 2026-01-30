"use client";
import React, { useEffect, useState } from "react";
import { Hersteller } from '@/types/hersteller';
import Link from 'next/link';

export default function HerstellerManagementSeite() {
  const [hersteller, setHersteller] = useState<Hersteller[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    webseite: "",
    adresse: ""
  });

  const API_BASE = "http://localhost:8080/api/hersteller";

  const fetchHersteller = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/all`);
      if (!res.ok) throw new Error("Fehler beim Laden");
      const data = await res.json();
      setHersteller(data);
    } catch (err) {
      console.error("Fetch-Fehler:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHersteller();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch(API_BASE, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setFormData({ name: "", email: "", webseite: "", adresse: "" });
        await fetchHersteller();
      } else {
        const errorData = await res.json();
        alert("Fehler: " + (errorData.message || "Unbekannter Fehler"));
      }
    } catch {
      alert("Netzwerkfehler.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Möchtest du diesen Partner wirklich löschen?")) return;
    try {
      const res = await fetch(`${API_BASE}/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (res.ok) fetchHersteller();
      else alert("Löschen fehlgeschlagen (evtl. noch Software verknüpft).");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen py-12 px-4 space-y-8">
      
      {/* HEADER AREA */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <Link href="/admin" className="text-blue-600 font-black text-[10px] uppercase tracking-[0.2em] mb-2 block hover:underline">
            ← Dashboard
          </Link>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Partner-Management</h1>
          <p className="text-slate-500 text-sm font-medium">{hersteller.length} aktive Herstellerbeziehungen</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* TABELLE - Nimmt 8 von 12 Spalten ein */}
        <div className="lg:col-span-8 bg-white/70 backdrop-blur-md border border-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.04)] overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Hersteller</th>
                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Kontakt & Website</th>
                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Aktion</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {!loading && hersteller.map((h) => (
                <tr key={h.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-8 py-6">
                    <div className="flex flex-col">
                      <span className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{h.name}</span>
                      <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1">Partner ID #{h.id}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex flex-col text-sm">
                      <span className="text-slate-700 font-medium">{h.email}</span>
                      <a href={h.webseite} target="_blank" className="text-blue-500 text-xs hover:underline decoration-2 underline-offset-4">
                        {h.webseite?.replace("https://", "") || "Keine Website"}
                      </a>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <button 
                      onClick={() => handleDelete(h.id)}
                      className="bg-red-50 text-red-500 p-3 rounded-xl hover:bg-red-500 hover:text-white transition-all active:scale-90 border border-red-100"
                      title="Partner löschen"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {loading && <div className="p-20 text-center font-black text-slate-300 uppercase tracking-[0.3em] text-[10px] animate-pulse">Synchronisiere...</div>}
        </div>

        {/* FORMULAR - Nimmt 4 von 12 Spalten ein */}
        <div className="lg:col-span-4 sticky top-8">
          <div className="bg-slate-900 p-8 rounded-[2.5rem] shadow-2xl shadow-slate-200 text-white">
            <h2 className="text-xl font-black mb-2 tracking-tight">Neuer Partner</h2>
            <p className="text-slate-400 text-xs font-medium mb-8 uppercase tracking-widest">Netzwerk erweitern</p>
            
            <form onSubmit={handleCreate} className="space-y-5">
              {[
                { label: "Name", key: "name", type: "text" },
                { label: "E-Mail", key: "email", type: "email" },
                { label: "Website", key: "webseite", type: "text" },
              ].map((f) => (
                <div key={f.key} className="space-y-2">
                  <label className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em] ml-2">{f.label}</label>
                  <input
                    type={f.type}
                    className="w-full p-4 bg-slate-800 border border-slate-700 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all text-sm font-bold text-white placeholder:text-slate-600"
                    value={formData[f.key as keyof typeof formData]}
                    onChange={(e) => setFormData({...formData, [f.key]: e.target.value})}
                    required={f.key !== 'webseite'}
                    placeholder={`${f.label}...`}
                  />
                </div>
              ))}
              
              <div className="space-y-2">
                <label className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em] ml-2">Anschrift</label>
                <textarea
                  className="w-full p-4 bg-slate-800 border border-slate-700 rounded-2xl focus:border-blue-500 outline-none transition-all h-28 resize-none text-sm font-medium text-slate-300"
                  value={formData.adresse}
                  onChange={(e) => setFormData({...formData, adresse: e.target.value})}
                  required
                  placeholder="Straße, Ort, PLZ..."
                />
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting}
                className={`w-full py-5 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] transition-all shadow-xl active:scale-95 ${
                  isSubmitting ? "bg-slate-700 cursor-not-allowed" : "bg-blue-600 hover:bg-white hover:text-blue-600 shadow-blue-900/20"
                }`}
              >
                {isSubmitting ? "Verarbeite..." : "Partner registrieren"}
              </button>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
}