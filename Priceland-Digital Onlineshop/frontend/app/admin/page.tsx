"use client";

import Link from 'next/link';
import SoftwareVerwaltung from '../components/SoftwareVerwaltung';
import HerstellerSuche from '../components/HerstellerSuche';
import KundenSuche from '../components/KundenSuche';
import { useEffect, useState } from 'react';
import { apiFetch } from '@/lib/api';
import { Bestellung } from '@/types/bestellung';

export default function AdminDashboard() {
  const [umsatz, setUmsatz] = useState(0);
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState<Bestellung[]>([]);
  

  const handleLogout = async () => {
    try {
      await apiFetch("/admin/auth/logout", { 
        method: "POST",
        credentials: "include" 
      });
    } catch (err) {
      console.error("Logout Error", err);
    } finally {
      window.location.href = "/admin/login"; 
    }
  };

  useEffect(() => {
    apiFetch("/admin/auth/check-admin")
      .then(isAdmin => {
        if (isAdmin === false) {
          window.location.href = "/admin/login";
        } else {
          setLoading(false);
        }
      })
      .catch(err => {
        console.error("Session-Check Fehler:", err);
      });
  }, []);

  useEffect(() => {
  if (!loading) {
    // Gesamtumsatz
    apiFetch("/bestellungen/admin/umsatz")
      .then(data => setUmsatz(data))
      .catch(err => console.error(err));

    // Alle Bestellungen für die Detail-Stats
    apiFetch("/bestellungen")
      .then(data => setOrders(data))
      .catch(err => console.error(err));
  }
}, [loading]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f1f5f9]">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-2xl h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
          <span className="mt-4 font-black text-slate-400 uppercase tracking-[0.3em] text-[10px]">Sicherheitscheck</span>
      </div>
    </div>
  );
  }

  return (
    <div className="min-h-screen bg-[#f1f5f9] relative overflow-hidden py-10 px-4 md:px-8 font-sans">
      
      {/* Hintergrund-Deko für Admin-Look (etwas kühler) */}
      <div className="absolute top-[-10%] left-[-5%] w-160 h-160 bg-blue-200/20 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-0 right-[-5%] w-160 h-160 bg-slate-200/30 rounded-full blur-[120px]"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header Section */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <div>
            <span className="text-blue-600 font-black text-[10px] uppercase tracking-[0.4em] mb-2 block">System Administration</span>
            <h1 className="text-5xl font-black text-slate-900 tracking-tight">Dashboard</h1>
          </div>
          
          <div className="flex flex-wrap gap-3">
            <Link 
              href="/admin/bestellungen" 
              className="bg-white/70 backdrop-blur-md border border-white px-6 py-3 rounded-2xl shadow-sm hover:shadow-md hover:bg-white font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2"
            >
              <span>📦</span> Bestellungen
            </Link>
            <button 
              onClick={handleLogout}
              className="bg-red-50/50 backdrop-blur-md text-red-600 border border-red-100/50 px-6 py-3 rounded-2xl hover:bg-red-600 hover:text-white font-black text-xs uppercase tracking-wider transition-all flex items-center gap-2"
            >
              Abmelden
            </button>
          </div>
        </header>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LINKER TEIL: Inventar & Kunden */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Software Verwaltung mit "Alle anzeigen" Link */}
            <section className="bg-white/70 backdrop-blur-2xl rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-white overflow-hidden">
              <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-white/30">
                <h2 className="text-2xl font-black text-slate-800 tracking-tight">Software & Lizenzen</h2>
                <Link href="/admin/software" className="text-blue-600 font-black text-[10px] uppercase tracking-widest hover:underline bg-blue-50 px-4 py-2 rounded-xl border border-blue-100 transition-all">
                  Vollständige Liste →
                </Link>
              </div>
              <div className="p-2">
                <SoftwareVerwaltung />
              </div>
            </section>

            {/* Kunden Management */}
            <section className="bg-white/70 backdrop-blur-2xl rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-white p-8">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-black text-slate-800 tracking-tight">Kunden-Management</h2>
                <Link href="/admin/kunde" className="text-slate-400 font-black text-[10px] uppercase tracking-widest hover:text-blue-600 transition-colors">
                  Alle Kunden (CSV) →
                </Link>
              </div>
              <KundenSuche />
            </section>
          </div>

       {/* RECHTER TEIL: Stats & Schnellzugriff */}
          <div className="lg:col-span-4 space-y-8">
            
            {/* High-End Umsatz-Karte */}
            <div className="bg-slate-900 p-10 rounded-[3rem] text-white shadow-2xl shadow-blue-900/20 relative overflow-hidden group border border-white/5">
              <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#3b82f6_1px,transparent_1px)] bg-size-[16px_16px]"></div>
              
              <div className="relative z-10">
                <h3 className="text-slate-400 text-[10px] font-black uppercase tracking-[0.3em] mb-3">Live Gesamtumsatz</h3>
                <p className="text-6xl font-black tracking-tighter text-white">
                  {Number(umsatz).toLocaleString('de-DE', { minimumFractionDigits: 2 })} 
                  <span className="text-blue-500 ml-2 text-3xl">€</span>
                </p>

                <div className="mt-8 grid grid-cols-2 gap-4 border-t border-white/10 pt-8">
                  <div>
                    <p className="text-slate-500 text-[9px] font-black uppercase tracking-widest mb-1">Ø Warenkorb</p>
                    <p className="text-xl font-bold">
                      {(orders.reduce((sum, o) => sum + Number(o.gesamtpreis), 0) / (orders.length || 1)).toLocaleString('de-DE', { maximumFractionDigits: 2 })} €
                    </p>
                  </div>
                  <div>
                    <p className="text-slate-500 text-[9px] font-black uppercase tracking-widest mb-1">Bestellungen</p>
                    <p className="text-xl font-bold">{orders.length}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Heute-Statistik */}
            <div className="bg-blue-600 p-8 rounded-[2.5rem] text-white shadow-xl relative overflow-hidden">
              <div className="relative z-10">
                <p className="text-blue-200 text-[10px] font-black uppercase tracking-widest mb-1">Heute Erwirtschaftet</p>
                <h3 className="text-3xl font-black">
                  {orders
                    .filter(o => new Date(o.erstelltAm).toLocaleDateString() === new Date().toLocaleDateString())
                    .reduce((sum, o) => sum + Number(o.gesamtpreis), 0)
                    .toLocaleString('de-DE', { minimumFractionDigits: 2 })} €
                </h3>
              </div>
              <div className="absolute right-[-10%] bottom-[-10%] text-6xl opacity-20 rotate-12">📈</div>
            </div>

            {/* Suche & Quick Actions Sticky-Container */}
            <div className="space-y-6 sticky top-10">
              <HerstellerSuche />

              <div className="bg-white/70 backdrop-blur-2xl p-8 rounded-[2.5rem] border border-white shadow-sm">
                <h3 className="font-black text-slate-800 uppercase tracking-widest text-xs mb-6">Quick Actions</h3>
                <div className="grid grid-cols-2 gap-4">
                  <Link href="/admin/herstellerverwaltung" className="flex flex-col items-center justify-center p-6 bg-slate-50 rounded-4xl hover:bg-blue-600 group transition-all">
                    <span className="text-3xl mb-3 group-hover:scale-110 transition-transform">🏢</span>
                    <span className="text-[10px] font-black uppercase text-slate-400 group-hover:text-white tracking-tighter">Hersteller</span>
                  </Link>
                  <Link href="/admin/software/" className="flex flex-col items-center justify-center p-6 bg-slate-50 rounded-4xl hover:bg-blue-600 group transition-all">
                    <span className="text-3xl mb-3 group-hover:scale-110 transition-transform">➕</span>
                    <span className="text-[10px] font-black uppercase text-slate-400 group-hover:text-white tracking-tighter">Neu</span>
                  </Link>
                </div>
              </div>
            </div>
          </div> {/* Ende lg:col-span-4 */}
        </div> {/* Ende grid */}
      </div> {/* Ende max-w-7xl */}
    </div> 
  );
}