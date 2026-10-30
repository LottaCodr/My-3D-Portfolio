/** @type {import('tailwindcss').Config} */

/* Palette mirrors the custom properties in src/index.css.
   Contrast ratios are documented in docs/ux-research-v2.md §4. */
const colors = {
  bg: '#0a0a0f',
  deep: '#07070b',
  raise: '#101017',
  card: '#14141a',
  cardhi: '#1a1a23',
  fg: '#e8e6e3',
  muted: '#a1a1aa', // 7.71:1 on bg, AAA
  faint: '#85858f', // 5.02:1 on bg, AA
  accent: '#cfa96e', // 8.99:1 on bg, AAA
  accentsoft: '#f0d9b5',
  accentdeep: '#a78755',
  control: '#6b6b78',
  line: '#33333f',
  linesoft: '#23232e',
  success: '#7fd99a',
  danger: '#f0a1a1',
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
      /* Shape language: tags are barely rounded, controls are soft
         rectangles, cards are generously rounded. Full pills are reserved for
         dots and progress lines, not for buttons or labels. */
      borderRadius: {
        tag: '6px',
        control: '10px',
        sm: '8px',
        md: '14px',
        lg: '20px',
        xl: '28px',
        '2xl': '32px',
      },
      spacing: {
        nav: '68px',
        section: 'clamp(4rem, 3rem + 5vw, 8rem)',
      },
      zIndex: {
        nav: '50',
        overlay: '60',
        dialog: '80',
        progress: '70',
      },
      boxShadow: {
        card: '0 1px 2px rgba(0,0,0,.4), 0 12px 32px -12px rgba(0,0,0,.6)',
        lift: '0 2px 4px rgba(0,0,0,.4), 0 24px 48px -16px rgba(0,0,0,.75)',
        glow: '0 0 0 1px rgba(207,169,110,.22), 0 18px 50px -20px rgba(207,169,110,.35)',
      },
      transitionTimingFunction: {
        out: 'cubic-bezier(.22,1,.36,1)',
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
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        'overlay-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'overlay-out': {
          from: { opacity: '1' },
          to: { opacity: '0' },
        },
        /* `scale` is its own CSS property, so animating it never clobbers
           the translate() used to centre the dialog. */
        'panel-in': {
          from: { opacity: '0', scale: '.97' },
          to: { opacity: '1', scale: '1' },
        },
        'panel-out': {
          from: { opacity: '1', scale: '1' },
          to: { opacity: '0', scale: '.97' },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(.85)', opacity: '.75' },
          '70%': { transform: 'scale(1.9)', opacity: '0' },
          '100%': { transform: 'scale(1.9)', opacity: '0' },
        },
      },
      animation: {
        marquee: 'marquee 46s linear infinite',
        shimmer: 'shimmer 2.4s linear infinite',
        'accordion-down': 'accordion-down 320ms cubic-bezier(.22,1,.36,1)',
        'accordion-up': 'accordion-up 260ms cubic-bezier(.22,1,.36,1)',
        'overlay-in': 'overlay-in 180ms ease-out',
        'overlay-out': 'overlay-out 140ms ease-in',
        'panel-in': 'panel-in 220ms cubic-bezier(.22,1,.36,1)',
        'panel-out': 'panel-out 160ms ease-in',
        'pulse-ring': 'pulse-ring 2.4s cubic-bezier(.22,1,.36,1) infinite',
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
