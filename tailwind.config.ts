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
        "scale-down": {
          "0%": {
            transform: "scale(1)",
          },
          "100%": {
            transform: "scale(0.5)",
          },
        },
        "move-to-top": {
          "0%": {
            top: "50%",
            transform: "translateY(-50%)",
          },
          "100%": {
            top: "var(--move-to-top-dest, 200px)",
            transform: "translateY(0)",
          },
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
        "scale-down": "scale-down 1.5s ease-in-out 400ms forwards",
        "move-to-top": "move-to-top 1.5s ease-in-out 400ms forwards",
        "scale-and-rise": "scale-and-rise 1.5s ease-in-out forwards",
        "char-reveal": "char-reveal 300ms ease-out forwards",
        "image-reveal": "image-reveal 800ms ease-out forwards",
        "image-opacity": "image-opacity 800ms ease-out forwards",
        "modal-fadeIn": "modal-fadeIn 0.2s ease-out",
        "modal-scaleIn": "modal-scaleIn 0.3s ease-out",
      },
    },
  },
  plugins: [],
  darkMode: ["class"],
};
export default config;
