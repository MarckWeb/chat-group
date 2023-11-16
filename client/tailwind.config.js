/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#252329',
        secondary: '#120F13',
        customText: '#E0E0E0',
      },

      fontFamily: {
        primary: ['Noto Sans Mandaic', 'sans-serif'],
        secondary: ['Roboto', 'sans-serif']

      }
    },
  },
  plugins: [],
}

