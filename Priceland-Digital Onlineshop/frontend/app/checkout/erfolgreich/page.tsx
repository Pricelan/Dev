"use client";

import { useSearchParams } from "next/navigation";



export default function CheckoutErfolgreichPage() {
  const params = useSearchParams();
  const orderId = params.get("orderId");

  

  return (
    
    <div className="max-w-xl mx-auto p-6 text-center">
      <h1 className="text-2xl font-bold mb-4">Bestellung erfolgreich 🎉</h1>

      {orderId && (
        <p className="mb-4">
          Deine Bestellnummer: <strong>#{orderId}</strong>
        </p>
      )}

      <p className="text-gray-600">
        Vielen Dank für deinen Einkauf.
      </p>
    </div>
  );
}