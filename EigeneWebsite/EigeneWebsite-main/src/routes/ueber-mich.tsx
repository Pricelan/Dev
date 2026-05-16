import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/ueber-mich")({
  head: () => ({
    meta: [
      { title: "Über mich — Quereinsteiger IT im Studium" },
      {
        name: "description",
        content:
          "Mein Werdegang: 16 Jahre Berufserfahrung an einer MVA, jetzt Studium an der IU mit Schnitt 1,5.",
      },
    ],
  }),
  component: AboutPage,
});

const SKILLS = [
  {
    cat: "Im Studium",
    items: ["Programmier-Grundlagen", "Web-Entwicklung", "Datenbanken", "IT-Systeme"],
  },
  { cat: "Tools", items: ["VS Code", "Git & GitHub", "Browser DevTools", "Figma"] },
  { cat: "Sprachen", items: ["Java", "TypeScript / JavaScript", "MySQL", "HTML & CSS"] },
  { cat: "Mindset", items: ["Lernbereitschaft", "Selbstdisziplin", "Problemlösung", "Neugier"] },
];

const TIMELINE = [
  {
    year: "ab März 2029",
    role: "Master geplant",
    company: "FOM Hochschule",
    desc: "Geplanter Start des Masters in Künstliche Intelligenz und Business Analytics.",
  },
  {
    year: "bis September 2028",
    role: "Bachelor-Abschluss (Ziel)",
    company: "IU Internationale Hochschule",
    desc: "Mein Ziel: Abschluss des Bachelorstudiums an der IU bis September 2028.",
  },
  {
    year: "Heute · 2. Semester",
    role: "Studium Informatik",
    company: "IU Internationale Hochschule",
    desc: "Aktuell 10 Module abgeschlossen, eines noch ausstehend. Mein erstes Projekt — ein Online-Shop — habe ich bereits im 1. Semester abgeschlossen.",
  },
  {
    year: "seit 2010",
    role: "Fachkraft für Verwiegung & Abfallkontrolle",
    company: "MVA Weisweiler · Waage-Bereich",
    desc: "Über 16 Jahre Berufserfahrung in der Eingangskontrolle einer Müllverbrennungsanlage. 5 Jahre davon als stellvertretender Betriebsleiter in der Eingangskontrolle.",
  },
  {
    year: "2007 – 2010",
    role: "Berufsausbildung",
    company: "Fachkraft für Kreislauf- und Abfallwirtschaft",
    desc: "Solide Ausbildung mit Schwerpunkt auf Umwelttechnik und Abfallwirtschaft.",
  },
];

// Modulnoten — Schnitt 1,5 · 9/10 abgeschlossen, 1 Ergebnis ausstehend
// Bitte echte Modulnamen + Noten an mich schicken, dann trage ich sie hier ein.
const MODULES: Array<{ n: string; t: string; grade: string; pending?: boolean }> = [
  { n: "M01", t: "Einführung Informatik", grade: "1.7" },
  { n: "M02", t: "Einführung in das wissenschaftliche Arbeiten", grade: "2.0" },
  { n: "M03", t: "Grundlagen der objektorientierten Programmierung mit Java", grade: "1.7" },
  { n: "M04", t: "Requirements Engineering", grade: "1.7" },
  { n: "M05", t: "Projekt: Einstieg in die Web-Programmierung", grade: "1.0" },
  { n: "M06", t: "Einführung in Datenschutz und IT-Sicherheit", grade: "2.0" },
  { n: "M07", t: "Mathematik Grundlagen", grade: "1.3" },
  { n: "M08", t: "Datenmodellierung und Datenbanksysteme", grade: "1.3" },
  { n: "M09", t: "Digitale Businessmodelle", grade: "1.7" },
  { n: "M10", t: "Datenstrukturen und Java-Klassenbibliothek", grade: "ausstehend", pending: true },
];

function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 lg:px-10 py-20">
      <header className="mb-16">
        <p className="text-sm text-primary font-medium mb-3">Über mich</p>
        <h1 className="font-display text-5xl md:text-6xl font-bold tracking-tight mb-8">
          Quereinsteiger mit <span className="text-gradient">klarem Ziel</span>.
        </h1>
        <div className="text-lg text-muted-foreground leading-relaxed max-w-3xl space-y-4">
          <p>
            Ich bin <span className="text-foreground">Jahrgang 1988</span> und seit 2010 als{" "}
            <span className="text-foreground">Fachkraft für Verwiegung und Abfallkontrolle</span> an
            der MVA Weisweiler im Waage-Bereich tätig mit über 16 Jahre Berufserfahrung, davon 5
            stellvertretender Betriebsleiter in der Eingangskontrolle.
          </p>
          <p>
            Heute studiere ich im 2. Semester an der{" "}
            <span className="text-foreground">IU Internationalen Hochschule</span> Quereinsteiger in
            die IT. Strukturiertes Arbeiten, Verantwortung und Prozessdenken bringe ich mit, die
            technischen Grundlagen baue ich gerade systematisch auf.
          </p>
          <p>
            Mein Plan: Bachelor bis <span className="text-foreground">September 2028</span>,
            anschließend ab <span className="text-foreground">März 2029</span> der Master in{" "}
            <span className="text-foreground">Künstliche Intelligenz &amp; Business Analytics</span>{" "}
            an der <span className="text-foreground">FOM Hochschule</span>. Parallel suche ich den
            Einstieg in die Praxis.
          </p>
        </div>
      </header>

      {/* Studienleistung */}
      <section className="mb-20">
        <div className="flex items-end justify-between mb-8 flex-wrap gap-4">
          <div>
            <p className="text-sm text-primary font-medium mb-2">Studienleistung</p>
            <h2 className="font-display text-2xl font-semibold">Notenübersicht</h2>
          </div>
          <div className="text-right">
            <div className="font-mono text-xs text-muted-foreground">Aktueller Schnitt</div>
            <div className="font-display text-3xl font-bold text-gradient">1,5</div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="p-5 rounded-2xl border border-border bg-surface">
            <div className="text-xs uppercase tracking-widest text-muted-foreground mb-2">
              Belegt
            </div>
            <div className="font-display text-2xl font-bold">10</div>
          </div>
          <div className="p-5 rounded-2xl border border-border bg-surface">
            <div className="text-xs uppercase tracking-widest text-muted-foreground mb-2">
              Bewertet
            </div>
            <div className="font-display text-2xl font-bold">9</div>
          </div>
          <div className="p-5 rounded-2xl border border-border bg-surface">
            <div className="text-xs uppercase tracking-widest text-muted-foreground mb-2">
              Ausstehend
            </div>
            <div className="font-display text-2xl font-bold">1</div>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-surface overflow-hidden">
          <div className="grid grid-cols-12 px-6 py-3 border-b border-border text-xs uppercase tracking-widest text-muted-foreground">
            <div className="col-span-2">Nr.</div>
            <div className="col-span-7">Modul</div>
            <div className="col-span-3 text-right">Note</div>
          </div>
          {MODULES.map((m) => (
            <div
              key={m.n}
              className="grid grid-cols-12 px-6 py-4 border-b border-border last:border-b-0 items-center hover:bg-surface-elevated transition"
            >
              <div className="col-span-2 font-mono text-xs text-primary">{m.n}</div>
              <div className="col-span-7 font-display font-medium">{m.t}</div>
              <div className="col-span-3 text-right">
                {m.pending ? (
                  <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-secondary text-xs text-muted-foreground">
                    ausstehend
                  </span>
                ) : (
                  <span className="font-mono text-base font-semibold">{m.grade}</span>
                )}
              </div>
            </div>
          ))}
        </div>
        <p className="text-xs text-muted-foreground mt-4">
          Modulnamen und Einzelnoten ergänze ich, sobald ich sie geliefert bekomme.
        </p>
      </section>

      {/* Skills */}
      <section className="mb-20">
        <h2 className="font-display text-2xl font-semibold mb-8">Was ich mitbringe</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {SKILLS.map((s) => (
            <div key={s.cat} className="p-6 rounded-2xl border border-border bg-surface">
              <div className="text-xs uppercase tracking-widest text-primary mb-4">{s.cat}</div>
              <ul className="space-y-2">
                {s.items.map((i) => (
                  <li key={i} className="text-sm text-muted-foreground">
                    {i}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section>
        <h2 className="font-display text-2xl font-semibold mb-8">Mein Weg</h2>
        <div className="relative space-y-8 border-l border-border pl-8">
          {TIMELINE.map((t) => (
            <div key={t.year} className="relative">
              <div className="absolute -left-[37px] top-2 w-3 h-3 rounded-full bg-primary shadow-[0_0_16px_var(--glow)]" />
              <div className="font-mono text-xs text-primary mb-1">{t.year}</div>
              <h3 className="font-display text-xl font-semibold">{t.role}</h3>
              <div className="text-sm text-muted-foreground mb-2">{t.company}</div>
              <p className="text-muted-foreground leading-relaxed max-w-2xl">{t.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
