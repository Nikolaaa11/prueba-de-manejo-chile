"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", label: "Inicio" },
  { href: "/test", label: "Test teorico" },
  { href: "/desafio", label: "Desafio 280" },
  { href: "/agendamiento", label: "Agendar hora" },
  { href: "/calendario", label: "Calendario" },
  { href: "/monitor", label: "Monitor" },
];

export default function SiteHeader() {
  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-50 border-b border-black/[0.06] bg-white/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="flex items-center gap-2">
          <span className="grid h-8 w-8 place-items-center rounded-xl bg-gradient-to-br from-brand to-neon-violet text-lg text-white shadow-sm">
            🚗
          </span>
          <span className="text-lg font-semibold tracking-tight text-ink">
            Licencia <span className="gradient-text">Chile</span>
          </span>
        </Link>
        <nav className="flex flex-wrap items-center gap-1 text-sm">
          {navItems.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-full px-3 py-1.5 transition ${
                  active
                    ? "bg-brand/10 font-medium text-brand"
                    : "text-neutral-500 hover:bg-black/[0.04] hover:text-ink"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
