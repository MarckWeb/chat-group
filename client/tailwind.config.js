/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#00001a',
        secondary: '#120F13',
        customText: '#E0E0E0',
      },

      fontFamily: {
        primary: ['Sometype Mono', 'monospace'],


      },
      boxShadow: {
        '4xl': '0 0 15px rgba(255, 255, 255)',
        '5xl': '0 0 5px rgba(255, 165, 0, 1), 0 0 15px rgba(255, 165, 0, 1)'
      },
    },
    plugins: [],
  }
}

