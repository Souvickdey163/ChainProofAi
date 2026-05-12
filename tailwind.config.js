/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./hooks/**/*.{js,jsx}",
    "./lib/**/*.{js,jsx}",
    "./services/**/*.{js,jsx}",
    "./store/**/*.{js,jsx}",
    "./utils/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        background: "#04050a",
        foreground: "#f4f7ff",
        primary: "#51c7ff",
        secondary: "#7b61ff",
        accent: "#00f5d4",
        panel: "rgba(10, 18, 36, 0.72)"
      },
      fontFamily: {
        sans: ["var(--font-sans)"],
        display: ["var(--font-display)"]
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(81, 199, 255, 0.18), 0 0 24px rgba(81, 199, 255, 0.18)",
        neon: "0 0 30px rgba(0, 245, 212, 0.18)"
      },
      backgroundImage: {
        "grid-cyber":
          "linear-gradient(rgba(81,199,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(81,199,255,0.08) 1px, transparent 1px)"
      },
      keyframes: {
        pulseLine: {
          "0%": { transform: "translateY(-100%)", opacity: 0 },
          "20%": { opacity: 0.65 },
          "100%": { transform: "translateY(100%)", opacity: 0 }
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" }
        },
        orbit: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" }
        },
        shimmer: {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "100% 50%" }
        }
      },
      animation: {
        "pulse-line": "pulseLine 7s linear infinite",
        float: "float 6s ease-in-out infinite",
        orbit: "orbit 18s linear infinite",
        shimmer: "shimmer 8s linear infinite"
      }
    }
  },
  plugins: []
};
