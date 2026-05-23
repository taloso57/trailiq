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
        bg:      "#000000",
        card:    "#0a0a0a",
        accent:  "#00D4FF",
        cyan:    "#00D4FF",
        orange:  "#F97316",
        red:     "#EF4444",
        muted:   "#888888",
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
        "cta-blue":        "linear-gradient(135deg, #0EA5E9 0%, #00D4FF 100%)",
        "navbar-gradient": "linear-gradient(180deg, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.80) 100%)",
        "hero-glow":       "radial-gradient(65% 55% at 50% 40%, rgba(0,212,255,0.07) 0%, rgba(0,0,0,0) 100%)",
      },
      boxShadow: {
        glow:      "0 0 30px rgba(0,212,255,0.25)",
        "glow-lg": "0 0 60px rgba(0,212,255,0.35)",
        "glow-orange": "0 0 28px rgba(249,115,22,0.45)",
        "card-hover": "0 0 50px rgba(255,255,255,0.04), 0 20px 60px rgba(0,0,0,0.8)",
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
