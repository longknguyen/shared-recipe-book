/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#fff6f1",
          100: "#ffe6db",
          200: "#ffc9b6",
          300: "#f7ac90",
          400: "#f68567",
          500: "#f1524a",
          600: "#d4423d",
          700: "#a93635",
          800: "#6e312f",
          900: "#371f1c",
          950: "#1e100f",
          cream: "#f7f0e8",
          sand: "#f1d6ba",
          blush: "#f7cbb4",
        },
      },
      fontFamily: {
        display: ['"Fraunces"', "Georgia", "serif"],
        sans: ['"Plus Jakarta Sans"', "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 24px 60px rgba(55, 31, 28, 0.12)",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: 0, transform: "translateY(24px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
      },
      animation: {
        "fade-up": "fadeUp 0.7s ease-out both",
        "fade-in": "fadeIn 0.6s ease-out both",
      },
    },
  },
  plugins: [],
};
