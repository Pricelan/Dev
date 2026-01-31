
// Allgemeine API-Fetch-Funktion mit Fehlerbehandlung und Authentifizierung
const BASE_URL = "http://localhost:8080/api";
export async function apiFetch(endpoint: string, options: RequestInit = {}) {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
        ...options,
        credentials: "include", // Cookies für Authentifizierung einschließen
        headers: {
            "Content-Type": "application/json",
            ...options.headers,
        },
    });

    if (!res.ok) {
       if (res.status === 401) {
        // Prüfen, ob der Nutzer gerade im Admin-Bereich unterwegs ist
        const isAdminArea = window.location.pathname.startsWith("/admin");

        if (isAdminArea) {
        window.location.href = "/admin/login";
    }   else {
                window.location.href = "/login"; 
    }
}
        const errorText = await res.text();
        throw new Error(errorText || `Fehler: ${res.status}`);
    }

    // Überprüfung, ob die Antwort JSON-Daten enthält
    const contentType = res.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
        return res.json();
    }
    return null;
}

// Funktion zum Abrufen der Softwareliste vom Backend
export async function getSoftware() {
    return apiFetch("/software", { cache: "no-store" });
}