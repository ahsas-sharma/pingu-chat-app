/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        pingu: 'Luckiest Guy',
        heading: 'DynoPuff',
        body: 'McLaren',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
