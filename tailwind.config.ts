import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#0B4F6C", // Deep Ocean Blue
          dark: "#083a50",
        },
        secondary: {
          DEFAULT: "#0F766E", // Luxury Teal
        },
        accent: {
          DEFAULT: "#16A34A", // WhatsApp Green
          dark: "#12813c",
        },
        background: "#F8FAFC",
        ink: "#111827",
        line: "#E5E7EB",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        btn: "12px",
      },
      boxShadow: {
        card: "0 1px 3px rgba(17,24,39,0.06), 0 1px 2px rgba(17,24,39,0.04)",
        "card-hover":
          "0 20px 40px -12px rgba(11,79,108,0.22), 0 8px 16px -8px rgba(11,79,108,0.12)",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "scale-in": {
          "0%": { opacity: "0", transform: "scale(0.96)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.3s ease-out both",
        "scale-in": "scale-in 0.3s ease-out both",
      },
    },
  },
  plugins: [],
};

export default config;
