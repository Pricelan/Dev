"use client";

import React, { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";
import Link from "next/link";

export default function EditSoftware({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = React.use(params);
  const id = resolvedParams.id;

  // States für alle Felder
  const [name, setName] = useState("");
  const [version, setVersion] = useState("");
  const [preis, setPreis] = useState("");
  const [beschreibung, setBeschreibung] = useState("");
  const [downloadLink, setDownloadLink] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Lädt alle Details vom Backend
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
    
    // Das Objekt muss die Keys enthalten, die dein AdminService im Backend erwartet
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
      alert("Änderungen erfolgreich gespeichert!");
      window.location.href = "/admin/software";
    } else {
      const errorText = await res.text();
      alert("Fehler beim Speichern: " + errorText);
    }
  };

  if (loading) return <p className="p-10">Lade Softwaredaten...</p>;

  return (
    <main className="p-10 bg-gray-50 min-h-screen">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-md">
        <Link href="/admin/software" className="text-blue-600 hover:underline text-sm">
          ← Zurück zur Liste
        </Link>
        
        <h1 className="text-2xl font-bold mt-4 mb-6">Software bearbeiten (ID: {id})</h1>

        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Produktname</label>
            <input 
              value={name} 
              onChange={e => setName(e.target.value)} 
              className="w-full border p-2 rounded mt-1 focus:ring-2 focus:ring-blue-500 outline-none" 
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Version</label>
              <input 
                value={version} 
                onChange={e => setVersion(e.target.value)} 
                className="w-full border p-2 rounded mt-1" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Preis (€)</label>
              <input 
                type="number"
                step="0.01"
                value={preis} 
                onChange={e => setPreis(e.target.value)} 
                className="w-full border p-2 rounded mt-1" 
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Download Link</label>
            <input 
              value={downloadLink} 
              onChange={e => setDownloadLink(e.target.value)} 
              className="w-full border p-2 rounded mt-1" 
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Beschreibung</label>
            <textarea 
              value={beschreibung} 
              onChange={e => setBeschreibung(e.target.value)} 
              className="w-full border p-2 rounded mt-1 h-32"
            />
          </div>

          <button 
            type="submit"
            className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition-colors shadow-lg"
          >
            Änderungen speichern
          </button>
        </form>
      </div>
    </main>
  );
}