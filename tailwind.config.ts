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
        brand: {
          DEFAULT: "#0033a0", // azul institucional
          dark: "#00237a",
          light: "#e8eefc",
        },
        flag: {
          red: "#d52b1e",
          blue: "#0033a0",
        },
      },
    },
  },
  plugins: [],
};

export default config;
