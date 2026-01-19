"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [passwort, setPasswort] = useState("");
  const [error, setError] = useState(""); // Fehlermeldung im UI statt alert
  const router = useRouter();

  async function handleLogin() {
    setError("");
    try {
      const res = await fetch("http://localhost:8080/api/admin/auth/login", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          username: username, 
          passwort: passwort 
        })
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        setError(errorData.error || "Login fehlgeschlagen. Stimmen 'admin'/'admin'?");
        return;
      }

      // Erfolgreich!
      router.push("/admin");
    } catch {
      setError("Verbindung zum Server fehlgeschlagen.");
    }
  }

  return (
    <div className="flex flex-col items-center p-10 border rounded-xl shadow-lg max-w-sm mx-auto mt-20">
      <h2 className="text-2xl font-bold mb-4">Admin Login</h2>
      
      {error && <p className="text-red-500 mb-4 text-sm">{error}</p>}

      <input 
        className="border p-2 mb-2 w-full rounded"
        placeholder="Username" 
        value={username}
        onChange={e => setUsername(e.target.value)} 
      />
      <input 
        className="border p-2 mb-4 w-full rounded"
        type="password" 
        placeholder="Passwort" 
        value={passwort}
        onChange={e => setPasswort(e.target.value)} 
      />
      
      <button 
        className="bg-blue-600 text-white px-4 py-2 rounded w-full hover:bg-blue-700"
        onClick={handleLogin}
      >
        Login
      </button>
    </div>
  );
}