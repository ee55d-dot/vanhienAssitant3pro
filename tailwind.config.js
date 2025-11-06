
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./index.html",
    "./**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        '3xl': '24px',
      },
      colors: {
        'vhuu-dark': '#0F172A',
        'vhuu-light': '#f8fafc',
      },
      backgroundImage: {
        'gradient-blue-purple': 'linear-gradient(to right, #6366F1, #3B82F6)',
        'gradient-cyan-blue': 'linear-gradient(to right, #06B6D4, #3B82F6)',
        'gradient-purple-pink': 'linear-gradient(to right, #A855F7, #EC4899)',
        'gradient-main': 'linear-gradient(135deg, #6366F1, #A855F7, #EC4899)',
      },
      boxShadow: {
        'soft': '0 10px 30px rgba(0,0,0,0.1)',
        'glow-purple-blue': '0 0 15px rgba(99, 102, 241, 0.6)',
      }
    },
  },
  plugins: [],
}
