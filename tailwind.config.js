/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'maroon': '#893941',
        'dusty-rose': '#CB7885',
        'light-green': '#D4D994',
        'olive-green': '#5E6623',
        'white': '#FFFFFF',
        'black': '#1A1A1A',
        'dark-gray': '#212121',
        // Legacy color names for backward compatibility during transition
        'hot-pink': '#893941',
        'magenta': '#CB7885',
        'red-orange': '#893941',
        'bright-red': '#893941',
        'yellow': '#D4D994',
        'yellow-light': '#D4D994',
        'orange': '#5E6623',
        'orange-light': '#5E6623',
        'cream': '#F5F5F0',
        'off-white': '#F5F5F0',
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

