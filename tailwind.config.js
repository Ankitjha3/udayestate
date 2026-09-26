/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Corporate PropTech Navy — primary brand color
        navy: {
          950: '#0f172a',
          900: '#1e2f50',
          800: '#1E3A8A',
          700: '#234e70',
          600: '#2b628c',
          500: '#3b82c4',
        },
        // Trust Green — secondary CTA & verified indicators
        brand: {
          green: '#059669',
          'green-dark': '#0e8744',
          'green-light': '#eef8f2',
          navy: '#1E3A8A',
          'navy-dark': '#234e70',
          'navy-light': '#ecf1f8',
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', '"Inter"', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 2px 12px 0 rgba(15, 23, 42, 0.06)',
        'card-hover': '0 10px 25px -3px rgba(15, 23, 42, 0.12), 0 4px 6px -4px rgba(15, 23, 42, 0.05)',
        'proptech': '0 4px 20px -4px rgba(30, 58, 138, 0.18)',
      }
    },
  },
  plugins: [],
}
