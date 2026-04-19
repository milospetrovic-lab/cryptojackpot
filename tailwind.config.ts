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
          gold: "#FFD700",
          "gold-deep": "#D4AF37",
          "gold-warm": "#F0C948",
          "gold-pale": "#FFE88A",
          ruby: "#C41E3A",
          molten: "#E63946",
          crimson: "#8B1A2B",
          white: "#FAFAFA",
          mute: "#A0A0A6",
          dim: "#5A5A60",
          success: "#10B981",
          warn: "#F59E0B",
        },
      },
      fontFamily: {
        display: ["var(--font-cinzel)", "serif"],
        body: ["var(--font-manrope)", "sans-serif"],
        mono: ["var(--font-jetbrains)", "monospace"],
      },
      letterSpacing: {
        vault: "0.25em",
      },
      boxShadow: {
        "gold-glow": "0 0 24px rgba(255, 215, 0, 0.35)",
        "ruby-glow": "0 0 32px rgba(196, 30, 58, 0.45)",
        lounge: "0 30px 80px -20px rgba(0, 0, 0, 0.8)",
      },
      backgroundImage: {
        "molten-radial":
          "radial-gradient(1200px 600px at 50% 100%, rgba(196,30,58,0.18), transparent 70%)",
        "gold-sheen":
          "linear-gradient(120deg, transparent 20%, rgba(255,232,138,0.55) 50%, transparent 80%)",
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
          "0%": { boxShadow: "0 0 0 0 rgba(196,30,58,0.5)" },
          "70%": { boxShadow: "0 0 0 18px rgba(196,30,58,0)" },
          "100%": { boxShadow: "0 0 0 0 rgba(196,30,58,0)" },
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
