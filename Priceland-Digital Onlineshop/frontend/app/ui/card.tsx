import { ReactNode } from "react";
import { UI } from "../designToken";

interface CardProps {
  children: ReactNode;
}

export function Card({ children }: CardProps) {
  return (
    <div style={{
      background: "white",
      borderRadius: UI.radius.card,
      padding: UI.spacing.card,
      boxShadow: UI.shadow.card
    }}>
      {children}
    </div>
  );
}