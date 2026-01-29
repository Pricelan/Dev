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

  // Basis-URL deines Herstellers-Controllers
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
        credentials: "include", // Wichtig für HttpSession
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setFormData({ name: "", email: "", webseite: "", adresse: "" });
        await fetchHersteller(); // Liste sofort aktualisieren
      } else {
        const errorData = await res.json();
        alert("Fehler beim Speichern: " + (errorData.message || "Unbekannter Fehler"));
      }
    } catch {
      alert("Netzwerkfehler - ist das Backend erreichbar?");
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

      if (res.ok) {
        fetchHersteller();
      } else {
        alert("Löschen fehlgeschlagen. Möglicherweise wird dieser Hersteller noch von einer Software referenziert.");
      }
    } catch (err) {
      console.error("Lösch-Fehler:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-gray-900">Partner-Management</h1>
          <p className="text-gray-500">Verwalte deine Software-Hersteller und Lieferanten</p>
        </div>
        <Link href="/admin" className="bg-white px-4 py-2 rounded-xl shadow-sm border font-medium hover:bg-gray-50 transition-all">
          ← Zurück zum Dashboard
        </Link>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* TABELLE */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="p-4 font-bold text-gray-600 text-sm">Hersteller</th>
                  <th className="p-4 font-bold text-gray-600 text-sm">Kontakt</th>
                  <th className="p-4 font-bold text-gray-600 text-sm">Adresse</th>
                  <th className="p-4 font-bold text-gray-600 text-sm text-center">Aktionen</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {!loading && hersteller.map((h) => (
                  <tr key={h.id} className="hover:bg-blue-50/30 transition-colors group">
                    <td className="p-4">
                      <div className="font-bold text-gray-800">{h.name}</div>
                      <a href={h.webseite} target="_blank" className="text-xs text-blue-500 hover:underline">
                        {h.webseite || "Keine Website"}
                      </a>
                    </td>
                    <td className="p-4 text-sm text-gray-600">{h.email}</td>
                    <td className="p-4 text-sm text-gray-500 max-w-[200px] truncate">{h.adresse}</td>
                    <td className="p-4 text-center">
                      <button 
                        onClick={() => handleDelete(h.id)}
                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                      >
                        🗑️
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {loading && <div className="p-20 text-center text-gray-400 animate-pulse">Daten werden geladen...</div>}
            {!loading && hersteller.length === 0 && (
              <div className="p-20 text-center text-gray-400">Keine Partner gefunden. Lege rechts einen neuen an!</div>
            )}
          </div>
        </div>

        {/* FORMULAR */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-3xl shadow-xl border border-gray-100 sticky top-8">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <span className="bg-blue-600 text-white px-2 py-1 rounded-md text-[10px] uppercase tracking-wider">Neu</span>
              Partner anlegen
            </h2>
            <form onSubmit={handleCreate} className="space-y-4">
              {[
                { label: "Name", key: "name", type: "text", req: true },
                { label: "E-Mail", key: "email", type: "email", req: true },
                { label: "Website", key: "webseite", type: "text", req: false },
              ].map((field) => (
                <div key={field.key}>
                  <label className="text-xs font-bold text-gray-400 uppercase ml-1">{field.label}</label>
                  <input
                    type={field.type}
                    className="w-full p-3 bg-gray-50 border-transparent border-2 rounded-xl mt-1 focus:bg-white focus:border-blue-500 outline-none transition-all"
                    value={formData[field.key as keyof typeof formData]}
                    onChange={(e) => setFormData({...formData, [field.key]: e.target.value})}
                    required={field.req}
                    placeholder={`${field.label} eingeben...`}
                  />
                </div>
              ))}
              <div>
                <label className="text-xs font-bold text-gray-400 uppercase ml-1">Adresse</label>
                <textarea
                  className="w-full p-3 bg-gray-50 border-transparent border-2 rounded-xl mt-1 focus:bg-white focus:border-blue-500 outline-none transition-all h-24 resize-none"
                  value={formData.adresse}
                  onChange={(e) => setFormData({...formData, adresse: e.target.value})}
                  required
                  placeholder="Straße, Hausnummer, PLZ Ort"
                />
              </div>
              <button 
                type="submit" 
                disabled={isSubmitting}
                className={`w-full py-4 rounded-2xl font-black shadow-lg transition-all ${
                  isSubmitting ? "bg-gray-300" : "bg-blue-600 text-white shadow-blue-100 hover:bg-blue-700 hover:-translate-y-1"
                }`}
              >
                {isSubmitting ? "WIRD GESPEICHERT..." : "PARTNER SPEICHERN"}
              </button>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
}