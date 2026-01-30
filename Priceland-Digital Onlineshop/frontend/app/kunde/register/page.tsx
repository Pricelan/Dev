"use client";

import React, { useState } from "react";
import Link from "next/link";

// Hauptkomponente für die Registrierungsseite
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

  // Gemeinsamer Stil für Eingabefelder
  const inputStyle = "w-full bg-slate-100/50 p-4 border border-slate-200/50 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-400 focus:bg-white/90 outline-none transition-all text-slate-700 font-medium placeholder:text-slate-400";

  // Formular-Submit-Handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.passwort !== formData.passwortWiederholen) {
      alert("Die Passwörter stimmen nicht überein!");
      return;
    }
    if (formData.email !== formData.emailWiederholen) {
      alert("Die E-Mail-Adressen stimmen nicht überein!");
      return;
    }

    // API-Aufruf zur Registrierung
    try {
      const response = await fetch("http://localhost:8080/api/kunden/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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

      // Antwort prüfen
      if (response.ok) {
        alert("Registrierung erfolgreich!");
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
    <div className="min-h-screen bg-[#f8fafc] relative overflow-hidden pb-20">
      
      {/* Hintergrund-Deko */}
      <div className="absolute top-[-5%] left-[-5%] w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-50"></div>
      <div className="absolute bottom-0 right-0 w-120 h-120 bg-indigo-100 rounded-full blur-3xl opacity-50"></div>

      {/* Hero Header */}
      <section className="relative pt-20 pb-24 text-center">
        <span className="text-blue-600 font-black text-xs uppercase tracking-[0.3em] mb-4 block">Willkommen bei Priceland</span>
        <h1 className="text-5xl font-black text-slate-900 tracking-tight mb-4">Neues Konto erstellen</h1>
        <p className="text-slate-500 font-medium max-w-md mx-auto">Profitieren Sie von exklusiven Software-Angeboten und sofortiger digitaler Lieferung.</p>
      </section>

      {/* Haupt-Formular */}
      <main className="max-w-2xl mx-auto px-6 relative z-10">
        <div className="bg-white/80 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] rounded-[2.5rem] p-8 md:p-14 border border-white">
          
          <form className="space-y-6" onSubmit={handleSubmit}>
            
            {/* 1. Anrede */}
            <div className="flex justify-center gap-4 p-2 bg-slate-50 rounded-2xl border border-slate-100">
              {["Frau", "Herr", "Keine Angabe"].map((label) => (
                <label key={label} className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl cursor-pointer transition-all ${formData.anrede === label ? 'bg-white shadow-sm text-blue-600' : 'text-slate-400 hover:text-slate-600'}`}>
                  <input 
                    type="radio" 
                    name="anrede" 
                    className="hidden"
                    onChange={() => setFormData({...formData, anrede: label})}
                  />
                  <span className="text-sm font-bold uppercase tracking-wider">{label}</span>
                </label>
              ))}
            </div>

            {/* 2. Name */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="text" placeholder="Vorname" className={inputStyle} onChange={e => setFormData({...formData, vorname: e.target.value})} />
              <input type="text" placeholder="Nachname" className={inputStyle} onChange={e => setFormData({...formData, nachname: e.target.value})} />
            </div>

            {/* 3. Adresse */}
            <div className="grid grid-cols-4 gap-4">
              <div className="col-span-3">
                <input type="text" placeholder="Straße" className={inputStyle} onChange={e => setFormData({...formData, strasse: e.target.value})} />
              </div>
              <div className="col-span-1">
                <input type="text" placeholder="Nr." className={inputStyle} onChange={e => setFormData({...formData, hausnummer: e.target.value})} />
              </div>
            </div>

            <div className="grid grid-cols-4 gap-4">
              <div className="col-span-1">
                <input type="text" placeholder="PLZ" className={inputStyle} onChange={e => setFormData({...formData, plz: e.target.value})} />
              </div>
              <div className="col-span-3">
                <input type="text" placeholder="Ort" className={inputStyle} onChange={e => setFormData({...formData, ort: e.target.value})} />
              </div>
            </div>

            {/* 4. Kontakt */}
            <input type="text" placeholder="Telefonnummer" className={inputStyle} onChange={e => setFormData({...formData, telefon: e.target.value})} />
            
            <div className="space-y-4 pt-4">
               <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Login-Daten</h4>
               <input type="email" placeholder="E-Mail-Adresse" className={inputStyle} onChange={e => setFormData({...formData, email: e.target.value})} />
               <input type="email" placeholder="E-Mail-Adresse wiederholen" className={inputStyle} onChange={e => setFormData({...formData, emailWiederholen: e.target.value})} />
               <input type="password" placeholder="Passwort" className={inputStyle} onChange={e => setFormData({...formData, passwort: e.target.value})} />
               <input type="password" placeholder="Passwort wiederholen" className={inputStyle} onChange={e => setFormData({...formData, passwortWiederholen: e.target.value})} />
            </div>

            {/* Button */}
            <button className="w-full bg-slate-900 hover:bg-blue-600 text-white font-black py-6 rounded-2xl shadow-xl shadow-slate-200 hover:shadow-blue-200 transform active:scale-95 transition-all text-sm uppercase tracking-[0.2em] mt-8">
              Konto erstellen
            </button>
            
            <p className="text-center text-slate-400 text-sm font-medium">
              Bereits Mitglied? <Link href="/kunde/login" className="text-blue-600 font-bold hover:underline">Hier einloggen</Link>
            </p>
          </form>
        </div>
      </main>

      {/* Warum Priceland Sektion */}
      <section className="max-w-5xl mx-auto py-24 px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          {[
            { icon: "★", title: "Originale Lizenzen", desc: "100% zertifizierte Software" },
            { icon: "⚡", title: "Instant Delivery", desc: "Code sofort per E-Mail" },
            { icon: "📞", title: "Premium Support", desc: "Hilfe bei der Installation" }
          ].map((item, i) => (
            <div key={i} className="group">
              <div className="bg-white w-16 h-16 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center mx-auto mb-6 text-blue-600 text-2xl group-hover:bg-blue-600 group-hover:text-white transition-all">
                {item.icon}
              </div>
              <h4 className="font-bold text-slate-900 mb-2">{item.title}</h4>
              <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}