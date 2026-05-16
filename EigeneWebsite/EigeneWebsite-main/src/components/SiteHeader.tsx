import { Link } from "@tanstack/react-router";

export function SiteHeader() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-background/60 border-b border-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-display font-bold tracking-tight text-lg">
          <span className="w-2.5 h-2.5 rounded-full bg-primary shadow-[0_0_20px_var(--glow)]" />
          <span>portfolio<span className="text-primary">.</span></span>
        </Link>
        <nav className="flex items-center gap-1 text-sm">
          {[
            { to: "/", label: "Start" },
            { to: "/projekte", label: "Projekte" },
            { to: "/ueber-mich", label: "Über mich" },
            { to: "/kontakt", label: "Kontakt" },
          ].map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="px-3 py-2 rounded-md text-muted-foreground hover:text-foreground transition-colors"
              activeProps={{ className: "px-3 py-2 rounded-md text-foreground bg-secondary" }}
              activeOptions={{ exact: true }}
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
