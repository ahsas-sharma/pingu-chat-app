/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        pingu: 'Luckiest Guy', // Adds a new `font-display` class
      },
    },
  },
  plugins: [],
};
