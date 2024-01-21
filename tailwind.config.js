/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js, ts, jsx, tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      screens: {
        'other': {'min': '340px', 'max': '1200px'},
      },
    },
  },
  plugins: [],
}
