import type { Config } from "tailwindcss";

const config: Config = {
  // ESSENCIAL: Ativa o modo escuro via classe CSS
  darkMode: "class", 
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: "#0F172A",   // O azul escuro do seu Hero
          bg: "#F9FAFB",     // O cinza/bege claro do seu Layout original
          accent: "#B45309", // O laranja/terracota
          surface: "#F3F4F6", 
          muted: "#4B5563",
        },
      },
    },
  },
  plugins: [],
};
export default config;