/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#4cece2',
      },
    },
    fontFamily: {
      title: ['AmongUs'],
      body: ['Ultra'],
    },
  },
  plugins: [],
};
