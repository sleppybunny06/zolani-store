/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        'display': ['Playfair Display', 'serif'],
        'body': ['Poppins', 'sans-serif'],
      },
      colors: {
        luxury: {
          ivory: '#FDF7F0',
          beige: '#F5F0E8',
          cream: '#FAF5F0',
          gold: '#D4AF37',
          blush: '#F4E4D6',
          sage: '#E8E4D8',
          charcoal: '#2C2C2C',
          warm: '#8B7355',
          // Dark mode variants
          'dark-bg': '#1A1A1A',
          'dark-surface': '#2D2D2D',
          'dark-border': '#3A3A3A',
          'dark-text': '#F5F5F5',
          'dark-text-muted': '#A0A0A0',
          'dark-gold': '#F4D03F',
          'dark-accent': '#6B5B95',
        }
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-in-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
    },
  },
  plugins: [],
}