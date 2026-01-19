"use client";
import Link from 'next/link';
import SoftwareVerwaltung from '../components/SoftwareVerwaltung';
import HerstellerSuche from '../components/HerstellerSuche';
import KundenSuche from '../components/KundenSuche';
import { useEffect, useState } from 'react';
import { apiFetch } from '@/lib/api';

export default function AdminDashboard() {
  
  
   const [umsatz, setUmsatz] = useState(0);
   const [loading, setLoading] = useState(true);
const handleLogout = async () => {
  try {
    await apiFetch("/admin/auth/logout", { 
      method: "POST",
      // Falls dein apiFetch keine Credentials mitschickt, hier explizit:
      credentials: "include" 
    });
  } catch (err) {
    console.error("Logout Error", err);
  } finally {
    // IMMER weiterleiten, auch bei Fehler
    window.location.href = "/admin/login"; 
  }
};

useEffect(() => {
  apiFetch("/admin/auth/check-admin")
    .then(isAdmin => {
      // Nur wenn die Antwort eindeutig "false" ist, leiten wir um
      if (isAdmin === false) {
        window.location.href = "/admin/login";
      } else {
        setLoading(false);
      }
    })
    .catch(err => {
      console.error("Session-Check Fehler:", err);
      // Bei einem Netzwerkfehler NICHT sofort ausloggen, 
      // sondern vielleicht nur eine Warnung zeigen
    });
}, []);

  // 2. Umsatz laden (Wird nur ausgeführt, wenn die Komponente aktiv bleibt)
  useEffect(() => {
    if (!loading) { // Erst laden, wenn wir wissen, dass es ein Admin ist
      apiFetch("/bestellungen/admin/umsatz")
        .then(data => setUmsatz(data))
        .catch(err => console.error("Fehler beim Umsatz-Laden:", err));
    }
  }, [loading]); // Wartet, bis loading auf false springt

  // 3. Erst HIER kommen die Returns
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8f9fc]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
        <span className="ml-3 font-bold text-gray-600">Sicherheitscheck...</span>
      </div>
    );
  }

return (
    <div className="min-h-screen bg-[#f8f9fc] p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-4xl font-black text-gray-900">Admin <span className="text-blue-600">Panel</span></h1>
          <div className="flex gap-4">
  <Link 
    href="/admin/bestellungen" 
    className="bg-white border px-4 py-2 rounded-xl shadow-sm hover:bg-gray-50 font-bold text-sm transition-all"
  >
    📦 Bestellungen prüfen
  </Link>
  <button 
      onClick={handleLogout}
      className="bg-red-50 text-red-600 border border-red-100 px-4 py-2 rounded-xl shadow-sm hover:bg-red-600 hover:text-white font-bold text-sm transition-all flex items-center gap-2"
    >
      󰍃 Abmelden
    </button>
          </div>
        </div>

        {/* Das Grid System */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LINKER TEIL: Inventar & Kunden-Management (Breit) */}
          <div className="lg:col-span-8 space-y-8">
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-2">
              <SoftwareVerwaltung />
            </div>

            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Kunden-Management</h2>
                <Link href="/admin/kunde" className="text-blue-600 font-bold text-sm hover:underline">
                  Vollständige Liste →
                </Link>
              </div>
              <KundenSuche />
            </div>
          </div>

          {/* RECHTER TEIL: Stats & Suche (Schmal) */}
          <div className="lg:col-span-4 space-y-6 sticky top-8">
            
            {/* Umsatz-Karte */}
            <div className="bg-blue-600 p-8 rounded-4xl text-white shadow-xl shadow-blue-200 transition-transform hover:scale-[1.02]">
              <h3 className="text-blue-200 text-xs font-bold uppercase tracking-widest mb-2">Live Umsatz</h3>
              {/* Das Number(...) fängt Strings ab, das || 0 fängt null/undefined ab */}
              <p className="text-5xl font-black">
              {typeof umsatz === 'number' 
              ? umsatz.toFixed(2) 
              : Number(umsatz || 0).toFixed(2)} €
              </p>
              <div className="mt-6 flex items-center gap-2 text-sm bg-blue-700 w-fit px-3 py-1 rounded-full">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                Verbunden
              </div>
            </div>

            {/* Suche */}
            <HerstellerSuche />

            {/* Quick Actions */}
            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
              <h3 className="font-bold mb-4 text-gray-800">Schnellzugriff</h3>
              <div className="grid grid-cols-2 gap-4">
                <Link href="/admin/herstellerverwaltung" className="flex flex-col items-center p-4 bg-gray-50 rounded-2xl hover:bg-blue-50 transition-colors group">
                  <span className="text-2xl mb-2 group-hover:scale-110 transition-transform">🏢</span>
                  <span className="text-[10px] font-bold uppercase text-gray-500">Partner</span>
                </Link>
                <Link href="/admin/software/" className="flex flex-col items-center p-4 bg-gray-50 rounded-2xl hover:bg-blue-50 transition-colors group">
                  <span className="text-2xl mb-2 group-hover:scale-110 transition-transform">➕</span>
                  <span className="text-[10px] font-bold uppercase text-gray-500">Software</span>
                </Link>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}