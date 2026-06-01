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
        sans: ["var(--font-sans)", "var(--font-jp)", "system-ui", "sans-serif"],
        jp:   ["var(--font-jp)", "sans-serif"],
      },
      colors: {
        brand: {
          50:  "#faf5ff",
          100: "#f3e8ff",
          200: "#e9d5ff",
          300: "#d8b4fe",
          400: "#c084fc",
          500: "#a855f7",
          600: "#9333ea",
          700: "#7e22ce",
          800: "#6b21a8",
          900: "#581c87",
          950: "#3b0764",
        },
        heat: {
          high:   "#ef4444",
          mid:    "#f97316",
          low:    "#3b82f6",
        },
        surface: {
          DEFAULT: "#ffffff",
          muted:   "#f8f7ff",
          subtle:  "#f1f0f9",
        },
      },
      borderRadius: {
        "4xl": "2rem",
      },
      boxShadow: {
        card:    "0 2px 8px 0 rgba(109,40,217,0.06), 0 0 0 1px rgba(109,40,217,0.06)",
        "card-hover": "0 8px 32px 0 rgba(109,40,217,0.12), 0 0 0 1px rgba(109,40,217,0.1)",
        glow:    "0 0 20px 0 rgba(168,85,247,0.3)",
        "inner-sm": "inset 0 1px 2px rgba(0,0,0,0.06)",
      },
      backgroundImage: {
        "gradient-radial":  "radial-gradient(var(--tw-gradient-stops))",
        "gradient-mesh":
          "radial-gradient(at 40% 20%, hsl(280,80%,60%) 0px, transparent 50%), radial-gradient(at 80% 0%, hsl(260,80%,70%) 0px, transparent 50%), radial-gradient(at 0% 50%, hsl(300,70%,55%) 0px, transparent 50%)",
      },
      animation: {
        "fade-in":    "fadeIn 0.3s ease-out",
        "scale-in":   "scaleIn 0.2s ease-out",
        "cheer-pop":  "cheerPop 0.4s cubic-bezier(0.34,1.56,0.64,1)",
        "pulse-once": "pulse 0.6s ease-out 1",
      },
      keyframes: {
        fadeIn:   { from: { opacity: "0", transform: "translateY(4px)" }, to: { opacity: "1", transform: "none" } },
        scaleIn:  { from: { opacity: "0", transform: "scale(0.95)" }, to: { opacity: "1", transform: "scale(1)" } },
        cheerPop: { "0%": { transform: "scale(1)" }, "50%": { transform: "scale(1.4)" }, "100%": { transform: "scale(1)" } },
      },
    },
  },
  plugins: [],
};
export default config;
