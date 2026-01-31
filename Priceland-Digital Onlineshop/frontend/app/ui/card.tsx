import { ReactNode } from "react";

// Props für die Card-Komponente
interface CardProps {
  children: ReactNode;
  className?: string; 
}

// Wiederverwendbare Card-Komponente für konsistentes Styling
export function Card({ children, className = "" }: CardProps) {
  return (
    <div 
      className={`custom-card ${className}`}
      style={{
        background: "white",
        borderRadius: "1.25rem", 
        padding: "2rem",         
        border: "1px solid #f1f5f9",
        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        display: "flex",
        flexDirection: "column",
        height: "100%"           
      }}
    >
      {children}
    </div>
  );
}