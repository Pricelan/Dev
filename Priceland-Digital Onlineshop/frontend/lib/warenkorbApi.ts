import { getGastToken } from "./gastToken";
import { Warenkorb } from "@/types/warenkorb";

// Funktion zum Abrufen des Warenkorbs vom Backend
export async function fetchWarenkorb(): Promise<Warenkorb> {
  const token = getGastToken();
// Anfrage an das Backend, um den Warenkorb zu laden
  const res = await fetch(
    `http://localhost:8080/api/warenkorb?gastToken=${token}`,
    { cache: "no-store" }
  );
// Fehlerbehandlung bei fehlgeschlagener Anfrage
  if (!res.ok) {
    throw new Error("Warenkorb konnte nicht geladen werden");
  }
// Rückgabe des Warenkorbs als JSON
  return res.json();
}