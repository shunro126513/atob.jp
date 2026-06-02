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
        display: ["var(--font-display)", "var(--font-jp)", "sans-serif"],
        sans:    ["var(--font-display)", "var(--font-jp)", "system-ui", "sans-serif"],
        jp:      ["var(--font-jp)", "sans-serif"],
      },
      colors: {
        // Brand — indigo-violet (cultural/participatory, semantically distinct from heat/warning)
        brand: {
          50:  "#EEEEFF",
          100: "#E0E1FF",
          200: "#C4C6FE",
          300: "#A5A8FB",
          400: "#8186F7",
          500: "#6366F1",
          600: "#4F46E5",
          700: "#4338CA",
          800: "#3730A3",
          900: "#312E81",
          950: "#1E1B4B",
        },
        // Heat — semantic urgency (orange/amber, distinct from brand)
        heat: {
          high: "#F97316",
          mid:  "#FBBF24",
          low:  "#60A5FA",
        },
        // Surface system — precise tonal steps
        surface: {
          base:     "#090A12",
          layer:    "#0F1020",
          card:     "#161728",
          elevated: "#1D1E34",
        },
        ink: {
          DEFAULT: "#1C1C2E",
          muted:   "#6B7280",
          faint:   "#9CA3AF",
        },
        // Retained for compatibility
        midnight: {
          DEFAULT:  "#090A12",
          surface:  "#0F1020",
          elevated: "#1D1E34",
        },
      },
      borderRadius: {
        "4xl": "2rem",
      },
      boxShadow: {
        card:        "0 1px 4px 0 rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.06)",
        "card-hover":"0 6px 20px 0 rgba(99,102,241,0.14), 0 0 0 1px rgba(99,102,241,0.22)",
        glow:        "0 0 28px 0 rgba(99,102,241,0.42)",
        "glow-sm":   "0 0 14px 0 rgba(99,102,241,0.28)",
        "heat-glow": "0 0 18px 0 rgba(249,115,22,0.32)",
      },
      animation: {
        "fade-in":       "fadeIn 0.3s ease-out",
        "slide-up":      "slideUp 0.4s ease-out",
        "cheer-pop":     "cheerPop 0.4s cubic-bezier(0.34,1.56,0.64,1)",
        "shimmer":       "shimmer 1.6s ease-in-out infinite",
        "float":         "float 4s ease-in-out infinite",
        "float-delayed": "float 4s ease-in-out 1s infinite",
        "float-slow":    "float 6s ease-in-out 2s infinite",
        "glow-pulse":    "glowPulse 3s ease-in-out infinite",
        "breathe":       "breathe 3s ease-in-out infinite",
      },
      keyframes: {
        fadeIn:   { from: { opacity: "0" },                               to: { opacity: "1" } },
        slideUp:  { from: { opacity: "0", transform: "translateY(12px)" }, to: { opacity: "1", transform: "none" } },
        cheerPop: { "0%": { transform: "scale(1)" }, "50%": { transform: "scale(1.45)" }, "100%": { transform: "scale(1)" } },
        shimmer:  { "0%": { backgroundPosition: "200% 0" }, "100%": { backgroundPosition: "-200% 0" } },
        float: {
          "0%,100%": { transform: "translateY(0px)" },
          "50%":     { transform: "translateY(-10px)" },
        },
        glowPulse: {
          "0%,100%": { opacity: "0.5" },
          "50%":     { opacity: "1" },
        },
        breathe: {
          "0%,100%": { opacity: "0.5", transform: "scale(1)" },
          "50%":     { opacity: "1",   transform: "scale(1.04)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
