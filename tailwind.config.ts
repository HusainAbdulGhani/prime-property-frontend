import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primaryBlack: "#1A1A1A",
        accentGold: "#C9A961",
        accentGoldLight: "#E8D5A8",
        accentGoldRich: "#D4AF37",
        accentRed: "#B33A3A",
        neutralWhite: "#FFFFFF",
        softGray: "#F5F5F5",
        surface: "#FFFFFF",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
      },
      spacing: {
        "grid-1": "4px",
        "grid-2": "8px",
        "grid-4": "16px",
        "grid-6": "24px",
        "grid-8": "32px",
      },
      boxShadow: {
        card: "0 2px 4px rgba(26,26,26,0.02), 0 1px 2px rgba(26,26,26,0.04)",
        "card-hover": "0 10px 25px rgba(26,26,26,0.06), 0 2px 8px rgba(26,26,26,0.02)",
        premium: "0 8px 30px rgba(0,0,0,0.05)",
        goldGlow: "0 0 15px rgba(201,169,97,0.15)",
        sidebar: "1px 0 0 rgba(26,26,26,0.06)",
      },
      borderRadius: {
        "2xl": "16px",
        "3xl": "24px",
      },
      screens: {
        mobile: { max: "640px" },
        tablet: { max: "1024px" },
        desktop: "1024px",
      },
      animation: {
        "fade-in": "fadeIn 0.4s cubic-bezier(0.16,1,0.3,1) forwards",
        "slide-up": "slideUp 0.5s cubic-bezier(0.16,1,0.3,1) forwards",
        "scale-in": "scaleIn 0.4s cubic-bezier(0.16,1,0.3,1) forwards",
      },
    },
  },
  plugins: [],
};

export default config;
