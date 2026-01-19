import { getGastToken } from "./gastToken";
import { Warenkorb } from "@/types/warenkorb";

export async function fetchWarenkorb(): Promise<Warenkorb> {
  const token = getGastToken();

  const res = await fetch(
    `http://localhost:8080/api/warenkorb?gastToken=${token}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error("Warenkorb konnte nicht geladen werden");
  }

  return res.json();
}