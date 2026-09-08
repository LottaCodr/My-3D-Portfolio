/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  mode: 'jit',
  theme: {
    extend: {
      colors: {
        // Mirrors the CSS custom properties declared in src/index.css so the
        // Tailwind theme and the raw CSS design tokens stay in sync.
        primary: '#0a0a0f',
        secondary: '#71717a',
        tertiary: '#14141a',
        orange: {
          // Adds `text-orange-40`, used by the Case Studies headings, without
          // dropping the rest of Tailwind's default orange scale.
          40: '#cfa96e',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
        poppins: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [
    // Tag-colour helper referenced by the project data in src/constants/index.js
    // (every tag carries `color: "amber-text-gradient"`).
    function ({ addUtilities }) {
      addUtilities({
        '.amber-text-gradient': {
          background: 'linear-gradient(90deg, #cfa96e 0%, #f0d9b5 100%)',
          '-webkit-background-clip': 'text',
          '-webkit-text-fill-color': 'transparent',
          'background-clip': 'text',
        },
      });
    },
  ],
};
