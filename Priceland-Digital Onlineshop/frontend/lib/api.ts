
const BASE_URL = "http://localhost:8080/api";

export async function apiFetch(endpoint: string, options: RequestInit = {}) {
    // 1. API-Aufruf mit Credentials
    const res = await fetch(`${BASE_URL}${endpoint}`, {
        ...options,
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            ...options.headers,
        },
    });

    // 2. Spezielle Behandlung für 401 Unauthorized
    if (res.status === 401) {
        const path = window.location.pathname;
        const isAdminArea = path.startsWith("/admin");
        const isAuthCheck = endpoint.includes("/auth/me");

        // Wenn wir uns im Admin-Bereich befinden, weiterleiten zum Admin-Login
        if (isAdminArea) {
            window.location.href = "/admin/login";
            return null;
        }

        // Wenn es ein Auth-Check ist, einfach null zurückgeben
        if (isAuthCheck) {
            return null; 
        }
    }

    // 3. Fehlerbehandlung für andere nicht-ok Antworten
    if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText || `Fehler: ${res.status}`);
    }

    // 4. Rückgabe der JSON-Antwort, falls vorhanden
    const contentType = res.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
        return res.json();
    }
    return null;
}

// Funktion zum Abrufen der Softwareliste
export async function getSoftware() {
    return apiFetch("/software", { cache: "no-store" });
}