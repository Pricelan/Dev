"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import SoftwareCard from "@/app/components/SoftwareCard";
import { useWarenkorb } from "../context/warenkorbContext"; 
import { getGastToken } from "@/lib/gastToken";
import { Software } from '@/types/software';


export default function Startseite() {
  const { refresh } = useWarenkorb();
  const [softwareListe, setSoftwareListe] = useState<Software[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filterung findet erst statt, wenn Daten da sind
  const softwareLizenzen = softwareListe.filter(s => s.kategorie === "SOFTWARE");
  const freeware = softwareListe.filter(s => s.kategorie === "FREEWARE");
  const games = softwareListe.filter(s => s.kategorie === "GAMES");

  // Fetch-Funktion im useEffect
  useEffect(() => {
    fetch("http://localhost:8080/api/software")
      .then(res => {
        if (!res.ok) throw new Error("Backend Antwortfehler: " + res.status);
        return res.json();
      })
      .then(data => {
        setSoftwareListe(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(err => {
        console.error("Fetch Fehler:", err);
        setError("Verbindung zum Server fehlgeschlagen.");
        setLoading(false);
      });
  }, []);

  // Funktion zum Hinzufügen eines Software-Artikels zum Warenkorb
  async function handleAddToCart(id: number) {
    const token = getGastToken();
    try {
      const res = await fetch("http://localhost:8080/api/warenkorb/add", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ softwareId: id, menge: 1, gastToken: token })
      });

      if (res.ok) {
        await refresh();
        alert("Erfolgreich hinzugefügt!");
      }
    } catch (err) {
      console.error("Warenkorb Fehler:", err);
    }
  }

  if (loading) return <p style={{ textAlign: "center", padding: "50px" }}>Daten werden geladen...</p>;
  if (error) return <p style={{ textAlign: "center", color: "red", padding: "50px" }}>{error}</p>;
 
return (
    <main className="min-h-screen bg-white">
      {/* HEADER BEREICH */}
      <header className="text-center py-20 px-5 bg-[#0A6CFF] text-white mb-10">
        <h1 className="text-5xl font-extrabold mb-4 tracking-tight">Priceland Digital</h1>
        <p className="text-lg opacity-90 max-w-xl mx-auto">
          Entdecke hochwertige Software, Games und professionelle Tools für deinen digitalen Alltag.
        </p>
      </header>

      {/* VORTEILE BEREICH */}
      <section className="grid grid-cols-2 md:grid-cols-4 text-center px-10 py-6 text-sm font-bold gap-4">
        <div>⚡ Software aktiviert</div>
        <div>🔒 100% Sicher</div>
        <div>📞 24/7 Support</div>
        <div>💵 30 Tage Geld-zurück</div>
      </section>

      <div className="text-center mt-8">
        <h2 className="text-2xl font-bold">Unsere Kategorien</h2>
        <p className="text-gray-600 mb-8">Finden Sie genau das, was Sie benötigen</p>
      </div>

      {/* KATEGORIEN GRID */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-5 px-5 md:px-16">
        {/* Kategorie 1 */}
        <div className="bg-gray-100 p-5 rounded-xl shadow-sm">
          <h2 className="text-xl font-bold mb-4">Softwarelizenzen</h2>
          <div className="space-y-4 mb-4">
            {softwareLizenzen.map(s => (
              <SoftwareCard key={s.id} software={s} onAddToCart={() => handleAddToCart(s.id)} />
            ))}
          </div>
          <p className="font-semibold text-gray-700">Professionelle Tools</p>
          <ul className="list-disc list-inside text-sm text-gray-600 mb-4">
            <li>Office 365</li>
            <li>Adobe Produkte</li>
            <li>Windows 11 Pro</li>
          </ul>
          <Link href="/software/lizenzen">
            <button className="bg-[#0A6CFF] text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
              Kategorie anzeigen
            </button>
          </Link>
        </div>

        {/* Kategorie 2 */}
        <div className="bg-gray-100 p-5 rounded-xl shadow-sm">
          <h2 className="text-xl font-bold mb-4">Kostenlose Software</h2>
          <p className="text-gray-500 mb-4">Gratis & Open Source</p>
          <div className="space-y-4 mb-4">
            {freeware.map(s => (
              <SoftwareCard key={s.id} software={s} onAddToCart={() => handleAddToCart(s.id)} />
            ))}
          </div>
          <ul className="list-disc list-inside text-sm text-gray-600 mb-4">
            <li>LibreOffice</li>
            <li>VLC Media Player</li>
            <li>7-Zip Archivierer</li>
          </ul>
          <Link href="/software/kostenlos">
            <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition">
              Gratis entdecken
            </button>
          </Link>
        </div>

        {/* Kategorie 3 */}
        <div className="bg-gray-100 p-5 rounded-xl shadow-sm">
          <h2 className="text-xl font-bold mb-4">Games</h2>
          <p className="text-gray-500 mb-4">Abo oder Lizenz</p>
          <div className="space-y-4 mb-4">
            {games.map(s => (
              <SoftwareCard key={s.id} software={s} onAddToCart={() => handleAddToCart(s.id)} />
            ))}
          </div>
          <ul className="list-disc list-inside text-sm text-gray-600 mb-4">
            <li>Steam Keys</li>
            <li>Indie Games</li>
            <li>Triple AAA Games</li>
          </ul>
          <Link href="/software/games">
            <button className="bg-purple-700 text-white px-4 py-2 rounded-md hover:bg-purple-800 transition">
              Games durchsuchen
            </button>
          </Link>
        </div>
      </section>

      {/* ABO MODELLE */}
      <section className="bg-[#f5f7ff] py-16 mt-10">
        <h2 className="text-center text-2xl font-bold">Abo Modelle</h2>
        <p className="text-center text-gray-600 mb-10">Wählen Sie das passende Modell für Ihre Bedürfnisse</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto px-5">
          {/* Basic */}
          <div className="bg-white p-8 rounded-2xl shadow-md border border-gray-100">
            <h3 className="text-lg font-bold">Basic</h3>
            <p className="text-gray-500">Für Einsteiger</p>
            <h2 className="text-2xl font-bold my-4">€9,99 / Monat</h2>
            <ul className="space-y-2 mb-6 text-gray-600">
              <li>✔ 5 Software Lizenzen</li>
              <li>✔ Zugriff auf Free Software</li>
            </ul>
            <button onClick={() => alert("Abo simuliert")} className="w-full bg-[#0A6CFF] text-white py-2 rounded-lg font-semibold">Wählen</button>
          </div>

          {/* Pro */}
          <div className="bg-[#0A6CFF] p-8 rounded-2xl shadow-xl text-white transform scale-105">
            <h3 className="text-lg font-bold">Pro</h3>
            <p className="opacity-80">Für Profis</p>
            <h2 className="text-2xl font-bold my-4">€19,99 / Monat</h2>
            <ul className="space-y-2 mb-6">
              <li>✔ Unlimitierte Software</li>
              <li>✔ Zugriff auf Games</li>
              <li>✔ Priority Support</li>
            </ul>
            <button onClick={() => alert("Abo simuliert")} className="w-full bg-white text-[#0A6CFF] py-2 rounded-lg font-bold">Wählen</button>
          </div>

          {/* Enterprise */}
          <div className="bg-white p-8 rounded-2xl shadow-md border border-gray-100">
            <h3 className="text-lg font-bold">Enterprise</h3>
            <p className="text-gray-500">Für Teams</p>
            <h2 className="text-2xl font-bold my-4">€49,99 / Monat</h2>
            <ul className="space-y-2 mb-6 text-gray-600">
              <li>✔ Teamverwaltung</li>
              <li>✔ Account Manager</li>
            </ul>
            <button onClick={() => alert("Abo simuliert")} className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold">Wählen</button>
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="text-center py-16 px-5">
        <h3 className="text-xl font-bold">Bleiben Sie informiert</h3>
        <p className="text-gray-600 mb-6">Erhalten Sie aktuelle Software-Angebote & Updates</p>
        <div className="flex flex-col md:flex-row justify-center gap-3">
          <input type="email" placeholder="Ihre E-Mail Adresse" className="p-3 border rounded-lg md:w-80 outline-none focus:ring-2 focus:ring-blue-500" />
          <button onClick={() => alert("Newsletter simuliert")} className="bg-[#0A6CFF] text-white px-6 py-3 rounded-lg font-bold">Abonnieren</button>
        </div>
      </section>
    </main>
  );
}
