/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        cloudinary: {
          blue: '#3448C5',
          cyan: '#00F0FF',
          dark: '#0B0F19',
          card: '#161F30',
          border: '#233048'
        }
      }
    },
  },
  plugins: [],
}
