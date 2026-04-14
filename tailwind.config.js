/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#334155',
          DEFAULT: '#0F172A', // Deep Navy
          dark: '#020617',
        },
        cta: {
          DEFAULT: '#FF6000', // Vibrant Orange
          hover: '#E65600',
        },
        background: '#F8FAFC',
        surface: '#FFFFFF',
      },
      fontFamily: {
        sans: ['"Lexend"', 'sans-serif'],
      },
      boxShadow: {
        'soft-sm': '0 1px 2px rgba(0,0,0,0.05)',
        'soft-md': '0 4px 6px rgba(0,0,0,0.04)',
        'soft-lg': '0 10px 15px rgba(0,0,0,0.04)',
        'soft-xl': '0 25px 50px -12px rgba(0, 0, 0, 0.08)',
        'soft-2xl': '0 35px 60px -15px rgba(0, 0, 0, 0.1)',
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
}
