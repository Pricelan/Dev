"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";

// Hauptkomponente für die Checkout-Erfolgreich-Seite
export default function CheckoutErfolgreichPage() {
  const params = useSearchParams();
  const orderId = params.get("orderId");

  return (
    <div className="min-h-screen bg-[#f1f5f9] relative overflow-hidden flex items-center justify-center p-6">
      
      {/* Hintergrund-Deko Elemente */}
      <div className="absolute top-[-10%] left-[-5%] w-120 h-120 bg-green-100/40 rounded-full blur-[100px]"></div>
      <div className="absolute bottom-[-10%] right-[-5%] w-120 h-120 bg-blue-100/40 rounded-full blur-[100px]"></div>

      <main className="max-w-lg w-full relative z-10">
        <div className="bg-white/70 backdrop-blur-2xl shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] rounded-[3rem] p-10 md:p-16 border border-white/60 text-center">
          
          {/* Erfolg-Icon */}
          <div className="relative mb-10 inline-block">
            <div className="absolute inset-0 bg-green-400 blur-2xl opacity-20 animate-pulse"></div>
            <div className="relative w-24 h-24 bg-linear-to-br from-green-400 to-emerald-600 rounded-3xl flex items-center justify-center shadow-xl shadow-green-200 text-white">
              <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>

          <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-4">
            Bestellung erfolgreich!
          </h1>

          <p className="text-slate-500 font-medium mb-8 leading-relaxed">
            Vielen Dank für dein Vertrauen. Wir haben dir die Bestelldetails und deine Rechnung per E-Mail gesendet.
          </p>

          {/* Bestellnummer Box */}
          <div className="bg-slate-100/50 border border-slate-200/50 rounded-2xl p-6 mb-10 transition-all hover:bg-white/50">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">Deine Bestellnummer</p>
            {orderId ? (
              <span className="text-2xl font-black text-blue-600 tracking-wider">#{orderId}</span>
            ) : (
              <div className="flex justify-center space-x-1">
                <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <Link 
              href="/kunde/profil" 
              className="block w-full bg-slate-900 hover:bg-blue-600 text-white font-black py-5 rounded-2xl transition-all shadow-xl shadow-slate-200 hover:shadow-blue-200 active:scale-95 uppercase tracking-widest text-xs"
            >
              Bestellung im Profil ansehen
            </Link>
            
            <Link 
              href="/" 
              className="block w-full py-4 text-slate-400 font-bold hover:text-slate-600 transition-colors text-sm"
            >
              Zurück zum Shop
            </Link>
          </div>
        </div>
        
        {/* Support Hinweis */}
        <p className="text-center mt-8 text-slate-400 text-xs font-medium">
          Probleme bei der Bestellung? <span className="text-blue-600 cursor-pointer">Kontaktiere unseren Support</span>
        </p>
      </main>
    </div>
  );
}