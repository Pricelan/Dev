"use client";
import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";
import Link from "next/link";
import {Kunde} from "@/types/kunde";

// Hauptkomponente für die Kunden-Suche im Admin-Dashboard
export default function KundenSuche() {
  const [kunden, setKunden] = useState<Kunde[]>([]);
  const [suchbegriff, setSuchbegriff] = useState("");

  // useEffect Hook zum Laden der Kundenliste beim Initialisieren
  useEffect(() => {
    apiFetch("/admin/kunden").then(setKunden).catch(console.error);
  }, []);

  // Filtert die Kunden basierend auf der Eingabe
  const gefiltert = kunden.filter(k => 
    `${k.vorname} ${k.nachname}`.toLowerCase().includes(suchbegriff.toLowerCase()) ||
    k.email.toLowerCase().includes(suchbegriff.toLowerCase())
  );

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-gray-800">👤 Kunden-Schnellsuche</h3>
        <Link href="/admin/kunde" className="text-xs text-blue-600 hover:underline">
          Zur großen Liste →
        </Link>
      </div>

      <input
        type="text"
        placeholder="Name oder E-Mail..."
        className="w-full p-3 bg-gray-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none"
        onChange={(e) => setSuchbegriff(e.target.value)}
      />

      <div className="mt-4 space-y-2">
        {suchbegriff.length > 0 && gefiltert.map(k => (
          <div key={k.id} className="p-3 bg-gray-50 rounded-xl flex justify-between items-center border border-gray-100">
            <div>
              <div className="font-bold text-sm">{k.vorname} {k.nachname}</div>
              <div className="text-[11px] text-gray-500">{k.email}</div>
            </div>
            <div className="text-[10px] text-gray-400">ID #{k.id}</div>
          </div>
        ))}
        {suchbegriff.length === 0 && (
          <p className="text-center text-gray-400 text-xs py-2 italic">Suche nach Kunden...</p>
        )}
      </div>
    </div>
  );
}