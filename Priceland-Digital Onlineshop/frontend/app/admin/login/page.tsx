"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { apiFetch } from "@/lib/api";

// Hauptkomponente für die Admin-Login-Seite
export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [passwort, setPasswort] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // Funktion zum Handhaben des Login-Vorgangs
  async function handleLogin() {
    setError("");
    setIsLoading(true);
    // API-Aufruf zum Login
    try {
      const res = await apiFetch("/admin/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, passwort })
      });
      // Überprüfung der Antwort
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        setError(errorData.error || "Zugriff verweigert. Bitte Daten prüfen.");
        setIsLoading(false);
        return;
      }
      // Erfolgreiches Login - Weiterleitung zum Admin-Dashboard
      router.push("/admin");
    } catch {
      setError("Server nicht erreichbar.");
      setIsLoading(false);
    }
  }

 return (
  <div className="min-h-screen bg-[#f1f5f9] flex flex-col items-center p-6 relative overflow-hidden">
    
    {/* Hintergrund-Deko Elemente */}
    <div className="absolute top-[-10%] left-[-10%] w-160 h-160 bg-blue-100/40 rounded-full blur-[120px] -z-10"></div>
    <div className="absolute bottom-[-10%] right-[-10%] w-160 h-160 bg-slate-200/50 rounded-full blur-[120px] -z-10"></div>

   
    <div className="w-full max-w-md pt-20 md:pt-40 z-10">
      
      {/* Logo / Brand Header */}
      <div className="flex flex-col items-center gap-4 mb-10">
        <div className="w-16 h-16 bg-slate-900 rounded-2xl flex items-center justify-center shadow-2xl shadow-slate-300">
          <span className="text-white font-black text-3xl">P</span>
        </div>
        <div className="text-center">
          <h1 className="text-2xl font-black text-slate-900 tracking-tight leading-none">Priceland Admin</h1>
          <p className="text-blue-600 text-[10px] font-black uppercase tracking-[0.4em] mt-2">Secure Gate</p>
        </div>
      </div>

      {/* Login Card */}
      <div className="bg-white/70 backdrop-blur-2xl border border-white p-10 rounded-[3rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)]">
        <h2 className="text-xl font-black text-slate-900 mb-2">Anmelden</h2>
        <p className="text-slate-500 text-sm font-medium mb-8">Gib deine Administrator-Daten ein.</p>
        
        {error && (
          <div className="bg-red-50 border border-red-100 text-red-500 p-4 rounded-2xl text-xs font-bold mb-6 animate-shake">
            ⚠️ {error}
          </div>
        )}

        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Benutzername</label>
            <input 
              className="w-full bg-white border border-slate-200 p-4 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 outline-none transition-all font-bold text-slate-700"
              placeholder="Admin Username" 
              value={username}
              onChange={e => setUsername(e.target.value)} 
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Passwort</label>
            <input 
              className="w-full bg-white border border-slate-200 p-4 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 outline-none transition-all font-bold text-slate-700"
              type="password" 
              placeholder="••••••••" 
              value={passwort}
              onChange={e => setPasswort(e.target.value)} 
              onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
            />
          </div>
          
          <button 
            className={`w-full py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all shadow-xl active:scale-[0.98] mt-4 flex items-center justify-center gap-2 ${
              isLoading 
              ? "bg-slate-400 text-white cursor-not-allowed" 
              : "bg-slate-900 text-white hover:bg-blue-600 shadow-slate-200"
            }`}
            onClick={handleLogin}
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : "System betreten"}
          </button>
        </div>
      </div>

      {/* Footer Link */}
      <div className="mt-8 text-center">
        <Link href="/" className="text-slate-400 text-[10px] font-black uppercase tracking-widest hover:text-slate-600 transition-colors">
          ← Zurück zum Hauptshop
        </Link>
      </div>
    </div>
  </div>
);
}