"use client";
import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";
import { Kunde } from "@/types/kunde";


export default function KundenVerwaltung() {
  const [kunden, setKunden] = useState<Kunde[]>([]);

  useEffect(() => {
       apiFetch("/admin/kunden")
      .then(setKunden)
      .catch(console.error);
  }, []);

return (
  <>
    <div className="flex justify-between items-end mb-6">
      <div>
        <h1 className="text-3xl font-black text-gray-900">Kunden-Management</h1>
        <p className="text-gray-500">Insgesamt {kunden.length} registrierte Nutzer</p>
      </div>
      <button className="bg-green-600 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-lg shadow-green-100">
        Excel Export
      </button>
    </div>
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Registrierte Kunden</h1>
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-50 text-gray-600 text-xs uppercase font-semibold">
            <tr>
              <th className="px-6 py-4">ID</th>
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">E-Mail</th>
              <th className="px-6 py-4">Adresse</th>
              <th className="px-6 py-4">Telefonnummer</th>
              <th className="px-6 py-4 text-right">Aktion</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {kunden.map((k) => (
              <tr key={k.id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4 font-mono text-sm">#{k.id}</td>
                <td className="px-6 py-4 font-medium">{k.vorname} {k.nachname}</td>
                <td className="px-6 py-4 text-gray-600">{k.email}</td>
                <td className="px-6 py-4 text-gray-600">{k.strasse}</td>
                <td className="px-6 py-4 text-gray-600">{k.hausnummer}</td>
                <td className="px-6 py-4 text-gray-600">{k.ort}</td>
                <td className="px-6 py-4 text-gray-600">{k.plz}</td>
                <td className="px-6 py-4 text-gray-600">{k.telefonnummer}</td>
                <td className="px-6 py-4 text-right">
                  <button className="text-red-500 hover:text-red-700 text-sm">Sperren</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </>
);
}