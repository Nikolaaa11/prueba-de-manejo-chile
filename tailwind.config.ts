import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Tema claro estilo Apple
        ink: {
          DEFAULT: "#1d1d1f", // texto principal (gris casi negro de Apple)
          800: "#2a2a2e",
          700: "#3a3a3e",
        },
        // Acentos (se mantienen los nombres "neon-*" pero apuntan a la paleta Apple)
        neon: {
          cyan: "#0071e3", // azul Apple
          blue: "#0071e3",
          violet: "#5e5ce6", // indigo Apple
          pink: "#ff375f",
        },
        brand: {
          DEFAULT: "#0071e3",
          dark: "#0066cc",
          light: "#f5f5f7",
        },
        flag: {
          red: "#d70015",
          blue: "#0071e3",
        },
      },
      boxShadow: {
        // Sombras suaves estilo Apple
        glow: "0 6px 24px -6px rgba(0,0,0,0.12)",
        "glow-violet": "0 6px 24px -6px rgba(94,92,230,0.25)",
        soft: "0 1px 3px rgba(0,0,0,0.06), 0 8px 24px -12px rgba(0,0,0,0.12)",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.4" },
        },
        floaty: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
      animation: {
        fadeUp: "fadeUp 0.5s ease-out both",
        pulseGlow: "pulseGlow 2s ease-in-out infinite",
        floaty: "floaty 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
