/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        light: {
          bg: {
            primary: '#ffffff',
            secondary: '#f3f4f6',
            tertiary: '#e5e7eb'
          },
          text: {
            primary: '#111827',
            secondary: '#4b5563',
            accent: '#3b82f6'
          },
          border: {
            primary: '#e5e7eb',
            secondary: '#d1d5db',
            accent: '#93c5fd'
          },
          accent: {
            blue: {
              primary: '#3b82f6',
              secondary: '#60a5fa',
              light: '#93c5fd'
            },
            purple: {
              primary: '#8b5cf6',
              secondary: '#a78bfa',
              light: '#c4b5fd'
            }
          }
        }
      }
    },
  },
  plugins: [],
};
