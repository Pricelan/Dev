"use client";

import { useEffect, useState } from "react";
import { getGastToken } from "@/lib/gastToken";
import { Software } from "@/types/software";
import { useWarenkorb } from "@/context/warenkorbContext";
import SoftwareCard from "@/app/components/SoftwareCard";
import Link from "next/link";



export default function SoftwareShopPage() {
  const [software, setSoftware] = useState<Software[]>([]);
 const { refresh } = useWarenkorb();
 
 useEffect(() => {
    fetch("http://localhost:8080/api/software")
      .then(res => res.json())
      .then(data => {
        // FILTER: Nur Einträge mit der Kategorie "GAMES"
        const filtered = data.filter((s: Software) => s.kategorieListe === "GAMES");
        setSoftware(filtered);
      })
      .catch(err => {
        console.error("Fehler beim Laden der Software", err);
      });
  }, []);

 function addToCart(softwareId: number) {
  const token = getGastToken();

  fetch("http://localhost:8080/api/warenkorb/add", {
    method: "POST",
    credentials: "include"  ,
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      softwareId: softwareId,
      menge: 1,
      gastToken: token
    })
  })
    .then(async res => {
      console.log("STATUS:", res.status);
      const text = await res.text();
      console.log("RESPONSE BODY:", text);

      if (!res.ok) {
        throw new Error(text);
      }

      return JSON.parse(text);
    })
    .then(async data => {
      console.log("OK:", data);
      await refresh();
      alert("Produkt wurde dem Warenkorb hinzugefügt");
    })
    .catch(err => {
      console.error("ADD ERROR:", err);
      alert("Fehler beim Hinzufügen zum Warenkorb");
    });
}

  return (
   <div className="p-6 max-w-5xl mx-auto">
      {/* Zurück-Link ganz oben */}
      <Link href="/" className="text-blue-600 hover:underline mb-4 inline-block">
        ← Zurück zur Startseite
      </Link>
    <div className="max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">Games-Shop</h1>
      <p className="text-gray-600 mb-8">
        Wähle ein Spiel aus und lege es in den Warenkorb.
      </p>

      {/* Grid-System für die Karten */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {software.map((s) => (
          <SoftwareCard 
            key={s.id} 
            software={s} 
            onAddToCart={addToCart} 
          />
        ))}
      </div>
    </div>
  </div>
);
}

