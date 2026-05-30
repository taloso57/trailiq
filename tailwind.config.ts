import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg:      "#030811",
        card:    "#060F1E",
        surface: "#0A1628",
        accent:  "#00D4FF",
        cyan:    "#00D4FF",
        blue:    "#0066FF",
        orange:  "#F97316",
        red:     "#EF4444",
        muted:   "#4A6080",
        "cat-backpack":     "#0EA5E9",
        "cat-sleeping-bag": "#A855F7",
        "cat-sleeping-pad": "#14B8A6",
        "cat-tent":         "#22C55E",
        "cat-apparel":      "#F97316",
      },
      fontFamily: {
        sans:    ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "cta-gradient":    "linear-gradient(135deg, #F97316 0%, #EF4444 100%)",
        "cta-blue":        "linear-gradient(135deg, #0066FF 0%, #00D4FF 100%)",
        "navbar-gradient": "linear-gradient(180deg, rgba(3,8,17,0.97) 0%, rgba(3,8,17,0.85) 100%)",
        "hero-glow":       "radial-gradient(70% 60% at 45% 40%, rgba(0,102,255,0.14) 0%, rgba(0,212,255,0.07) 55%, rgba(3,8,17,0) 100%)",
        "blue-gradient":   "linear-gradient(135deg, #0066FF 0%, #00D4FF 100%)",
        "section-deep":    "linear-gradient(180deg, #030811 0%, #060F1E 50%, #030811 100%)",
      },
      boxShadow: {
        glow:          "0 0 40px rgba(0,102,255,0.30)",
        "glow-lg":     "0 0 80px rgba(0,102,255,0.40)",
        "glow-cyan":   "0 0 40px rgba(0,212,255,0.25)",
        "glow-orange": "0 0 28px rgba(249,115,22,0.45)",
        "card-hover":  "0 0 0 1px rgba(0,102,255,0.15), 0 24px 64px rgba(0,8,30,0.85)",
        "card-blue":   "0 0 60px rgba(0,102,255,0.10), 0 24px 64px rgba(0,8,30,0.9)",
      },
      letterSpacing: {
        hero:  "0.08em",
        label: "0.18em",
      },
      animation: {
        "spin-slow": "spin 6s linear infinite",
        pulse: "pulse 2.4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      transitionDuration: {
        "400": "400ms",
        "600": "600ms",
        "800": "800ms",
      },
    },
  },
  plugins: [],
};

export default config;
