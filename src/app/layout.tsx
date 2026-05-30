import type { Metadata, Viewport } from "next";
import "./globals.css";
import SiteHeader from "@/components/SiteHeader";
import PWARegister from "@/components/PWARegister";

export const metadata: Metadata = {
  title: "Licencia Chile — Prepara tu prueba de manejo",
  description:
    "Practica el examen teorico de licencia de conducir Clase B con preguntas reales basadas en la Ley 18.290, y encuentra cuando agendar tu hora para la prueba de manejo en Chile.",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Licencia Chile",
  },
  other: {
    "mobile-web-app-capable": "yes",
  },
};

export const viewport: Viewport = {
  themeColor: "#070b16",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        <PWARegister />
        <SiteHeader />
        <main className="mx-auto min-h-[70vh] max-w-6xl animate-fadeUp px-4 py-8">
          {children}
        </main>
        <footer className="border-t border-white/10">
          <div className="mx-auto max-w-6xl px-4 py-6 text-xs text-slate-500">
            <p>
              Proyecto educativo de codigo abierto. No es un sitio oficial del Estado de
              Chile ni de ninguna municipalidad. El contenido del test se basa en la Ley
              18.290 y material de CONASET, pero puede contener errores u omisiones: verifica
              siempre la normativa vigente en{" "}
              <a className="text-neon-cyan underline" href="https://www.conaset.cl" target="_blank" rel="noreferrer">
                conaset.cl
              </a>{" "}
              y{" "}
              <a className="text-neon-cyan underline" href="https://www.bcn.cl" target="_blank" rel="noreferrer">
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
