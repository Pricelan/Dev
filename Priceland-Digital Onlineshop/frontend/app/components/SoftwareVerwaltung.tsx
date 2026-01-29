"use client";
import { useState, useEffect } from "react";
import { Software } from "@/types/software";

export default function SoftwareVerwaltung() {
  // WICHTIG: Immer mit [] initialisieren
  const [query, setQuery] = useState("");
  const [softwareListe, setSoftwareListe] = useState<Software[]>([]); 
  const [loading, setLoading] = useState(true);

 useEffect(() => {
    // Definiere eine interne Funktion für den Fetch
    const fetchData = async () => {
        setLoading(true); // Jetzt ist es sicher
        const url = query.length > 0 
            ? `http://localhost:8080/api/software/suche?name=${query}`
            : `http://localhost:8080/api/software`; // Entferne /alle, falls der Endpunkt nicht existiert

        try {
            const res = await fetch(url);
            if (!res.ok) throw new Error("Fehler beim Laden");
            const data = await res.json();
            setSoftwareListe(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error(error);
            setSoftwareListe([]);
        } finally {
            setLoading(false);
        }
    };

    fetchData();
}, [query]);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
        <h2 className="text-xl font-bold text-gray-800">Software-Bestand</h2>
        <input
          type="text"
          placeholder="Suchen..."
          className="border rounded-lg px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-50 text-gray-400 text-xs uppercase font-bold">
            <tr>
              <th className="px-6 py-4">ID</th>
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Preis</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
  {/* Bedingung 1: Es wurde noch gar nichts getippt */}
  {query.length === 0 ? (
    <tr>
      <td colSpan={3} className="px-6 py-12 text-center text-gray-400">
        <div className="flex flex-col items-center gap-2">
          <span className="text-2xl">🔍</span>
          <p>Bitte gib einen Suchbegriff ein, um die Software-Liste anzuzeigen.</p>
        </div>
      </td>
    </tr>
  ) : (
    /* Bedingung 2: Es wird gesucht - zeige Ergebnisse oder "Nichts gefunden" */
    Array.isArray(softwareListe) && softwareListe.length > 0 ? (
      softwareListe.map((s) => (
        <tr key={s.id} className="hover:bg-gray-50 transition-colors">
          <td className="px-6 py-4 font-mono text-sm text-gray-500">#{s.id}</td>
          <td className="px-6 py-4 font-semibold">{s.name}</td>
          <td className="px-6 py-4 text-blue-600 font-bold">{s.preis.toFixed(2)} €</td>
        </tr>
      ))
    ) : (
      <tr>
        <td colSpan={3} className="px-6 py-10 text-center text-gray-400 italic">
          {loading ? "Suche läuft..." : `Keine Software mit "${query}" gefunden.`}
        </td>
      </tr>
    )
  )}
</tbody>
        </table>
      </div>
    </div>
  );
}