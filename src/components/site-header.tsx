import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";

const nav = [
  { href: "/", label: "Inicio" },
  { href: "/courses", label: "Cursos" },
];

export function SiteHeader() {
  return (
    <header className="border-b border-border">
      <div className="mx-auto flex max-w-3xl items-center justify-between gap-6 px-6 py-4">
        <Link href="/" className="font-mono text-sm font-semibold tracking-tight">
          rustic<span className="text-brand">/</span>learnings
        </Link>

        <div className="flex items-center gap-2">
          <nav aria-label="Principal">
            <ul className="flex items-center gap-5 text-sm text-muted-foreground">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="transition-colors hover:text-foreground"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
