/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        blink: {
          '0%': { opacity: '1' },
          '45%': { opacity: '1' },
          '50%': { opacity: '0' },
          '95%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        blink: 'blink 1s ease-in-out infinite',
      },
      colors: {
        primary: "#1FB6FF",
        accent: "#00C2FF",
        background: "#0E0E12",
        surface: "#1C1C26",
        text: "#E4E4E7",
        muted: "#9CA3AF",
        success: "#10B981",
        warning: "#F97316",
        error: "#EF4444",
        glow: "#60EFFF",
      },
    },
  },
  plugins: [],
}