import { colors } from './src/theme/colors/colors.ts';

module.exports = {
  content: [ "./src/**/*.{html,ts}" ],
  theme: {
    extend: {
      colors: {
        ...colors,
      },
    },
    fontFamily: {
      sans: ['PublicSans', 'sans-serif'],
      as: ['AlbertSans', 'sans-serif'],
    },
  },
  plugins: [require('tailwindcss-primeui')],
};
