"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import "@/app/ui/grid.css";

// Hauptkomponente für die Startseite
export default function Startseite() {
 
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
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 px-5 md:px-16">
        
        {/* Kategorie 1: Softwarelizenzen */}
        <div className="software-card card-tools">
          <h2 className="software-name">Softwarelizenzen</h2>
          <div className="content-section">
            <span className="category-subtitle">Professionelle Tools</span>
            <div className="space-y-4 mb-4">
              
            </div>
            <ul className="feature-list">
              <li>Office 365</li>
              <li>Adobe Produkte</li>
              <li>Windows 11 Pro</li>
            </ul>
          </div>
          <Link href="/software/lizenzen" className="mt-auto">
            <Button variant="blue" style={{ width: "100%" }}>Kategorie anzeigen</Button>
          </Link>
        </div>

        {/* Kategorie 2: Kostenlose Software */}
        <div className="software-card card-gratis">
          <h2 className="software-name">Kostenlose Software</h2>
          <div className="content-section">
            <span className="category-subtitle">Gratis & Open Source</span>
            <div className="space-y-4 mb-4">
              </div>
            <ul className="feature-list">
              <li>LibreOffice</li>
              <li>VLC Media Player</li>
              <li>7-Zip Archivierer</li>
            </ul>
          </div>
          <Link href="/software/kostenlos" className="mt-auto">
            <Button variant="green" style={{ width: "100%" }}>Gratis entdecken</Button>
          </Link>
        </div>

        {/* Kategorie 3: Games */}
        <div className="software-card card-games">
          <h2 className="software-name">Games</h2>
          <div className="content-section">
            <span className="category-subtitle">Abo oder Lizenz</span>
            <div className="space-y-4 mb-4">
              
            </div>
            <ul className="feature-list">
              <li>Steam Keys</li>
              <li>Indie Games</li>
              <li>Triple AAA Games</li>
            </ul>
          </div>
          <Link href="/software/games" className="mt-auto">
            <Button variant="purple" style={{ width: "100%" }}>Games durchsuchen</Button>
          </Link>
        </div>
      </section>

      {/* ABO MODELLE */}
      <section className="bg-[#f5f7ff] py-16 mt-10">
        <h2 className="text-center text-2xl font-bold">Abo Modelle</h2>
        <p className="text-center text-gray-600 mb-10">Wählen Sie das passende Modell für Ihre Bedürfnisse</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto px-5">
          {/* Basic */}
          <div className="bg-white p-8 rounded-2xl shadow-md border border-gray-100 flex flex-col">
            <h3 className="text-lg font-bold">Basic</h3>
            <p className="text-gray-500">Für Einsteiger</p>
            <h2 className="text-2xl font-bold my-4">€9,99 / Monat</h2>
            <ul className="space-y-2 mb-6 text-gray-600 grow">
              <li>✔ 5 Software Lizenzen</li>
              <li>✔ Zugriff auf Free Software</li>
            </ul>
            <Button variant="blue" onClick={() => alert("Abo simuliert")} style={{ width: "100%" }}>Wählen</Button>
          </div>

          {/* Pro */}
          <div className="bg-[#0A6CFF] p-8 rounded-2xl shadow-xl text-white transform scale-105 flex flex-col">
            <h3 className="text-lg font-bold">Premium</h3>
            <p className="opacity-80">Für Profis</p>
            <h2 className="text-2xl font-bold my-4">€19,99 / Monat</h2>
            <ul className="space-y-2 mb-6 grow">
              <li>✔ Unlimitierte Software</li>
              <li>✔ Zugriff auf Games</li>
              <li>✔ Priority Support</li>
            </ul>
            <Button variant="outline" onClick={() => alert("Abo simuliert")} style={{ background: "white", color: "#0A6CFF", width: "100%" }}>Wählen</Button>
          </div>

          {/* Enterprise */}
          <div className="bg-white p-8 rounded-2xl shadow-md border border-gray-100 flex flex-col">
            <h3 className="text-lg font-bold">Enterprise</h3>
            <p className="text-gray-500">Für Teams</p>
            <h2 className="text-2xl font-bold my-4">€49,99 / Monat</h2>
            <ul className="space-y-2 mb-6 text-gray-600 grow">
              <li>✔ Teamverwaltung</li>
              <li>✔ Account Manager</li>
            </ul>
            <Button variant="green" onClick={() => alert("Abo simuliert")} style={{ width: "100%" }}>Wählen</Button>
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="text-center py-16 px-5">
        <h3 className="text-xl font-bold">Bleiben Sie informiert</h3>
        <p className="text-gray-600 mb-6">Erhalten Sie aktuelle Software-Angebote & Updates</p>
        <div className="flex flex-col md:flex-row justify-center gap-3">
          <input type="email" placeholder="Ihre E-Mail Adresse" className="p-3 border rounded-lg md:w-80 outline-none focus:ring-2 focus:ring-blue-500" />
          <Button variant="blue" onClick={() => alert("Newsletter simuliert")}>Abonnieren</Button>
        </div>
      </section>
    </main>
  );
}