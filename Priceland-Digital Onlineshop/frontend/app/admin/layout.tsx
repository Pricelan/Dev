"use client";
import Link from "next/link";
import "./admin-theme.css";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#f3f5fa]">
      {/* Admin Header */}
      <header className="bg-linear-to-b from-[#1f6bff] to-[#0049c7] text-white p-8 shadow-md">
        <div className="max-w-[1200px] mx-auto flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-bold m-0">Priceland Digital – Admin</h1>
            <p className="opacity-90 mt-1">Verwaltung & Systemadministration</p>
          </div>
          
          {/* Kleine Navigation im Header */}
          <nav className="flex gap-4 text-sm font-medium">
            <Link href="/admin" className="hover:underline">Dashboard</Link>
            <Link href="/admin/software" className="hover:underline">Produkte</Link>
            <Link href="/" className="bg-white/20 px-3 py-1 rounded hover:bg-white/30 transition">
              ← Zum Shop
            </Link>
          </nav>
        </div>
      </header>

      {/* Content Bereich */}
      <main className="p-10 max-w-[1200px] mx-auto">
        <div className="bg-white p-6 rounded-2xl shadow-sm min-h-[60vh]">
          {children}
        </div>
      </main>
    </div>
  );
}