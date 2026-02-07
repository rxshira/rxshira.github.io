/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg': '#000000',
        'white': '#ffffff',
        'pink': 'var(--pink)',
        'hot-pink': '#ff3399',
        'text-gray': '#b0b0b0',
        'dark-gray': '#0a0a0a',
      },
      fontFamily: {
        'megisha': ['Megisha', 'cursive'],
        'display': ['"Space Grotesk"', 'sans-serif'],
        'body': ['"Space Grotesk"', 'sans-serif'],
        'sans': ['"Space Grotesk"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

