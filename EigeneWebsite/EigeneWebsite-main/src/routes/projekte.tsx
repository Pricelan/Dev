import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ShoppingBag,
  ArrowUpRight,
  GraduationCap,
  Code2,
  Database,
  Globe,
  Github,
} from "lucide-react";

export const Route = createFileRoute("/projekte")({
  head: () => ({
    meta: [
      { title: "Projekte — Portfolio Quereinsteiger IT" },
      {
        name: "description",
        content:
          "Mein erstes abgeschlossenes Projekt aus dem Studium — Idee, Umsetzung und Technologien.",
      },
    ],
  }),
  component: ProjektePage,
});

const shopImages = [
  "/images/Startseite.png",
  "/images/AdminDashboard.png",
  "/images/AdminSoftwareListe.png",
  "/images/Kundenprofil.png",
  "/images/Warenkorb.png",
];

function ProjektePage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false); // Neuer State für die Großansicht

  const nextSlide = () =>
    setCurrentIndex((prev) => (prev === shopImages.length - 1 ? 0 : prev + 1));
  const prevSlide = () =>
    setCurrentIndex((prev) => (prev === 0 ? shopImages.length - 1 : prev - 1));

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") nextSlide();
      if (e.key === "ArrowLeft") prevSlide();
      if (e.key === "Escape") setIsZoomed(false); // Schließen mit ESC
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-6 lg:px-10 py-20">
      <header className="max-w-3xl mb-16">
        <p className="text-sm text-primary font-medium mb-3">Projekte</p>
        <h1 className="font-display text-5xl md:text-6xl font-bold tracking-tight mb-6">
          Online-<span className="text-gradient">Shop</span>
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          Mein erstes Projekt aus dem 1. Semester an der IU: ein vollständiger Online-Shop mit
          Java-Backend, Next.js/Node.js-Frontend in TypeScript und einer MySQL-Datenbank.
        </p>
      </header>

      {/* Hero card mit Image Slider */}
      <div className="relative aspect-[16/9] rounded-3xl border border-border overflow-hidden bg-[#1A1F2C] mb-16 group">
        {/* Das Bild - Jetzt mit 'object-contain' damit nichts abgeschnitten wird */}
        <img
          src={shopImages[currentIndex]}
          alt={`Screenshot ${currentIndex + 1}`}
          onClick={() => setIsZoomed(true)} // Klick öffnet Zoom
          className="absolute inset-0 w-full h-full object-contain cursor-zoom-in transition-all duration-300 hover:scale-[1.02]"
        />

        {/* Dezenter Overlay unten für Text-Lesbarkeit */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

        {/* Navigation Pfeile */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-primary z-10"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-primary z-10"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Info Overlay */}
        <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end pointer-events-none">
          <div className="drop-shadow-lg">
            <p className="font-display text-xl font-semibold text-white">Online-Shop · Einblicke</p>
            <p className="text-sm text-white/70">
              Bild {currentIndex + 1} von {shopImages.length} — Klicken zum Vergrößern
            </p>
          </div>
        </div>
      </div>

      {/* LIGHTBOX / ZOOM-MODAL (Wird nur angezeigt, wenn isZoomed true ist) */}
      {isZoomed && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 md:p-10 cursor-zoom-out"
          onClick={() => setIsZoomed(false)}
        >
          <img
            src={shopImages[currentIndex]}
            className="max-w-full max-h-full object-contain shadow-2xl animate-in zoom-in-95 duration-300"
            alt="Vollbildansicht"
          />
          <button className="absolute top-10 right-10 text-white hover:text-primary transition">
            <span className="text-4xl">×</span>
          </button>
        </div>
      )}

      {/* Details grid */}
      <div className="grid md:grid-cols-3 gap-6 mb-16">
        <div className="p-6 rounded-2xl border border-border bg-surface">
          <GraduationCap className="w-5 h-5 text-primary mb-4" />
          <div className="text-xs uppercase tracking-widest text-muted-foreground mb-2">
            Kontext
          </div>
          <p className="font-display font-semibold">Studium · 1. Semester</p>
          <p className="text-sm text-muted-foreground mt-2">Note: 1,0</p>
        </div>
        <div className="p-6 rounded-2xl border border-border bg-surface">
          <Code2 className="w-5 h-5 text-primary mb-4" />
          <div className="text-xs uppercase tracking-widest text-muted-foreground mb-2">Rolle</div>
          <p className="font-display font-semibold">Fullstack Entwicklung</p>
          <p className="text-sm text-muted-foreground mt-2">Java & TypeScript</p>
        </div>
        <div className="p-6 rounded-2xl border border-border bg-surface">
          <Globe className="w-5 h-5 text-primary mb-4" />
          <div className="text-xs uppercase tracking-widest text-muted-foreground mb-2">Status</div>
          <p className="font-display font-semibold">Abgeschlossen</p>
          <p className="text-sm text-muted-foreground mt-2">Dokumentation auf GitHub</p>
        </div>
      </div>

      {/* Long form sections */}
      <div className="grid md:grid-cols-12 gap-8 mb-16">
        <div className="md:col-span-4">
          <h2 className="font-display text-2xl font-semibold sticky top-24">Idee & Ziel</h2>
        </div>
        <div className="md:col-span-8 space-y-4 text-muted-foreground leading-relaxed">
          <p>
            <span className="text-foreground">Ein vollständiger Online-Shop</span> als
            Studienprojekt: vom Produktkatalog über den Warenkorb bis zur Bestellabwicklung. Ziel
            war es, eine Web-Anwendung mit klarer Trennung von Frontend, Backend und Datenbank
            aufzubauen.
          </p>
          <p>
            In diesem Projekt lag mein Fokus auf der{" "}
            <span className="text-foreground">End-to-End-Verantwortung:</span> Vom Datenbankdesign
            in MySQL über eine robuste Java-API bis hin zum responsiven Frontend. Als Quereinsteiger
            mit langjähriger Erfahrung in prozessorientierten Branchen war es mir wichtig, nicht nur
            eine Oberfläche zu bauen, sondern die gesamte Architektur einer Web-Anwendung zu
            durchdringen. Das Ergebnis ist ein voll funktionsfähiger Lizenzshop, der zeigt, wie ich
            wie ich komplexe Anforderungen in eine saubere, skalierbare Software-Struktur übersetze.
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-12 gap-8 mb-16">
        <div className="md:col-span-4">
          <h2 className="font-display text-2xl font-semibold sticky top-24">Vorgehen</h2>
        </div>
        <div className="md:col-span-8 space-y-6">
          {[
            {
              n: "01",
              t: "Recherche",
              d: "Anforderungen sammeln, ähnliche Lösungen ansehen, Rahmen abstecken.",
            },
            {
              n: "02",
              t: "Konzept",
              d: "Struktur, Wireframes und technische Entscheidungen festhalten.",
            },
            {
              n: "03",
              t: "Umsetzung",
              d: "Frontend, Logik und ggf. Datenbank Schritt für Schritt aufbauen.",
            },
            {
              n: "04",
              t: "Test & Feinschliff",
              d: "Bugs fixen, UX verbessern, Dokumentation schreiben.",
            },
          ].map((s) => (
            <div key={s.n} className="flex gap-5 p-5 rounded-xl border border-border bg-surface">
              <div className="font-mono text-sm text-primary">{s.n}</div>
              <div>
                <h3 className="font-display font-semibold mb-1">{s.t}</h3>
                <p className="text-sm text-muted-foreground">{s.d}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-12 gap-8 mb-16">
        <div className="md:col-span-4">
          <h2 className="font-display text-2xl font-semibold sticky top-24">Technologien</h2>
        </div>
        <div className="md:col-span-8 grid sm:grid-cols-2 gap-4">
          {[
            { icon: Code2, t: "Backend", d: "Java (Spring Boot Architektur)" },
            { icon: Globe, t: "Frontend", d: "Next.js / Node.js · TypeScript" },
            { icon: Database, t: "Datenbank", d: "MySQL (Strukturiertes Datenmodell)" },
            { icon: GraduationCap, t: "Kontext", d: "IU · 1. Semester" },
          ].map((c) => (
            <div key={c.t} className="p-5 rounded-xl border border-border bg-surface">
              <c.icon className="w-5 h-5 text-primary mb-3" />
              <p className="font-display font-semibold">{c.t}</p>
              <p className="text-sm text-muted-foreground mt-1">{c.d}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <a
        href="https://github.com/Pricelan/Dev"
        target="_blank"
        rel="noreferrer"
        className="group flex items-center justify-between gap-4 p-8 rounded-2xl border border-border bg-surface hover:bg-surface-elevated hover:border-primary/40 transition"
      >
        <div className="flex items-start gap-4">
          <Github className="w-6 h-6 text-primary mt-1" />
          <div>
            <div className="text-xs text-primary font-mono mb-2">Code ansehen</div>
            <p className="font-display text-xl font-semibold">Projekt auf GitHub</p>
            <p className="text-sm text-muted-foreground mt-1">
              Hier findest du das Repository mit der vollständigen Implementierung und
              Dokumentation.
            </p>
          </div>
        </div>
        <ArrowUpRight className="w-6 h-6 text-muted-foreground group-hover:text-primary transition" />
      </a>
    </div>
  );
}
