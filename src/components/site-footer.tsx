export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-border">
      <div className="mx-auto flex max-w-3xl flex-col gap-2 px-6 py-8 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} yodak025</p>
        <p>
          Código bajo{" "}
          <a
            href="https://www.gnu.org/licenses/agpl-3.0.html"
            className="underline underline-offset-4 transition-colors hover:text-foreground"
          >
            AGPL-3.0
          </a>
        </p>
      </div>
    </footer>
  );
}
