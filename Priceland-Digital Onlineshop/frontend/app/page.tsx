"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import SoftwareCard from "@/app/components/SoftwareCard";
import { useWarenkorb } from "../context/warenkorbContext"; 
import { getGastToken } from "@/lib/gastToken";
import { Hersteller } from '@/types/hersteller';




interface Software {
  id: number;
  name: string;
  version: string;
  preis: number;
  softwareBeschreibung?: string;
  downloadLink?: string;
  kategorie?: string;   
  hersteller?: Hersteller;
}




export default function Startseite() {
  const { refresh } = useWarenkorb();
  const [softwareListe, setSoftwareListe] = useState<Software[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filterung findet erst statt, wenn Daten da sind
  const softwareLizenzen = softwareListe.filter(s => s.kategorie === "SOFTWARE");
  const freeware = softwareListe.filter(s => s.kategorie === "FREEWARE");
  const games = softwareListe.filter(s => s.kategorie === "GAMES");

  // Fetch-Funktion im useEffect
  useEffect(() => {
    fetch("http://localhost:8080/api/software")
      .then(res => {
        if (!res.ok) throw new Error("Backend Antwortfehler: " + res.status);
        return res.json();
      })
      .then(data => {
        setSoftwareListe(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(err => {
        console.error("Fetch Fehler:", err);
        setError("Verbindung zum Server fehlgeschlagen.");
        setLoading(false);
      });
  }, []);

  async function handleAddToCart(id: number) {
    const token = getGastToken();
    try {
      const res = await fetch("http://localhost:8080/api/warenkorb/add", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ softwareId: id, menge: 1, gastToken: token })
      });

      if (res.ok) {
        await refresh();
        alert("Erfolgreich hinzugefügt!");
      }
    } catch (err) {
      console.error("Warenkorb Fehler:", err);
    }
  }

  if (loading) return <p style={{ textAlign: "center", padding: "50px" }}>Daten werden geladen...</p>;
  if (error) return <p style={{ textAlign: "center", color: "red", padding: "50px" }}>{error}</p>;

 


return (

  <>
   

     <main>
      {/* HEADER BEREICH (NUR TEXT) */}
<div style={{
  textAlign: "center",
  padding: "80px 20px",
  background: "#0A6CFF",
  color: "white",
  marginBottom: "40px"
}}>
  <h1 style={{ fontSize: "3rem", fontWeight: "800", marginBottom: "15px", letterSpacing: "-1px" }}>
    Priceland Digital
  </h1>
  <p style={{ fontSize: "1.2rem", opacity: 0.9, maxWidth: "600px", margin: "0 auto" }}>
    Entdecke hochwertige Software, Games und professionelle Tools für deinen digitalen Alltag.
  </p>
</div>
      {/* VORTEILE BEREICH */}
<div style={{
  display: "grid",
  gridTemplateColumns: "repeat(4, 1fr)",
  textAlign: "center",
  padding: "25px 60px",
  fontSize: "14px",
  fontWeight: "bold"
}}>
  <div>⚡ Software aktiviert</div>
  <div>🔒 100% Sicher</div>
  <div>📞 24/7 Support</div>
  <div>💵 30 Tage Geld-zurück</div>
</div>
 <h2 style={{ textAlign:"center", marginTop:"30px" }}>
  Unsere Kategorien
</h2>

<p style={{ textAlign:"center", marginBottom:"20px" }}>
  Finden Sie genau das, was Sie benötigen
</p>

<div style={{
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: "20px",
  padding: "20px 60px"
}}>
  <div style={{
  background: "#f5f5f5",
  padding: "20px",
  borderRadius: "10px"
}}>
  
  
  <h2>Softwarelizenzen</h2>

  {softwareLizenzen.map(s => (
  <SoftwareCard
    key={s.id}
    software={s}
    onAddToCart={() => handleAddToCart(s.id)} // handleAddToCart wird verwendet
  />
))}

  <p>Professionelle Tools</p>

  <ul>
    <li>Office 365</li>
    <li>Adobe Produkte</li>
    <li>Windows 11 Pro</li>
  </ul>
  <Link href="/software/lizenzen">
  <button style={{
    marginTop: "10px",
    padding: "8px 12px",
    borderRadius: "6px",
    border: "none",
    background: "#0A6CFF",
    color: "white",
    cursor: "pointer"
  }}>
    Kategorie anzeigen
  </button>
  </Link>
</div>
<div style={{
  background: "#f5f5f5",
  padding: "20px",
  borderRadius: "10px"
}}>
  <h2>Kostenlose Software</h2>
 <p>Gratis & Open Source</p>

{freeware.map(s => (
  <SoftwareCard
    key={s.id}
    software={s}
    onAddToCart={() => handleAddToCart(s.id)} // handleAddToCart wird verwendet
  />
))}
  

  <ul>
    <li>LibreOffice</li>
    <li>VLC Media Player</li>
    <li>7-Zip Archivierer</li>
  </ul>
  <Link href="/software/kostenlos">
  <button style={{
    marginTop: "10px",
    padding: "8px 12px",
    borderRadius: "6px",
    border: "none",
    background: "green",
    color: "white",
    cursor: "pointer"
  }}>
    Gratis entdecken
  </button>
  </Link>
</div>
<div style={{
  background: "#f5f5f5",
  padding: "20px",
  borderRadius: "10px"
}}>
  <h2>Games</h2>
  <p>Abo oder Lizenz</p>


{games.map(s => (
    <SoftwareCard
      key={s.id}
      software={s}
      
      onAddToCart={() => handleAddToCart(s.id)} 
    />
  ))}

  

  <ul>
    <li>Steam Keys</li>
    <li>Indie Games</li>
    <li>Triple AAA Games</li>
  </ul>
<Link href="/software/games">
  <button style={{
    marginTop: "10px",
    padding: "8px 12px",
    borderRadius: "6px",
    border: "none",
    background: "purple",
    color: "white",
    cursor: "pointer"
  }}>
    Games durchsuchen
  </button>
  </Link>
</div>
</div>
      

     
      
  <div style={{
  background:"#f5f7ff",
  padding:"60px 0",
  marginTop:"40px"
}}>
  
  <h2 style={{ textAlign:"center" }}>Abo Modelle</h2>
  <p style={{ textAlign:"center", marginBottom:"30px" }}>
    Wählen Sie das passende Modell für Ihre Bedürfnisse
  </p>

  <div style={{
    display:"grid",
    gridTemplateColumns:"repeat(3, 1fr)",
    maxWidth:"1200px",
    margin:"0 auto",
    gap:"25px"
  }}>
    <div style={{
      background:"white",
      padding:"20px",
      borderRadius:"14px",
      boxShadow:"0 6px 24px rgba(0,0,0,0.10)"
    }}>
      <h3>Basic</h3>
      <p>Für Einsteiger</p>

      <h2>€9,99 / Monat</h2>

      <ul>
        <li>✔ 5 Software Lizenzen</li>
        <li>✔ Zugriff auf Free Software</li>
      </ul>

      <button
        onClick={() => alert("Danke! Dein Basic-Abo wurde simuliert bestellt.")}
        style={{
          marginTop:"10px",
          background:"#0A6CFF",
          color:"white",
          border:"none",
          padding:"8px 16px",
          borderRadius:"8px",
          cursor:"pointer"
        }}
      >
        Wählen
      </button>
    </div>
    <div style={{
      background:"#0A6CFF",
      color:"white",
      padding:"20px",
      borderRadius:"14px",
      boxShadow:"0 10px 28px rgba(0,0,0,0.15)"
    }}>
      <h3>Pro</h3>
      <p>Für Profis</p>

      <h2>€19,99 / Monat</h2>

      <ul>
        <li>✔ Unlimitierte Software</li>
        <li>✔ Zugriff auf Games</li>
        <li>✔ Priority Support</li>
      </ul>

      <button
        onClick={() => alert("Danke! Dein Pro-Abo wurde simuliert bestellt.")}
        style={{
          marginTop:"10px",
          background:"white",
          color:"#0A6CFF",
          border:"none",
          padding:"8px 16px",
          borderRadius:"8px",
          cursor:"pointer"
        }}
      >
        Wählen
      </button>
    </div>

    <div style={{
      background:"white",
      padding:"20px",
      borderRadius:"14px",
      boxShadow:"0 6px 24px rgba(0,0,0,0.10)"
    }}>
      <h3>Enterprise</h3>
      <p>Für Teams</p>

      <h2>€49,99 / Monat</h2>

      <ul>
        <li>✔ Teamverwaltung</li>
        <li>✔ Account Manager</li>
      </ul>

      <button
        onClick={() => alert("Danke! Dein Enterprise-Abo wurde simuliert bestellt.")}
        style={{
          marginTop:"10px",
          background:"#16a34a",
          color:"white",
          border:"none",
          padding:"8px 16px",
          borderRadius:"8px",
          cursor:"pointer"
        }}
      >
        Wählen
      </button>
    </div>
  </div>
</div>
    

  <div style={{
  textAlign:"center",
  marginTop:"50px",
  padding:"30px 0"
}}>
  <h3>Bleiben Sie informiert</h3>
  <p>Erhalten Sie aktuelle Software-Angebote & Updates</p>

  <input
    type="email"
    placeholder="Ihre E-Mail Adresse"
    style={{
      padding:"10px",
      borderRadius:"8px",
      border:"1px solid #ccc",
      width:"260px",
      marginRight:"10px"
    }}
  />

  <button
    style={{
      background:"#0A6CFF",
      color:"white",
      border:"none",
      padding:"10px 18px",
      borderRadius:"8px",
      cursor:"pointer"
    }}
    onClick={() => alert("Danke! Newsletter Anmeldung simuliert.")}
  >
    Abonnieren
  </button>
</div>

    </main>
  </>
  );
}

