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
        sans: ["var(--font-inter)", "sans-serif"],
        inter: ["var(--font-inter)", "sans-serif"],
        montserrat: ["var(--font-montserrat)", "sans-serif"],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      transitionDuration: {
        "400": "400ms",
      },
      keyframes: {
        scrollhint: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(8px)" },
        },
        "navbar-enter": {
          from: { opacity: "0", translate: "0 calc(-100% - 0.75rem)" },
          to: { opacity: "1", translate: "0 0" },
        },
        "pill-menu-enter": {
          from: { opacity: "0", translate: "0 calc(100% + 1.25rem)" },
          to: { opacity: "1", translate: "0 0" },
        },
        "char-reveal": {
          "0%": {
            transform: "scale(0.3) translateY(-30px)",
            opacity: "0",
            filter: "blur(8px)",
          },
          "100%": {
            transform: "scale(1) translateY(0)",
            opacity: "1",
            filter: "blur(0)",
          },
        },
        "image-reveal": {
          "0%": {
            opacity: "0",
            transform: "translateY(30px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        "image-opacity": {
          "0%": {
            opacity: "0",
            scale: "0.90",
          },
          "100%": {
            opacity: "1",
            scale: "1",
          },
        },
        "modal-fadeIn": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "modal-scaleIn": {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
      },
      animation: {
        scrollhint: "scrollhint 1.5s ease-in-out infinite",
        "navbar-enter": "navbar-enter 900ms cubic-bezier(0.22, 0.61, 0.36, 1) backwards",
        "pill-menu-enter": "pill-menu-enter 1000ms cubic-bezier(0.22, 0.61, 0.36, 1) 90ms backwards",
        "scale-and-rise": "scale-and-rise 0.8s ease-in-out forwards",
        "char-reveal": "char-reveal 150ms ease-out forwards",
        "image-reveal": "image-reveal 400ms ease-out forwards",
        "image-opacity": "image-opacity 400ms ease-out forwards",
        "modal-fadeIn": "modal-fadeIn 0.2s ease-out",
        "modal-scaleIn": "modal-scaleIn 0.3s ease-out",
      },
    },
  },
  plugins: [],
  darkMode: ["class"],
};
export default config;
