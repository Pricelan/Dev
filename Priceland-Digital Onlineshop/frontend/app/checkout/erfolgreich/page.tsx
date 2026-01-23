"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link"; // Wichtig für die Navigation zurück

export default function CheckoutErfolgreichPage() {
  const params = useSearchParams();
  const orderId = params.get("orderId");
  

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-6 text-center">
      {/* Ein schönes Icon macht viel her im Bericht */}
      <div className="mb-6 text-green-500">
        <svg className="w-20 h-20 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>

      <h1 className="text-3xl font-extrabold mb-4 text-gray-800">Bestellung erfolgreich 🎉</h1>

      {orderId ? (
        <div className="bg-green-50 border border-green-100 rounded-lg p-4 mb-6 shadow-sm">
          <p className="text-lg text-green-800">
            Deine Bestellnummer: <span className="font-mono font-bold">#{orderId}</span>
          </p>
        </div>
      ) : (
        <p className="text-red-500 mb-6">Bestellinformationen werden geladen...</p>
      )}

      <p className="text-gray-600 mb-8 max-w-md">
        Vielen Dank für dein Vertrauen! Wir bereiten deine Software-Keys jetzt für den Versand vor.
      </p>

      {/* Button zurück zum Shop zeigt, dass der Flow zu Ende gedacht ist */}
      <Link href="/" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full transition-all shadow-md">
        Zurück zur Startseite
      </Link>
    </div>
  );
}