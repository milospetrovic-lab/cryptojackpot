import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        jp: {
          charcoal: "#0A0A0C",
          obsidian: "#000000",
          steel: "#1A1A1D",
          smoke: "#2A2A2E",
          // Primary "gold" family — neon yellow-green (#E0FF57 base, contrast 18.61 on #0A0A0C)
          gold: "#E0FF57",
          "gold-deep": "#B8DC4A",
          "gold-warm": "#F68838", // orange accent
          "gold-pale": "#F0FFA0",
          // Extended palette
          orange: "#F68838",
          mint: "#7DD8CD",
          // Hit / strike
          ruby: "#C41E3A",
          molten: "#E63946",
          crimson: "#8B1A2B",
          // System
          white: "#FAFAFA",
          mute: "#A0A0A6",
          dim: "#5A5A60",
          success: "#10B981",
          warn: "#F59E0B",
        },
      },
      fontFamily: {
        display: ["var(--font-bebas)", "sans-serif"],
        body: ["var(--font-manrope)", "sans-serif"],
        mono: ["var(--font-jetbrains)", "monospace"],
        bebas: ["var(--font-bebas)", "sans-serif"],
        cinzel: ["var(--font-cinzel)", "serif"],
      },
      letterSpacing: {
        vault: "0.25em",
      },
      boxShadow: {
        "gold-glow": "0 0 24px rgba(224, 255, 87, 0.38)",
        "ruby-glow": "0 0 32px rgba(196, 30, 58, 0.45)",
        "mint-glow": "0 0 22px rgba(125, 216, 205, 0.35)",
        lounge: "0 30px 80px -20px rgba(0, 0, 0, 0.8)",
      },
      backgroundImage: {
        "molten-radial":
          "radial-gradient(1200px 600px at 50% 100%, rgba(196,30,58,0.18), transparent 70%)",
        "gold-sheen":
          "linear-gradient(120deg, transparent 20%, rgba(240,255,160,0.55) 50%, transparent 80%)",
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        drift: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        pulseRing: {
          "0%": { boxShadow: "0 0 0 0 rgba(224,255,87,0.55)" },
          "70%": { boxShadow: "0 0 0 18px rgba(224,255,87,0)" },
          "100%": { boxShadow: "0 0 0 0 rgba(224,255,87,0)" },
        },
      },
      animation: {
        shimmer: "shimmer 6s linear infinite",
        drift: "drift 6s ease-in-out infinite",
        pulseRing: "pulseRing 2.4s ease-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
