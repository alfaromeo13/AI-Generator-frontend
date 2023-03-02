/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'coral-red': '#FA4E4E',
        'dark-blue': '#292E3C',
        'lavender': '#6B7AFF',
      },
      backgroundImage: {
        'auth': "url('/src/assets/bg-auth.png')",
        'generator': "url('/src/assets/bg-gen.png')",
      }
    },
  },
  plugins: [],
}
