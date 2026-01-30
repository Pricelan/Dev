"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Hilfsfunktion für aktiven Link-Style
  const isActive = (path: string) => pathname === path;

  return (
    <div className="min-h-screen bg-[#f1f5f9] relative overflow-hidden font-sans">
      
      {/* Hintergrund-Akzente (identisch zum Dashboard für Konsistenz) */}
      <div className="absolute top-[-5%] left-[-2%] w-140 h-140 bg-blue-100/30 rounded-full blur-[100px]"></div>
      <div className="absolute bottom-[-5%] right-[-2%] w-120 h-120 bg-slate-200/40 rounded-full blur-[100px]"></div>

      {/* Modern Admin Header */}
      <header className="z-20 border-b border-slate-200/50 bg-white/60 backdrop-blur-md sticky top-0">
        <div className="max-w-7xl mx-auto px-6 md:px-8 py-5 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center shadow-lg shadow-slate-200">
              <span className="text-white font-black text-xl">P</span>
            </div>
            <div>
              <h1 className="text-xl font-black text-slate-900 leading-none">Priceland</h1>
              <span className="text-[10px] font-black text-blue-600 uppercase tracking-[0.3em]">Admin Suite</span>
            </div>
          </div>
          
          <nav className="hidden md:flex items-center gap-1 bg-slate-100/50 p-1 rounded-2xl border border-slate-200/40">
            <Link 
              href="/admin" 
              className={`px-5 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
                isActive("/admin") ? "bg-white text-blue-600 shadow-sm" : "text-slate-400 hover:text-slate-600"
              }`}
            >
              Dashboard
            </Link>
            <Link 
              href="/admin/software" 
              className={`px-5 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
                isActive("/admin/software") ? "bg-white text-blue-600 shadow-sm" : "text-slate-400 hover:text-slate-600"
              }`}
            >
              Produkte
            </Link>
          </nav>

          <Link 
            href="/" 
            className="text-xs font-black uppercase tracking-widest text-slate-900 bg-white border border-slate-200 px-5 py-2.5 rounded-xl hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all shadow-sm active:scale-95"
          >
            ← Shop
          </Link>
        </div>
      </header>

      {/* Main Content Bereich */}
      <main className="relative z-10 max-w-7xl mx-auto p-6 md:p-8">
        {/* Wir entfernen hier die umschließende weiße Box, da deine Unterseiten (Dashboard) eigene Karten-Designs haben */}
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
          {children}
        </div>
      </main>

      {/* Footer / Status Bar */}
      <footer className="max-w-7xl mx-auto px-8 py-10 flex justify-between items-center">
        <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">
          &copy; 2026 Priceland Digital – Internal Systems
        </p>
        <div className="flex gap-4">
           <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
        </div>
      </footer>
    </div>
  );
}