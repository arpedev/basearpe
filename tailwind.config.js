/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./app.js"
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Urbanist"', 'sans-serif'],
        sans: ['"Urbanist"', 'sans-serif'],
      },
      colors: {
        paper: '#F6F9FD',
        electricblue: '#1849FF',
        cobaltblue: '#1644FF',
        azurecyan: '#38BDF8',
        iceblue: '#BAE6FD',
        marinenavy: '#102244',
        obsidiannavy: '#060D1A',
        taupeblue: '#4B6382'
      }
    }
  },
  plugins: [],
};
