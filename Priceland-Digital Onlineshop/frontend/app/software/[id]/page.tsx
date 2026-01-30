"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import SoftwareDetail from "@/app/components/SoftwareDetails"; 
import { Software } from "@/types/software";
import { useWarenkorb } from "@/context/warenkorbContext";
import { getGastToken } from "@/lib/gastToken";

export default function SoftwareDetailPage() {
  const { id } = useParams();
  const [software, setSoftware] = useState<Software | null>(null);
  const [loading, setLoading] = useState(true);
  const { refresh } = useWarenkorb();

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    fetch(`http://localhost:8080/api/software/${id}`)
      .then((res) => res.json())
      .then((data) => setSoftware(data))
      .catch((err) => console.error("Fehler:", err))
      .finally(() => setLoading(false));
  }, [id]);

  // Funktion zum Hinzufügen (Logik direkt hier, damit die Child-Komponente sauber bleibt)
  async function handleAddToCart() {
    if (!software) return;
    const token = getGastToken();

    try {
      const res = await fetch("http://localhost:8080/api/warenkorb/add", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          softwareId: software.id,
          menge: 1,
          gastToken: token,
        }),
      });

      if (!res.ok) throw new Error("Fehler beim Hinzufügen");
      
      await refresh();
      alert(`${software.name} wurde dem Warenkorb hinzugefügt!`);
    } catch (err) {
      console.error(err);
      alert("Hinzufügen fehlgeschlagen");
    }
  }

  // Ladebildschirm passend zum Design
  if (loading || !software) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#f8fafc]">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-slate-500 font-bold uppercase tracking-widest text-[10px]">
          Details werden geladen...
        </p>
      </div>
    );
  }

  // Die SoftwareDetail Komponente regelt jetzt die Links zurück zur Kategorie
  return (
    <SoftwareDetail 
      software={software} 
      addToCart={handleAddToCart} 
    />
  );
}