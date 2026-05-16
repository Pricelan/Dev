export function SiteFooter() {
  return (
    <footer className="border-t border-border mt-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} — Persönliches Portfolio.</p>
        <p className="font-display tracking-wide">Built with focus & coffee ☕</p>
      </div>
    </footer>
  );
}
