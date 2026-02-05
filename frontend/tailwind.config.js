/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {

      animation: {
        fadeIn: "fadeIn 1s ease forwards",
        slideUp: "slideUp 0.8s ease forwards",
        "spin-slow": "spin 8s linear infinite",
      },

      keyframes: {
        fadeIn: {
          from: { opacity: 0, transform: "translateY(30px)" },
          to: { opacity: 1, transform: "translateY(0)" },
        },
        slideUp: {
          from: { opacity: 0, transform: "translateY(20px)" },
          to: { opacity: 1, transform: "translateY(0)" },
        },
      },

    },
  },
  plugins: [],
};
