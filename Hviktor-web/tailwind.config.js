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
    fontSize: {
      // font-size hentet fra hviktor base.scss
      // kan fjernes for å bare bruke tailwind defualts
      'xs': '.75rem',
      'sm': '.875rem',
      'base': '1rem',
      'lg': '1.438rem',
      'xl': '1.625rem',
      '2xl': '1.812rem',
      '3xl': '2rem',
      '4xl': '2.25rem',
      '5xl': '2.875rem',
      '6xl': '3.25rem',
    },
  },
  plugins: [require('tailwindcss-primeui')],
};
