"use client"

import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";
import Link from "next/link";
import { Bestellung } from "@/types/bestellung";

export default function AdminOrders() {
  const [orders, setOrders] = useState<Bestellung[]>([]);

  // Funktion zum Laden der Bestellungen
  const loadOrders = () => {
    // Pfad an deinen Controller anpassen (z.B. /api/bestellungen)
    apiFetch("/bestellungen") 
      .then(setOrders)
      .catch(console.error);
  };

  useEffect(() => {
    loadOrders();
  }, []);


  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="p-8 max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <Link href="/admin" className="text-gray-500 hover:text-blue-600 flex items-center gap-2 transition font-medium">
            <span className="text-xl">⌂</span> Dashboard / Bestellungen
          </Link>
          <h1 className="text-3xl font-black text-gray-900">Bestellungs-Management</h1>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50 text-xs uppercase font-bold text-gray-400">
              <tr>
                <th className="px-6 py-4 text-left">ID</th>
                <th className="px-6 py-4 text-left">Kunde</th>
                <th className="px-6 py-4 text-left">Status</th>
                <th className="px-6 py-4 text-left">Summe</th>
                <th className="px-6 py-4 text-left">Datum</th>
                <th className="px-6 py-4 text-right">Aktionen</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
              {orders.map((order: Bestellung) => (
                <tr key={order.id} className="hover:bg-blue-50/50 transition-colors">
                  <td className="px-6 py-4 font-bold text-gray-700">#{order.id}</td>
                  <td className="px-6 py-4 text-gray-600">{order.käuferName}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
                      order.status === 'BEZAHLT' || order.status === 'ABGESCHLOSSEN' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-bold text-gray-900">{Number(order.gesamtpreis).toFixed(2)} €</td>
                  <td className="px-6 py-4 text-gray-500 text-sm">{new Date(order.erstelltAm).toLocaleDateString("de-DE")}</td>
                  <td className="px-6 py-4 text-right flex justify-end gap-3">
                  
                    <button className="text-blue-600 hover:bg-blue-50 px-3 py-1.5 rounded-lg text-xs font-bold transition-all">
                      Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {orders.length === 0 && (
            <div className="p-10 text-center text-gray-400 italic">
              Keine Bestellungen gefunden.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}