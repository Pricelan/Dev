"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useKunde } from "@/context/kundeContext";
import Link from "next/link";
import { apiFetch } from "@/lib/api";

// Hauptkomponente für die Kunden-Login-Seite
export default function Login() {
  const { setKunde } = useKunde();
  const router = useRouter();
  
  // Zustände für E-Mail, Passwort und Ladezustand
  const [email, setEmail] = useState("");
  const [passwort, setPasswort] = useState("");
  const [loading, setLoading] = useState(false);

  // Funktion zum Absenden des Login-Formulars
  async function submit() {
    setLoading(true);
    try {
      const res = await apiFetch("/kunden/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          email: email, 
          passwort: passwort 
        })
      });

      if (!res.ok) {
        alert("Login fehlgeschlagen. Bitte prüfe E-Mail und Passwort.");
        return;
      }

      const kunde = await res.json();
      setKunde(kunde);
      router.push("/"); 
    } catch (error) {
      console.error("Login-Fehler:", error);
      alert("Server nicht erreichbar.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col items-center justify-center p-6 relative overflow-hidden">
      
      {/* Hintergrund-Deko */}
      <div className="absolute top-[-10%] left-[-10%] w-72 h-72 bg-blue-100 rounded-full blur-3xl opacity-50"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-indigo-100 rounded-full blur-3xl opacity-50"></div>

      <div className="max-w-md w-full bg-white/80 backdrop-blur-xl shadow-2xl rounded-[2.5rem] p-10 md:p-14 border border-white relative z-10">
        
        <header className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl shadow-lg shadow-blue-200 mb-6 text-2xl text-white">
            🔑
          </div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tight">Login</h2>
          <p className="text-slate-400 mt-2 font-medium">Willkommen zurück bei Priceland</p>
        </header>
        
        <div className="space-y-5">
          {/* E-Mail Feld */}
          <div className="group">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1 mb-2 block group-focus-within:text-blue-600 transition">E-Mail Adresse</label>
            <input 
              className="w-full bg-slate-50 p-4 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 focus:bg-white outline-none transition-all text-slate-700 font-medium"
              placeholder="beispiel@mail.de" 
              onChange={e => setEmail(e.target.value)} 
            />
          </div>

          {/* Passwort Feld */}
          <div className="group">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1 mb-2 block group-focus-within:text-blue-600 transition">Passwort</label>
            <input 
              type="password" 
              className="w-full bg-slate-50 p-4 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 focus:bg-white outline-none transition-all text-slate-700 font-medium"
              placeholder="••••••••" 
              onChange={e => setPasswort(e.target.value)} 
            />
          </div>
          
          {/* Submit Button mit Ladezustand */}
          <button 
            onClick={submit}
            disabled={loading}
            className={`w-full ${loading ? 'bg-slate-400' : 'bg-slate-900 hover:bg-blue-600'} text-white font-black py-5 rounded-2xl transition-all shadow-xl active:scale-[0.98] mt-4 uppercase tracking-widest text-sm`}
          >
            {loading ? "Wird geprüft..." : "Jetzt einloggen"}
          </button>
        </div>
        
        <div className="mt-10 pt-8 border-t border-slate-50 text-center">
          <p className="text-slate-500 text-sm font-medium">
            Noch kein Konto? 
            <Link href="/kunde/register" className="text-blue-600 font-bold hover:underline ml-1">
              Hier registrieren
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}