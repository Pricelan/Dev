
export async function getSoftware() {
  const res = await fetch("http://localhost:8080/api/software", {
    cache: "no-store",
  });

  console.log("STATUS:", res.status);

  if (!res.ok) {
    const text = await res.text();
    console.error("BACKEND RESPONSE:", text);
    throw new Error("Fehler beim Laden der Software");
  }

  return res.json();
}
const BASE_URL = "http://localhost:8080/api";
export async function apiFetch(endpoint: string, options: RequestInit = {}) {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
        ...options,
        credentials: "include", // Zwingend für die Session!
        headers: {
            "Content-Type": "application/json",
            ...options.headers,
        },
    });

    if (!res.ok) {
        if (res.status === 401) {
            // Falls Session abgelaufen, schick den Admin zum Login
            window.location.href = "/admin/login";
        }
        const errorText = await res.text();
        throw new Error(errorText || `Fehler: ${res.status}`);
    }

    // Falls die Antwort leer ist (z.B. bei DELETE), kein .json() aufrufen
    const contentType = res.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
        return res.json();
    }
    return null;
}