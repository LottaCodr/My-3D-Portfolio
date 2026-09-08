/** @type {import('tailwindcss').Config} */

/* Palette mirrors the custom properties in src/index.css.
   Contrast ratios are documented in docs/ux-research.md §2.2. */
const colors = {
  bg: '#0a0a0f',
  raise: '#101017',
  card: '#14141a',
  cardhi: '#1a1a23',
  fg: '#e8e6e3',
  muted: '#a1a1aa', // 7.71:1 on bg — AAA
  faint: '#85858f', // 5.02:1 on bg — AA
  accent: '#cfa96e', // 8.99:1 on bg — AAA
  accentsoft: '#f0d9b5',
  accentdeep: '#a78755',
  line: '#33333f',
  linesoft: '#23232e',
};

export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ...colors,
        /* Back-compat names still referenced by src/styles.js */
        primary: colors.bg,
        secondary: colors.muted,
        tertiary: colors.card,
        orange: { 40: colors.accent },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
        serif: ['Instrument Serif', 'Georgia', 'serif'],
        poppins: ['Inter', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        shell: '76rem',
        prose: '62ch',
      },
      borderRadius: {
        sm: '8px',
        md: '14px',
        lg: '20px',
        xl: '28px',
      },
      spacing: {
        nav: '68px',
        section: 'clamp(4rem, 3rem + 5vw, 8rem)',
      },
      zIndex: {
        nav: '50',
        overlay: '60',
        progress: '70',
      },
      keyframes: {
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        marquee: 'marquee 38s linear infinite',
        shimmer: 'shimmer 2.4s linear infinite',
      },
    },
  },
  plugins: [
    /* Tag-colour helper used by src/constants/index.js */
    function ({ addUtilities }) {
      addUtilities({
        '.amber-text-gradient': {
          background: 'linear-gradient(92deg, #cfa96e 0%, #f0d9b5 100%)',
          '-webkit-background-clip': 'text',
          'background-clip': 'text',
          '-webkit-text-fill-color': 'transparent',
          color: 'transparent',
        },
      });
    },
  ],
};
