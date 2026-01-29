"use client";

import "./Grid.css"; 

// Definition des Typs für ein Software-Item
interface SoftwareItem {
  softwareId: number;
  name: string;
  version: string;
  preis: number;
  hersteller?: {
    name: string;
  };
}

// Props für die Grid-Komponente
interface GridProps {
  software: SoftwareItem[];
}

//  Grid-Komponente
export default function Grid({ software }: GridProps) {
  return (
    <div className="software-grid">
      {software.map((item) => {
        // Logik zur Bestimmung des Designs
        let categoryClass = "card-tools";
        let labelTop = "Professionelle Tools";
        let btnText = "Kategorie anzeigen";

        if (item.preis === 0) {
          categoryClass = "card-gratis";
          labelTop = "Gratis & Open Source";
          btnText = "Gratis entdecken";
        } else if (item.name.toLowerCase().includes("game") || item.preis > 100) { 
          categoryClass = "card-games";
          labelTop = "Abo oder Lizenz";
          btnText = "Games durchsuchen";
        }

        return (
          <div key={item.softwareId} className={`software-card ${categoryClass}`}>
            <h2 className="software-name">{item.name}</h2>
            
            <div className="content-section">
              <span className="category-subtitle">{labelTop}</span>
              <ul className="feature-list">
                <li>Version {item.version}</li>
                {item.hersteller && <li>{item.hersteller.name}</li>}
                <li>Sichere Lizenz</li>
              </ul>
            </div>

            <button className="action-btn">
              {btnText}
            </button>
          </div>
        );
      })}
    </div>
  );
}