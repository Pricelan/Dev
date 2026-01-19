"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { apiFetch } from "@/lib/api";
import { Hersteller } from '../../../types/hersteller';


interface SoftwareItem {
  id: number;
  name: string;
  version: string;
  preis: number;
  hersteller?: Hersteller;
         
  };


 

export default function AdminSoftwareList() {
 
  const [software, setSoftware] = useState<SoftwareItem[]>([]);
  const [loading, setLoading] = useState(false);
  

 const handleDelete = async (id: number) => {
  if (!confirm("Möchtest du dieses Produkt wirklich löschen?")) return;

  try {
    // Volle URL zum Backend angeben!
    const res = await fetch(`http://localhost:8080/api/admin/software/löschen/${id}`, {
      method: "DELETE",
      credentials: "include"
    });

    if (!res.ok) {
      alert("Fehler beim Löschen. Status: " + res.status);
      return;
    }

    setSoftware(prev => prev.filter(s => s.id !== id));
  } catch {
    alert("Server nicht erreichbar.");
  }
};


useEffect(() => {
    apiFetch("/software") 
        .then(data => {
            console.log("Daten erhalten:", data); // Zum Debuggen
            setSoftware(data);
        })
        .catch(err => {
            console.error("Laden fehlgeschlagen:", err);
            // Hier passiert die Umleitung, falls nicht eingeloggt
            window.location.href = "/admin/login";
        })
        .finally(() => setLoading(false));
}, []);

 

  if (loading) return <p>Lade Softwaredaten…</p>;

  return (
    <>
      {/* HEADER */}
      <section
        style={{
          background: "linear-gradient(180deg,#1f6bff,#0049c7)",
          color: "white",
          padding: "3.5rem 2rem 3rem",
          textAlign: "center",
          borderBottom: "4px solid #133c96"
        }}
      >
            <Link href="/admin" className="text-white-600 hover:text-white-800 flex items-center gap-2 font-medium">
        ← Zurück zum Dashboard
      </Link>

    
        
       
        <h1 style={{ fontSize: "2.2rem", marginBottom: ".5rem" }}>
          Admin – Softwareverwaltung
        </h1>
     
        <p style={{ opacity: 0.9, fontSize: "0.95rem" }}>
          Produkte verwalten, Preise anpassen & Kategorien organisieren
        </p>
        

        <div style={{ marginTop: "1.8rem" }}>
          <button
            style={{
              padding: "0.75rem 1.6rem",
              borderRadius: "10px",
              border: "none",
              background: "#ffffff",
              color: "#1f6bff",
              cursor: "pointer",
              fontWeight: 700,
              boxShadow:
                "0 6px 22px rgba(0,0,0,.18), inset 0 0 0 2px rgba(0,0,0,.06)"
            }}
          >
  <Link href="/admin/software/new">
  + Neue Software hinzufügen
  </Link>
</button>
        </div>
      </section>

    

      {/* CONTENT */}
      <main style={{ padding: "2.5rem" }}>
        <h2 style={{ marginBottom: "1rem" }}>Alle Softwareprodukte</h2>

        {/* GRID */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "1.8rem"
          }}
        >
          {software.map(item => (
            <div
              key={item.id}
              style={{
                background: "linear-gradient(180deg, #ffffff, #f6f6f6)",
                borderRadius: "16px",
                padding: "1.6rem",
                boxShadow:
                  "0 14px 28px rgba(0,0,0,.12), inset 0 0 0 1px rgba(0,0,0,.06)",
                transition: "transform .15s ease, box-shadow .15s ease",
                cursor: "pointer"
              }}
              onMouseEnter={e =>
                (e.currentTarget.style.transform = "translateY(-4px)")
              }
              onMouseLeave={e =>
                (e.currentTarget.style.transform = "translateY(0)")
              }
              
            >
             {/* TITLE */}
          <h3 style={{ marginTop: 0 }}>
           {item.name}
           <span style={{ opacity: 0.6 }}> ({item.version})</span>
            </h3>

          {/* NEU: HERSTELLER INFO */}
          <div style={{ marginBottom: "0.5rem", fontSize: "0.85rem", color: "#666" }}>
           <strong>Hersteller:</strong> {item.hersteller?.name || "Nicht zugewiesen"}
            </div>

              {/* BADGES */}
              <div style={{ marginTop: ".5rem", marginBottom: ".8rem" }}>
                <span
                  style={{
                    background: "#e9f0ff",
                    color: "#1f56d8",
                    padding: ".35rem .7rem",
                    borderRadius: "20px",
                    fontSize: ".8rem",
                    marginRight: ".5rem"
                  }}
                >
                  ID {item.id}
                </span>

                <span
                  style={{
                    background: "#e6ffee",
                    color: "#1f9a3c",
                    padding: ".35rem .7rem",
                    borderRadius: "20px",
                    fontSize: ".8rem"
                  }}
                >
                  {item.preis != null
                  ? item.preis.toFixed(2) + " €" : "— €"}
                </span>
              </div>

              {/* ACTION BAR */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "1.2rem"
                }}
              >
                <Link href={`/admin/software/bearbeiten/${item.id}`}>
                  <button
                    style={{
                      padding: ".5rem .9rem",
                      borderRadius: "8px",
                      border: "none",
                      background: "#1f6bff",
                      color: "white",
                      cursor: "pointer",
                      fontWeight: 600
                    }}
                  >
                    Bearbeiten
                  </button>
                </Link>

                <button
                  style={{
                    padding: ".5rem .9rem",
                    borderRadius: "8px",
                    border: "none",
                    background: "#ff4d4d",
                    color: "white",
                    cursor: "pointer",
                    fontWeight: 600
                  }}
                  onClick={() => handleDelete(item.id)}
                >
                  Löschen
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}



