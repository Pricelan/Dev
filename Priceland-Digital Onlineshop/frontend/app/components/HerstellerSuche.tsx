"use client";
import React, { useEffect, useState } from "react";
import { Hersteller } from '@/types/hersteller';
import Link from 'next/link';

export default function HerstellerSuche() {
  const [hersteller, setHersteller] = useState<Hersteller[]>([]);
  const [suchbegriff, setSuchbegriff] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8080/api/hersteller/all")
      .then((res) => res.json())
      .then((data) => {
        setHersteller(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fehler beim Laden:", err);
        setLoading(false);
      });
  }, []);

  // Filtert die Hersteller basierend auf der Eingabe
  const gefilterteHersteller = hersteller.filter((h) =>
    h.name.toLowerCase().includes(suchbegriff.toLowerCase())
  );

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-gray-800 flex items-center gap-2">
          <span className="text-blue-600">🏢</span> Hersteller-Suche
        </h3>
        {/* Link zur großen Verwaltungsseite */}
        <Link 
          href="/admin/herstellerverwaltung" 
          className="text-xs bg-gray-50 hover:bg-gray-100 text-gray-600 px-2 py-1 rounded-lg border transition-colors"
        >
          Verwalten →
        </Link>
      </div>
      
      <div className="relative">
        <input
          type="text"
          placeholder="Hersteller finden..."
          className="w-full p-3 bg-gray-50 border border-transparent rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
          value={suchbegriff}
          onChange={(e) => setSuchbegriff(e.target.value)}
        />
        {loading && (
          <div className="absolute right-3 top-3 animate-spin text-blue-500">
            🌀
          </div>
        )}
      </div>

      <div className="mt-3 space-y-2 max-h-64 overflow-y-auto custom-scrollbar">
        {suchbegriff.length === 0 ? (
          <p className="text-gray-400 text-[11px] text-center py-2 italic">
            Tippe einen Namen ein, um schnell zu suchen...
          </p>
        ) : gefilterteHersteller.length > 0 ? (
          gefilterteHersteller.map((h) => (
            <div 
              key={h.id} 
              className="flex justify-between items-center p-3 bg-gray-50 rounded-xl hover:bg-blue-50 group transition-all"
            >
              <div>
                <div className="font-bold text-gray-700 text-sm group-hover:text-blue-700">
                  {h.name}
                </div>
                <div className="text-[10px] text-gray-400">{h.email}</div>
              </div>
              <span className="text-[10px] bg-white px-2 py-1 rounded border text-gray-400 font-mono">
                ID {h.id}
              </span>
            </div>
          ))
        ) : (
          <p className="text-gray-400 text-sm py-2">Kein Hersteller gefunden.</p>
        )}
      </div>
    </div>
  );
}