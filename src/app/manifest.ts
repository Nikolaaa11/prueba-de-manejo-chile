import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Licencia Chile — Prueba de manejo",
    short_name: "Licencia Chile",
    description:
      "Practica el examen teorico Clase B y encuentra cuando agendar tu hora para la prueba de manejo en Chile.",
    start_url: "/",
    display: "standalone",
    background_color: "#f5f5f7",
    theme_color: "#ffffff",
    orientation: "portrait",
    categories: ["education", "productivity"],
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml", purpose: "any" },
      { src: "/icon-maskable.svg", sizes: "any", type: "image/svg+xml", purpose: "maskable" },
    ],
  };
}
