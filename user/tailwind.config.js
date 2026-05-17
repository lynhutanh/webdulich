/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      // ── Font Families ─────────────────────────────────────────────────
      fontFamily: {
        // Heading — Montserrat (bold, geometric, premium — great for travel banners)
        heading: ['Montserrat', 'system-ui', 'sans-serif'],
        // Body — Be Vietnam Pro (best Vietnamese support, modern, very readable)
        body: ['"Be Vietnam Pro"', 'system-ui', 'sans-serif'],
        // Accent — Be Vietnam Pro light (labels, meta, small text)
        accent: ['"Be Vietnam Pro"', 'system-ui', 'sans-serif'],
        // Default sans → Be Vietnam Pro (all base text)
        sans: ['"Be Vietnam Pro"', 'system-ui', 'sans-serif'],
      },
      // ── Colors ────────────────────────────────────────────────────────
      colors: {
        primary: {
          50:  '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
          950: '#172554',
        },
      },
      // ── Letter spacing ────────────────────────────────────────────────
      letterSpacing: {
        luxury: '0.08em',
        wide:   '0.05em',
      },
      // ── Line height ───────────────────────────────────────────────────
      lineHeight: {
        heading: '1.15',
        relaxed: '1.75',
      },
    },
  },
  plugins: [],
};

