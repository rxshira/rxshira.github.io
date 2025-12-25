/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'hot-pink': '#C2185B',
        'magenta': '#D81B60',
        'red-orange': '#E84A3F',
        'bright-red': '#FF5252',
        'yellow': '#FFD93D',
        'yellow-light': '#FFF176',
        'orange': '#FF8C42',
        'orange-light': '#FFA726',
        'cream': '#F5F5F0',
        'off-white': '#FAFAFA',
        'black': '#1A1A1A',
        'dark-gray': '#212121',
      },
      fontFamily: {
        'display': ['"Space Grotesk"', 'sans-serif'],
        'body': ['"Space Grotesk"', 'sans-serif'],
        'sans': ['"Space Grotesk"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

