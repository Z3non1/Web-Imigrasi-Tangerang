/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      colors: {
        'navy-dark': '#1e293b',
        'navy-primary': '#1e3a8a',
        'gold': '#fbbf24',
      }
    },
  },
  plugins: [],
}