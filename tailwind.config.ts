import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#ec7513',
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
          950: '#431407',
        },
        spice: {
          50: '#faf9f7',
          100: '#f4f2f0',
          200: '#e6e0db',
          300: '#897361',
          400: '#695446',
          500: '#3f2d20',
        },
      },
      fontFamily: {
        sans: ['Work Sans', 'Noto Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;

