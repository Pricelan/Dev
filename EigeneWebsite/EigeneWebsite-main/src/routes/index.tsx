import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles } from "lucide-react";
import { PitchVideo } from "@/components/PitchVideo";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Portfolio — Quereinsteiger IT | Elevator Pitch" },
      {
        name: "description",
        content:
          "Quereinsteiger ins IT-Feld — Studium, Praxisprojekte und ein 60-Sekunden-Pitch über meinen Werdegang.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      {/* HERO — Split Screen */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-(--gradient-hero)" />
        <div className="absolute inset-0 bg-grid opacity-60" />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-10 py-20 lg:py-28 grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left: text */}
          <div className="lg:col-span-7 space-y-8 animate-float-up">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-surface/60 backdrop-blur-sm text-xs font-medium text-muted-foreground">
              <Sparkles className="w-3.5 h-3.5 text-primary" />
              Quereinsteiger · 2. Semester · auf der Suche nach Praxis
            </div>

            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight">
              Vom Quereinstieg
              <br />
              in die <span className="text-gradient">IT.</span>
            </h1>

            <p className="text-lg text-muted-foreground max-w-xl leading-relaxed">
              Ich studiere im 2. Semester an der IU und habe mein erstes Projekt bereits im 1.
              Semester mit einer 1.0 abgeschlossen. Hier zeige ich, was entstanden ist — und stelle
              mich in 60 Sekunden persönlich vor.
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <Link
                to="/projekte"
                className="group inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition shadow-[var(--shadow-glow)]"
              >
                Mein Projekt ansehen
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/kontakt"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-border bg-surface/60 backdrop-blur-sm font-medium hover:bg-surface transition"
              >
                Kontakt aufnehmen
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-border max-w-md">
              {[
                { v: "2.", l: "Semester Studium" },
                { v: "1", l: "Projekt fertig" },
                { v: "100%", l: "Motivation" },
              ].map((s) => (
                <div key={s.l}>
                  <div className="font-display text-2xl font-bold text-foreground">{s.v}</div>
                  <div className="text-xs text-muted-foreground mt-1">{s.l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: video */}
          <div className="lg:col-span-5">
            <PitchVideo />
          </div>
        </div>
      </section>

      {/* About teaser */}
      <section className="max-w-7xl mx-auto px-6 lg:px-10 py-20">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5">
            <p className="text-sm text-primary font-medium mb-3">Mein Weg</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight">
              Warum IT — und warum jetzt.
            </h2>
          </div>
          <div className="lg:col-span-7 space-y-4 text-muted-foreground leading-relaxed">
            <p>
              Mein Weg in die IT ist kein gerader, aber er folgt einer klaren Logik. Nach 19 Jahren
              in der Abfallwirtschaft habe ich mich bewusst für das Informatikstudium entschieden.
              Warum? Weil ich jeden Tag sehe, wie wichtig präzise Daten und strukturierte Prozesse
              sind. Probleme zu analysieren und digitale Werkzeuge zu bauen, die echte Lösungen
              bieten, ist genau das, was mich antreibt.
            </p>
            <p>
              Ich studiere im 2. Semester an der{" "}
              <span className="text-foreground">IU Internationalen Hochschule </span>
              anschließend den Master in{" "}
              <span className="text-foreground">KI &amp; Business Analytics</span> an der{" "}
              <span className="text-foreground">FOM</span>. Bachelor bis September 2028,
              Master-Start März 2029.
            </p>
            <Link
              to="/ueber-mich"
              className="inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all"
            >
              Mehr über mich <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Project teaser */}
      <section className="max-w-7xl mx-auto px-6 lg:px-10 py-20">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-sm text-primary font-medium mb-3">Projekte</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight">
              Mein erstes Projekt.
            </h2>
          </div>
          <Link
            to="/projekte"
            className="hidden md:inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition"
          >
            Details ansehen <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <Link
          to="/projekte"
          className="group relative block rounded-2xl border border-border bg-surface p-8 md:p-10 hover:bg-surface-elevated hover:border-primary/40 transition-all duration-500"
        >
          <div className="grid md:grid-cols-12 gap-8 items-start">
            <div className="md:col-span-8 space-y-4">
              <div className="text-xs text-primary font-mono">Semester 1 · Online-Shop</div>
              <h3 className="font-display text-2xl md:text-3xl font-semibold">Online-Shop</h3>
              <p className="text-muted-foreground leading-relaxed max-w-2xl">
                Mein erstes Projekt im Studium an der IU: ein vollständiger Online-Shop mit
                Java-Backend, Next.js/Node.js-Frontend in TypeScript und MySQL-Datenbank. Code auf
                GitHub verfügbar.
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                {["Java", "Next.js", "Node.js", "TypeScript", "MySQL"].map((t) => (
                  <span
                    key={t}
                    className="px-2.5 py-1 rounded-md bg-secondary text-xs text-muted-foreground"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <div className="md:col-span-4 flex md:justify-end">
              <div className="inline-flex items-center gap-2 text-primary font-medium group-hover:gap-3 transition-all">
                Projekt öffnen <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </div>
        </Link>
      </section>
    </>
  );
}
