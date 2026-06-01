import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-display)", "var(--font-jp)", "serif"],
        sans:    ["var(--font-sans)",    "var(--font-jp)", "system-ui", "sans-serif"],
        jp:      ["var(--font-jp)", "sans-serif"],
      },
      colors: {
        brand: {
          50:  "#fff5f3",
          100: "#ffe8e4",
          200: "#ffc9c0",
          300: "#ff9d8e",
          400: "#ff7063",
          500: "#e8503a",
          600: "#d43820",
          700: "#b22c17",
          800: "#932918",
          900: "#7a271a",
          950: "#430e08",
        },
        ink: {
          DEFAULT: "#1c1917",
          muted:   "#78716c",
          faint:   "#a8a29e",
        },
        canvas: {
          DEFAULT: "#fffbf9",
          warm:    "#fff5f3",
          card:    "#ffffff",
        },
        heat: {
          high: "#e8503a",
          mid:  "#f97316",
          low:  "#3b82f6",
        },
      },
      borderRadius: {
        "4xl": "2rem",
      },
      boxShadow: {
        card:       "0 2px 12px 0 rgba(232,80,58,0.07), 0 0 0 1px rgba(232,80,58,0.07)",
        "card-hover":"0 8px 32px 0 rgba(232,80,58,0.14), 0 0 0 1px rgba(232,80,58,0.12)",
        glow:       "0 0 24px 0 rgba(232,80,58,0.35)",
        "glow-sm":  "0 0 12px 0 rgba(232,80,58,0.25)",
      },
      animation: {
        "fade-in":   "fadeIn 0.3s ease-out",
        "slide-up":  "slideUp 0.4s ease-out",
        "cheer-pop": "cheerPop 0.4s cubic-bezier(0.34,1.56,0.64,1)",
        "shimmer":   "shimmer 1.6s ease-in-out infinite",
      },
      keyframes: {
        fadeIn:   { from: { opacity: "0" },                          to: { opacity: "1" } },
        slideUp:  { from: { opacity: "0", transform: "translateY(12px)" }, to: { opacity: "1", transform: "none" } },
        cheerPop: { "0%": { transform: "scale(1)" }, "50%": { transform: "scale(1.45)" }, "100%": { transform: "scale(1)" } },
        shimmer:  { "0%": { backgroundPosition: "200% 0" }, "100%": { backgroundPosition: "-200% 0" } },
      },
    },
  },
  plugins: [],
};
export default config;
