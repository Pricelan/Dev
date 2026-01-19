"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useKunde } from "@/context/kundeContext";

export default function Login() {
  const { setKunde } = useKunde();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [passwort, setPasswort] = useState("");

  async function submit() {
    const res = await fetch("http://localhost:8080/api/kunden/auth/login", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ 
      email: email, 
      passwort: passwort 
    })
  });
    if (!res.ok) {
    alert("Login fehlgeschlagen. Bitte prüfe E-Mail und Passwort.");
    return;
  }

  const kunde = await res.json();
  setKunde(kunde);
  router.push("/"); 
}

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
      <div className="max-w-md w-full bg-white shadow-xl rounded-2xl p-8 border border-gray-100">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Anmelden</h2>
        
        <div className="space-y-4">
          <input 
            className="w-full p-4 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="E-Mail" 
            onChange={e => setEmail(e.target.value)} 
          />
          <input 
            type="password" 
            className="w-full p-4 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Passwort" 
            onChange={e => setPasswort(e.target.value)} 
          />
          
          <button 
            onClick={submit}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-lg transition shadow-lg mt-4"
          >
            Jetzt einloggen
          </button>
        </div>
        
        <p className="text-center mt-6 text-gray-500 text-sm">
          Noch kein Konto? <a href="/kunde/register" className="text-blue-600 hover:underline">Hier registrieren</a>
        </p>
      </div>
    </div>
  );
}