"use client";
import "./globals.css";
import { KundeProvider, useKunde } from "@/context/kundeContext";
import { WarenkorbProvider, useWarenkorb } from "@/context/warenkorbContext";
import Link from "next/link";

function Header() {
  const { kunde, logout } = useKunde();
  const { warenkorb } = useWarenkorb();
  
  const artikelAnzahl = warenkorb?.positionen?.reduce((acc, pos) => acc + pos.menge, 0) || 0;

  return (
    <header className="bg-white border-b shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        
        {/* LINKS: Logo */}
        <Link href="/" className="text-2xl font-black text-blue-600 tracking-tighter hover:opacity-80 transition">
          Priceland-Digital <span className="text-gray-900 font-bold">Onlineshop</span>
        </Link>

        {/* RECHTS: Admin, Auth & Warenkorb */}
        <div className="flex items-center gap-6">
          
          {/* Admin-Bereich wieder sichtbar machen */}
          <Link 
            href="/admin/login" 
            className="flex items-center gap-1 text-sm font-semibold text-gray-600 hover:text-blue-600 transition"
          >
            <span className="text-lg">⚙️</span> Admin-Bereich
          </Link>

          {/* Trennlinie */}
          <div className="h-6 w-px bg-gray-200"></div>
        {/* AUTH BEREICH */}
          {kunde ? (
            <div className="flex items-center gap-4 border-l pl-6">
              {/* Das Profil-Icon im Header */}
      <Link href="/kunde/profil" className="flex items-center gap-2 group cursor-pointer">
      <div className="w-9 h-9 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold group-hover:bg-blue-600 group-hover:text-white transition-all">
       {kunde.vorname.charAt(0)}{kunde.nachname.charAt(0)}
      </div>
        <div className="hidden sm:flex flex-col text-left">
        <span className="text-[10px] text-gray-400 uppercase font-bold leading-none">Mein Konto</span>
      < span className="text-sm font-bold text-gray-800 leading-tight">{kunde.vorname}</span>
        </div>
      </Link>   
              
              <button 
                onClick={logout}
                className="text-xs bg-gray-100 hover:bg-red-50 text-gray-500 hover:text-red-600 px-3 py-1.5 rounded-md transition-colors"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link href="/kunde/login" className="text-sm font-bold text-gray-700 hover:text-blue-600 px-3">
                Login
              </Link>
              <Link href="/kunde/register" className="bg-blue-600 text-white px-5 py-2 rounded-lg text-sm font-bold hover:bg-blue-700 transition shadow-md">
                Registrieren
              </Link>
            </div>
          )}

          {/* Warenkorb Button */}
          <Link href="/warenkorb" className="relative p-2.5 bg-gray-100 rounded-full hover:bg-gray-200 transition">
            <span className="text-xl">🛒</span>
            {artikelAnzahl > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white shadow-sm">
                {artikelAnzahl}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <body className="bg-gray-50 antialiased">
        <KundeProvider>
          <WarenkorbProvider>
            <Header />
            <main>{children}</main>
          </WarenkorbProvider>
        </KundeProvider>
      </body>
    </html>
  );
}