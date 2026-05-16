import { createFileRoute } from "@tanstack/react-router";
import { Mail, Linkedin, Github, ArrowUpRight } from "lucide-react";

export const Route = createFileRoute("/kontakt")({
  head: () => ({
    meta: [
      { title: "Kontakt — Portfolio" },
      {
        name: "description",
        content: "Lass uns reden — über Projekte, Rollen oder einfach Kaffee.",
      },
    ],
  }),
  component: ContactPage,
});

const LINKS = [
  {
    icon: Mail,
    label: "E-Mail",
    value: "andy.pricelius@yahoo.com",
    href: "mailto:andy.pricelius@yahoo.com",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "https://linkedin.com/in/andypricelius/",
    href: "https://linkedin.com/in/andypricelius/",
  },
  {
    icon: Github,
    label: "GitHub",
    value: "https://github.com/Pricelan/Dev",
    href: "https://github.com/Pricelan/Dev",
  },
];

function ContactPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 lg:px-10 py-20">
      <header className="mb-16 max-w-3xl">
        <p className="text-sm text-primary font-medium mb-3">Kontakt</p>
        <h1 className="font-display text-5xl md:text-7xl font-bold tracking-tight mb-6">
          Lass uns <span className="text-gradient">reden.</span>
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          Quereinsteiger | Informatik-Student | Fokus: KI & Data Science. Auf der Suche nach einer
          neuen Herausforderung im Data-Umfeld. Lassen Sie uns vernetzen, ich freue mich auf Ihre
          Nachricht!
        </p>
      </header>

      <div className="grid md:grid-cols-3 gap-4 mb-16">
        {LINKS.map((l) => (
          <a
            key={l.label}
            href={l.href}
            className="group p-6 rounded-2xl border border-border bg-surface hover:bg-surface-elevated hover:border-primary/40 transition flex items-start justify-between gap-4"
          >
            <div>
              <l.icon className="w-5 h-5 text-primary mb-4" />
              <div className="text-xs uppercase tracking-widest text-muted-foreground mb-1">
                {l.label}
              </div>
              <div className="font-display font-medium">{l.value}</div>
            </div>
            <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition" />
          </a>
        ))}
      </div>

      {/* CTA card */}
      <div className="relative overflow-hidden rounded-3xl border border-border p-10 md:p-14 bg-surface">
        <div className="absolute inset-0 bg-(--gradient-hero) opacity-80" />
        <div className="relative max-w-2xl">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            Bereit für den nächsten Schritt.
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Ich suche eine Herausforderung im IT-Sektor, um an digitalen Lösungen mitzuwirken. Mein
            Ziel ist es, meine fundierte Berufserfahrung mit meiner Begeisterung für die
            Softwareentwicklung zu vereinen. Lassen Sie uns gemeinsam herausfinden, wie ich Ihr Team
            bereichern kann.
          </p>
          <a
            href="mailto:hallo@deinedomain.de"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition shadow-[var(--shadow-glow)]"
          >
            E-Mail schreiben
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
