"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import SoftwareDetail from "@/app/components/SoftwareDetails"; 
import { Software } from "@/types/software";
import { useWarenkorb } from "@/context/warenkorbContext";
import { getGastToken } from "@/lib/gastToken";
import { apiFetch } from "@/lib/api";

// Hauptkomponente für die Software-Detailseite
export default function SoftwareDetailPage() {
  const { id } = useParams();
  const [software, setSoftware] = useState<Software | null>(null);
  const [loading, setLoading] = useState(true);
  const { refresh } = useWarenkorb();

  // useEffect Hook zum Laden der Software-Daten beim Initialisieren
  useEffect(() => {
    if (!id) return;
    setLoading(true);
    apiFetch(`/software/${id}`)
      .then((res) => res.json())
      .then((data) => setSoftware(data))
      .catch((err) => console.error("Fehler:", err))
      .finally(() => setLoading(false));
  }, [id]);

  // Funktion zum Hinzufügen der Software zum Warenkorb
  async function handleAddToCart() {
    if (!software) return;
    const token = getGastToken();

    try {
      const res = await apiFetch("/warenkorb/add", {
        method: "POST",
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

  // Anzeige eines Ladezustands, wenn die Software-Daten noch geladen werden
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

  // Anzeige der Software-Details
  return (
    <SoftwareDetail 
      software={software} 
      addToCart={handleAddToCart} 
    />
  );
}