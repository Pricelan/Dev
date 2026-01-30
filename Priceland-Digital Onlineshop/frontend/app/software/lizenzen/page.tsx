"use client";

import { useEffect, useState } from "react";
import { getGastToken } from "@/lib/gastToken";
import { Software } from "@/types/software";
import { useWarenkorb } from "@/context/warenkorbContext";
import SoftwareCard from "@/app/components/SoftwareCard";
import Link from "next/link";

export default function SoftwareShopPage() {
  const [software, setSoftware] = useState<Software[]>([]);
  const [loading, setLoading] = useState(true);
  const { refresh } = useWarenkorb();

  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:8080/api/software")
      .then((res) => res.json())
      .then((data) => {
        const dataArray = Array.isArray(data) ? data : (data.content || []);
        const filtered = dataArray.filter((s: Software) => s.kategorie === "LIZENZIERTE_SOFTWARE");
        setSoftware(filtered);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  async function addToCart(id: string | number) {
    const softwareId = typeof id === "string" ? parseInt(id, 10) : id;
    const token = getGastToken();
    try {
      const res = await fetch("http://localhost:8080/api/warenkorb/add", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ softwareId, menge: 1, gastToken: token }),
      });
      if (!res.ok) throw new Error();
      await refresh();
      alert("In den Warenkorb gelegt!");
    } catch {
      alert("Fehler beim Hinzufügen");
    }
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] relative overflow-hidden">
      {/* Dekorative Hintergründe wie im Admin */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-100/40 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-100/40 rounded-full blur-[120px] -z-10" />

      <div className="max-w-7xl mx-auto px-6 py-12">
        <header className="mb-16">
          <Link href="/" className="group flex items-center gap-2 text-slate-400 hover:text-blue-600 transition-colors mb-8 no-underline">
            <span className="bg-white p-2 rounded-xl shadow-sm group-hover:shadow-md transition-all">←</span>
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Zurück zur Übersicht</span>
          </Link>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="text-blue-600 font-black text-[10px] uppercase tracking-[0.4em] mb-2 block">Premium Katalog</span>
              <h1 className="text-5xl font-black text-slate-900 tracking-tight">Lizenzen-Shop</h1>
            </div>
            <p className="max-w-md text-slate-500 font-medium leading-relaxed">
              Wählen Sie aus unserem kuratierten Portfolio an Fachsoftware und Enterprise-Lösungen. Sofortige Bereitstellung garantiert.
            </p>
          </div>
        </header>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-32">
            <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-4xl animate-spin mb-6" />
            <p className="text-slate-400 font-black text-[10px] uppercase tracking-widest">Katalog wird synchronisiert</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {software.length > 0 ? (
              software.map((s) => (
                <SoftwareCard key={s.id} software={s} onAddToCart={addToCart} />
              ))
            ) : (
              <div className="col-span-full bg-white/50 backdrop-blur-md border-2 border-dashed border-slate-200 rounded-[3rem] py-32 text-center">
                <p className="text-slate-400 font-bold uppercase tracking-widest">Keine Lizenzen verfügbar</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}