import React from "react";
import Link from "next/link";

interface SoftwareCardProps {
  software: {
    id: number;
    name: string;
    version: string;
    preis: number;
    hersteller?: { name: string };
    softwareBeschreibung?: string;
  };
  onAddToCart: (id: number) => void; // Neu: Funktion für den Warenkorb
}

export default function SoftwareCard({ software, onAddToCart }: SoftwareCardProps) {
  return (
    <div style={{
      background: "#fff",
      borderRadius: "10px",
      padding: "20px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between"
    }}>
      <Link href={`/software/${software.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <h3 style={{ margin: "0 0 10px 0", cursor: "pointer" }}>
          {software.name} <span style={{ fontSize: "0.8em", color: "#666" }}>({software.version})</span>
        </h3>
      </Link>

      <p style={{ color: "#666", fontSize: "0.9em", flexGrow: 1 }}>
        {software.softwareBeschreibung || "Keine Beschreibung verfügbar."}
      </p>

      <div style={{ marginTop: "15px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontWeight: "bold", fontSize: "1.1em" }}>
          {software.preis === 0 ? "Kostenlos" : `${software.preis.toFixed(2)} €`}
        </span>

        <div style={{ display: "flex", gap: "10px" }}>
          <button
            onClick={() => onAddToCart(software.id)}
            style={{
              padding: "8px 12px",
              borderRadius: "6px",
              border: "none",
              background: "#0066ff",
              color: "white",
              cursor: "pointer",
              fontWeight: "bold"
            }}
          >
            🛒 Kaufen
          </button>
        </div>
      </div>
    </div>
  );
}