/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    container: {
      center: true,
      padding: '1rem',
    },
    extend: {
      colors: {
        paper: {
          DEFAULT: '#F7F4EC',
          dim: '#EFEBDF',
        },
        ink: {
          DEFAULT: '#20242B',
          light: '#3A414D',
          faint: '#6B7280',
        },
        slate: {
          DEFAULT: '#3C5A78',
          light: '#5D7B99',
          dark: '#243B52',
        },
        amber: {
          DEFAULT: '#F5B942',
          dark: '#D89A22',
        },
        coral: {
          DEFAULT: '#E8604C',
          dark: '#C74731',
        },
        border: '#DEDACB',
        ring: '#3C5A78',
      },
      fontFamily: {
        display: ['"Gowun Batang"', 'serif'],
        body: ['Pretendard', '"Noto Sans KR"', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
      borderRadius: {
        card: '10px',
      },
      boxShadow: {
        frame: '0 2px 0 0 rgba(32,36,43,0.08), 0 8px 24px -8px rgba(32,36,43,0.18)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'reel-spin': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.35s ease-out',
        'reel-spin': 'reel-spin 3s linear infinite',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}
