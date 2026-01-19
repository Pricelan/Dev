"use client";

import React, { useState } from "react";


export default function RegisterPage() {
  const [formData, setFormData] = useState({
 anrede: "",
    vorname: "",
    nachname: "",
    strasse: "",
    hausnummer: "",
    plz: "",
    ort: "",
    telefon: "",
    email: "",
    emailWiederholen: "",
    passwort: "",
    passwortWiederholen: "",
  });

  const inputStyle = "w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder:text-gray-400";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validierung: Passwort-Check
    if (formData.passwort !== formData.passwortWiederholen) {
      alert("Die Passwörter stimmen nicht überein!");
      return;
    }

    if (formData.email !== formData.emailWiederholen) {
      alert("Die E-Mail-Adressen stimmen nicht überein!");
      return;
    }

    try {
    const response = await fetch("http://localhost:8080/api/kunden/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        vorname: formData.vorname,
        nachname: formData.nachname,
        email: formData.email,
        passwort: formData.passwort,
        strasse: formData.strasse,
        hausnummer: formData.hausnummer,
        plz: formData.plz,
        ort: formData.ort,
        telefon: formData.telefon
      }),
    });

    if (response.ok) {
      alert("Registrierung erfolgreich!");
      // Hier zum Login weiterleiten
      window.location.href = "/kunde/login";
    } else {
      const errorData = await response.json();
      alert("Fehler: " + (errorData.message || "Registrierung fehlgeschlagen"));
    }
  } catch (error) {
    console.error("Netzwerkfehler:", error);
    alert("Server nicht erreichbar.");
  }
};

 return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Blauer Header */}
      <section className="bg-blue-600 py-12 text-center text-white">
        <h1 className="text-3xl font-bold mb-2">Softwarelizenzen für Ihr Unternehmen</h1>
        <p className="opacity-90">Finden Sie die passende Lizenz für jede Anwendung</p>
      </section>

      {/* Formular-Container */}
      <main className="max-w-xl mx-auto -mt-10 bg-white shadow-2xl rounded-xl p-8 border border-gray-100">
        <h2 className="text-2xl font-bold text-center mb-8 text-gray-800">Jetzt Kundenkonto anlegen</h2>
        
        <form className="space-y-4" onSubmit={handleSubmit}>
          
          {/* 1. Anrede */}
          <div className="flex justify-center gap-6 mb-6">
            {["Frau", "Herr", "Keine Angabe"].map((label) => (
              <label key={label} className="flex items-center gap-2 cursor-pointer group">
                <input 
                  type="radio" 
                  name="anrede" 
                  className="w-4 h-4 text-blue-600 border-gray-300"
                  onChange={() => setFormData({...formData, anrede: label})}
                />
                <span className="text-gray-600 group-hover:text-blue-600">{label}</span>
              </label>
            ))}
          </div>

          {/* 2. Name */}
          <div className="grid grid-cols-1 gap-4">
            <input type="text" placeholder="Vorname" className={inputStyle} 
              onChange={e => setFormData({...formData, vorname: e.target.value})} />
            <input type="text" placeholder="Nachname" className={inputStyle} 
              onChange={e => setFormData({...formData, nachname: e.target.value})} />
          </div>

          {/* 3. Adresse (Straße + Nr) */}
          <div className="grid grid-cols-4 gap-4">
            <div className="col-span-3">
              <input type="text" placeholder="Straße" className={inputStyle} 
                onChange={e => setFormData({...formData, strasse: e.target.value})} />
            </div>
            <div className="col-span-1">
              <input type="text" placeholder="Nr." className={inputStyle} 
                onChange={e => setFormData({...formData, hausnummer: e.target.value})} />
            </div>
          </div>

          {/* 4. PLZ + Ort */}
          <div className="grid grid-cols-4 gap-4">
            <div className="col-span-1">
              <input type="text" placeholder="PLZ" className={inputStyle} 
                onChange={e => setFormData({...formData, plz: e.target.value})} />
            </div>
            <div className="col-span-3">
              <input type="text" placeholder="Ort" className={inputStyle} 
                onChange={e => setFormData({...formData, ort: e.target.value})} />
            </div>
          </div>

          {/* 5. Telefon & Email */}
          <input type="text" placeholder="Telefonnummer" className={inputStyle} 
            onChange={e => setFormData({...formData, telefon: e.target.value})} />
          
          <input type="email" placeholder="E-Mail-Adresse" className={inputStyle} 
            onChange={e => setFormData({...formData, email: e.target.value})} />
          
          <input type="email" placeholder="E-Mail-Adresse wiederholen" className={inputStyle} 
            onChange={e => setFormData({...formData, emailWiederholen: e.target.value})} />

          {/* 6. Passwörter */}
          <div className="relative">
            <input type="password" placeholder="Passwort" className={inputStyle} 
              onChange={e => setFormData({...formData, passwort: e.target.value})} />
            <button type="button" className="absolute right-3 top-3 text-xs text-gray-400 hover:text-blue-600">Anzeigen</button>
          </div>

          <div className="relative">
            <input type="password" placeholder="Passwort wiederholen" className={inputStyle} 
              onChange={e => setFormData({...formData, passwortWiederholen: e.target.value})} />
            <button type="button" className="absolute right-3 top-3 text-xs text-gray-400 hover:text-blue-600">Anzeigen</button>
          </div>

          {/* Button */}
          <button className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-4 rounded-lg shadow-lg transform active:scale-95 transition-all text-xl mt-6">
            Weiter
          </button>
        </form>
      </main>
 
      {/* 3. WARUM PRICELAND SEKTION */}
      <section className="max-w-5xl mx-auto py-16 px-6 border-t border-gray-200">
        <h3 className="text-center text-2xl font-bold mb-12">Warum Priceland Digital?</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          <div>
            <div className="bg-blue-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-xl">★</div>
            <h4 className="font-bold mb-2">100% Authentisch</h4>
            <p className="text-gray-500 text-sm italic">Nur offizielle Lizenzen von zertifizierten Händlern</p>
          </div>
          <div>
            <div className="bg-blue-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-xl">🎧</div>
            <h4 className="font-bold mb-2">Premium Support</h4>
            <p className="text-gray-500 text-sm italic">Technische Unterstützung bei Installation und Nutzung</p>
          </div>
          <div>
            <div className="bg-blue-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-xl">🚚</div>
            <h4 className="font-bold mb-2">Sofort Lieferbar</h4>
            <p className="text-gray-500 text-sm italic">Digitale Lieferung per E-Mail nach Kaufabschluss</p>
          </div>
        </div>
      </section>
    </div>
  );
}