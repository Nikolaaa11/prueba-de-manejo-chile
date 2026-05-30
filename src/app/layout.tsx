import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Licencia Chile — Prepara tu prueba de manejo",
  description:
    "Practica el examen teorico de licencia de conducir Clase B con preguntas reales basadas en la Ley 18.290, y encuentra donde agendar tu hora para la prueba de manejo en Chile.",
};

const navItems = [
  { href: "/", label: "Inicio" },
  { href: "/test", label: "Test teorico" },
  { href: "/agendamiento", label: "Agendar hora" },
  { href: "/monitor", label: "Monitor de cupos" },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        <header className="bg-brand text-white">
          <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3">
            <Link href="/" className="flex items-center gap-2 font-bold">
              <span className="text-xl">🚗</span>
              <span>Licencia Chile</span>
            </Link>
            <nav className="flex flex-wrap gap-3 text-sm">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded px-2 py-1 hover:bg-white/15"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </header>
        <main className="mx-auto min-h-[70vh] max-w-5xl px-4 py-8">{children}</main>
        <footer className="border-t border-black/10 bg-white">
          <div className="mx-auto max-w-5xl px-4 py-6 text-xs text-gray-500">
            <p>
              Proyecto educativo de codigo abierto. No es un sitio oficial del Estado de
              Chile ni de ninguna municipalidad. El contenido del test se basa en la Ley
              18.290 y material de CONASET, pero puede contener errores u omisiones: verifica
              siempre la normativa vigente en{" "}
              <a className="text-brand underline" href="https://www.conaset.cl" target="_blank" rel="noreferrer">
                conaset.cl
              </a>{" "}
              y{" "}
              <a className="text-brand underline" href="https://www.bcn.cl" target="_blank" rel="noreferrer">
                bcn.cl
              </a>
              .
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
