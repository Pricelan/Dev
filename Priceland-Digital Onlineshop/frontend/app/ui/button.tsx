import { ReactNode, ButtonHTMLAttributes } from "react";

// Definition der möglichen Button-Varianten
type ButtonVariant = "blue" | "red" | "green" | "purple" | "outline";

// Props für die Button-Komponente
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
}

// Wiederverwendbare Button-Komponente mit Varianten
export function Button({ children, variant = "blue", style, ...props }: ButtonProps) {
 
  type VariantStyle = { bg: string; color: string; border?: string };
  const variants: Record<ButtonVariant, VariantStyle> = {
    blue: { bg: "#0A6CFF", color: "white" },
    red: { bg: "#ef4444", color: "white" },
    green: { bg: "#10b981", color: "white" },
    purple: { bg: "#8b5cf6", color: "white" },
    outline: { bg: "transparent", color: "#64748b", border: "1px solid #e2e8f0" }
  };

  // Auswahl des Stils basierend auf der Variante
  const selected = variants[variant];

  return (
    <button
      {...props}
      style={{
        backgroundColor: selected.bg,
        color: selected.color,
        border: selected.border || "none",
        padding: "10px 20px",
        borderRadius: "8px",
        fontWeight: 600,
        cursor: "pointer",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "opacity 0.2s",
        ...style // Erlaubt zusätzliche Styles von außen
      }}
      onMouseOver={(e) => (e.currentTarget.style.opacity = "0.8")}
      onMouseOut={(e) => (e.currentTarget.style.opacity = "1")}
    >
      {children}
    </button>
  );
}