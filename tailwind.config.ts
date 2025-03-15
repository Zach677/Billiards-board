import type { Config } from 'tailwindcss'

export default {
  content: ['./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'media',
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'Inter',
          'ui-sans-serif',
          'system-ui',
          'sans-serif',
          'Apple Color Emoji',
          'Segoe UI Emoji',
          'Segoe UI Symbol',
          'Noto Color Emoji',
        ],
      },
      colors: {
        gray: {
          900: '#121212',
          800: '#1e1e1e',
          700: '#2d2d2d',
          600: '#404040',
          100: '#f3f4f6',
        },
      },
    },
  },
  plugins: [],
} satisfies Config
