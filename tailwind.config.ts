/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./hooks/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["DM Sans", "sans-serif"],
      },
      colors: {
        dark: {
          900: "#0a0e1a",
          800: "#0f1629",
          700: "#162035",
          600: "#1e2d47",
        },
        brand: {
          blue: "#4f8ef7",
          teal: "#2dd4bf",
          purple: "#a78bfa",
        },
        "bg-primary": "#0A0F1E",
        "bg-secondary": "#0F1629",
        "bg-surface": "#131C35",
        "bg-card": "#0D1526",
        "accent-cyan": "#00D4FF",
        "accent-purple": "#7C3AED",
        "accent-blue": "#3B82F6",
        "accent-green": "#10D98A",
        "text-primary": "#E2E8F0",
        "text-secondary": "#94A3B8",
        "text-muted": "#64748B",
      },
      animation: {
        float: "floating 6s ease-in-out infinite",
        "float-delayed": "floating 8s ease-in-out infinite 2s",
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "pulse-glow": "pulse-glow 3s ease-in-out infinite",
        "rotate-slow": "rotate-slow 20s linear infinite",
        "rotate-reverse": "rotate-reverse 15s linear infinite",
        "glow-pulse": "glow-pulse 2s ease-in-out infinite",
        shimmer: "shimmer 2s linear infinite",
      },
      keyframes: {
        floating: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.4", transform: "scale(1)" },
          "50%": { opacity: "0.8", transform: "scale(1.05)" },
        },
        "rotate-slow": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        "rotate-reverse": {
          from: { transform: "rotate(360deg)" },
          to: { transform: "rotate(0deg)" },
        },
        "glow-pulse": {
          "0%, 100%": { boxShadow: "0 0 20px rgba(0, 212, 255, 0.2)" },
          "50%": { boxShadow: "0 0 40px rgba(0, 212, 255, 0.5)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "hero-gradient":
          "linear-gradient(135deg, #0A0F1E 0%, #0F1629 50%, #131C35 100%)",
        "cyan-purple": "linear-gradient(135deg, #00D4FF 0%, #7C3AED 100%)",
        "card-gradient":
          "linear-gradient(135deg, rgba(0,212,255,0.06) 0%, rgba(124,58,237,0.06) 100%)",
      },
      boxShadow: {
        "glow-cyan": "0 0 30px rgba(0, 212, 255, 0.3)",
        "glow-purple": "0 0 30px rgba(124, 58, 237, 0.3)",
        card: "0 8px 32px rgba(0, 0, 0, 0.4)",
        "card-hover":
          "0 24px 60px rgba(0, 0, 0, 0.5), 0 0 40px rgba(0, 212, 255, 0.08)",
      },
    },
  },
  plugins: [],
};
