"use client";

import "./globals.css";
import { KundeProvider, useKunde } from "@/context/kundeContext";
import { WarenkorbProvider, useWarenkorb } from "@/context/warenkorbContext";
import Link from "next/link";

// Header-Komponente mit Navigation und Auth-Bereich
function Header() {
  const { kunde, logout } = useKunde();
  const { warenkorb } = useWarenkorb();
  
  // Berechnung der Artikelanzahl im Warenkorb
  const artikelAnzahl = warenkorb?.positionen?.reduce((acc, pos) => acc + pos.menge, 0) || 0;

return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* LINKS: Logo */}
          <Link href="/" className="group flex items-center gap-2">
            <span className="text-2xl font-black bg-linear-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent tracking-tighter transition group-hover:opacity-80">
              Priceland-Digital
            </span>
            <span className="hidden md:inline text-gray-900 font-bold text-lg">Onlineshop</span>
          </Link>

          {/* RECHTS: Navigation & Auth */}
          <div className="flex items-center gap-2 sm:gap-6">
            
            {/* Admin-Link */}
            <Link 
              href="/admin/login" 
              className="hidden sm:flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-blue-600 transition-colors"
            >
              <span className="text-base">⚙️</span> 
              <span>Admin</span>
            </Link>

            {/* Vertikale Trennlinie */}
            <div className="hidden sm:block h-6 w-px bg-gray-200"></div>

            {/* AUTH BEREICH */}
            {kunde ? (
              <div className="flex items-center gap-3">
                <Link href="/kunde/profil" className="flex items-center gap-2 px-2 py-1 rounded-full hover:bg-gray-50 transition">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold shadow-sm">
                    {kunde.vorname.charAt(0)}{kunde.nachname.charAt(0)}
                  </div>
                  <span className="hidden lg:block text-sm font-semibold text-gray-700">{kunde.vorname}</span>
                </Link>
                
                <button 
                  onClick={logout}
                  className="text-xs font-medium text-gray-400 hover:text-red-500 transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2 sm:gap-4">
                <Link href="/kunde/login" className="text-sm font-semibold text-gray-600 hover:text-blue-600 transition">
                  Login
                </Link>
                <Link href="/kunde/register" className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-bold hover:bg-blue-700 transition shadow-md active:scale-95">
                  Registrieren
                </Link>
              </div>
            )}

            {/* Warenkorb Icon */}
            <Link href="/warenkorb" className="relative p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-full transition">
              <span className="text-2xl">🛒</span>
              {artikelAnzahl > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-bold min-w-[18px] h-[18px] px-1 flex items-center justify-center rounded-full border-2 border-white animate-in zoom-in">
                  {artikelAnzahl}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" className="scroll-smooth">
      <body className="bg-slate-50 text-gray-900 selection:bg-blue-100 selection:text-blue-700 antialiased">
        <KundeProvider>
          <WarenkorbProvider>
            <div className="flex flex-col min-h-screen">
              <Header />
              
              {/*Hauptbereich */}
              <main className="grow">
                {children}
              </main>

              <footer className="bg-white border-t border-gray-200 text-gray-500 py-8 mt-auto">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-xs tracking-wide">
                  &copy; {new Date().getFullYear()} PRICELAND-DIGITAL. Alle Rechte vorbehalten.
                </div>
              </footer>
            </div>
          </WarenkorbProvider>
        </KundeProvider>
      </body>
    </html>
  );
}