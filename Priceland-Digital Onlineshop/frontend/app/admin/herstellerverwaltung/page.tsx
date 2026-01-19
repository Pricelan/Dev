"use client";
import React, { useEffect, useState } from "react";
import { Hersteller } from '@/types/hersteller';
import Link from 'next/link';

export default function HerstellerManagementSeite() {
  const [hersteller, setHersteller] = useState<Hersteller[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    webseite: "",
    adresse: ""
  });

  const fetchHersteller = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/hersteller/all");
      const data = await res.json();
      setHersteller(data);
      setLoading(false);
    } catch (err) {
      console.error("Fehler:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadHersteller = async () => {
      await fetchHersteller();
    };
    loadHersteller();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("http://localhost:8080/api/admin/hersteller/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      setFormData({ name: "", email: "", webseite: "", adresse: "" });
      fetchHersteller();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-gray-900">Partner-Management</h1>
          <p className="text-gray-500">Verwalte deine Software-Hersteller und Lieferanten</p>
        </div>
        <Link href="/admin" className="bg-white px-4 py-2 rounded-xl shadow-sm border font-medium hover:bg-gray-50">
          ← Zurück zum Dashboard
        </Link>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LINKE SPALTE: Die Tabelle */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="p-4 font-bold text-gray-600 text-sm">Hersteller</th>
                  <th className="p-4 font-bold text-gray-600 text-sm">Kontakt</th>
                  <th className="p-4 font-bold text-gray-600 text-sm">Adresse</th>
                  <th className="p-4 font-bold text-gray-600 text-sm">Aktionen</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {hersteller.map((h) => (
                  <tr key={h.id} className="hover:bg-blue-50/30 transition-colors">
                    <td className="p-4">
                      <div className="font-bold text-gray-800">{h.name}</div>
                      <div className="text-xs text-blue-500">{h.webseite || "Keine Website"}</div>
                    </td>
                    <td className="p-4 text-sm text-gray-600">{h.email}</td>
                    <td className="p-4 text-sm text-gray-500">{h.adresse}</td>
                    <td className="p-4">
                      <button className="text-gray-400 hover:text-red-500 transition-colors">
                        🗑️
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {loading && <p className="p-10 text-center text-gray-400">Daten werden geladen...</p>}
          </div>
        </div>

        {/* RECHTE SPALTE: Das Formular */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-3xl shadow-lg border border-gray-100 sticky top-8">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <span className="bg-blue-600 text-white p-2 rounded-lg text-xs">NEW</span>
              Neuer Partner
            </h2>
            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-gray-400 uppercase ml-1">Name</label>
                <input
                  type="text"
                  className="w-full p-3 bg-gray-50 border-none rounded-xl mt-1 focus:ring-2 focus:ring-blue-500 outline-none"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-400 uppercase ml-1">E-Mail</label>
                <input
                  type="email"
                  className="w-full p-3 bg-gray-50 border-none rounded-xl mt-1 focus:ring-2 focus:ring-blue-500 outline-none"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required
                />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-400 uppercase ml-1">Website</label>
                <input
                  type="text"
                  className="w-full p-3 bg-gray-50 border-none rounded-xl mt-1 focus:ring-2 focus:ring-blue-500 outline-none"
                  value={formData.webseite}
                  onChange={(e) => setFormData({...formData, webseite: e.target.value})}
                />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-400 uppercase ml-1">Adresse</label>
                <textarea
                  className="w-full p-3 bg-gray-50 border-none rounded-xl mt-1 focus:ring-2 focus:ring-blue-500 outline-none h-24"
                  value={formData.adresse}
                  onChange={(e) => setFormData({...formData, adresse: e.target.value})}
                  required
                />
              </div>
              <button type="submit" className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all">
                HERSTELLER SPEICHERN
              </button>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
}