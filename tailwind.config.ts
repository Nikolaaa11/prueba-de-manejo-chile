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
        // Aparicion "con rebote" de las preguntas que salen en la ruleta.
        pop: {
          "0%": { opacity: "0", transform: "scale(0.6)" },
          "60%": { opacity: "1", transform: "scale(1.08)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        // Papelillos del anuncio "empieza el desafio".
        confetti: {
          "0%": { opacity: "1", transform: "translateY(-10vh) rotate(0deg)" },
          "100%": { opacity: "0", transform: "translateY(110vh) rotate(720deg)" },
        },
        // Latido del titulo del desafio.
        heartbeat: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.06)" },
        },
        // Numero de la cuenta regresiva 3-2-1.
        countIn: {
          "0%": { opacity: "0", transform: "scale(2.2)" },
          "40%": { opacity: "1", transform: "scale(1)" },
          "100%": { opacity: "0", transform: "scale(0.7)" },
        },
      },
      animation: {
        fadeUp: "fadeUp 0.5s ease-out both",
        pulseGlow: "pulseGlow 2s ease-in-out infinite",
        floaty: "floaty 6s ease-in-out infinite",
        pop: "pop 0.35s ease-out both",
        // `both` mantiene el estado inicial (fuera de cuadro) durante el retardo,
        // asi los papelillos no se quedan quietos arriba antes de caer.
        confetti: "confetti 2.6s linear both",
        heartbeat: "heartbeat 1.1s ease-in-out infinite",
        countIn: "countIn 1s ease-out both",
      },
    },
  },
  plugins: [],
};

export default config;
