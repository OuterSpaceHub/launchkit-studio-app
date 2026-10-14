/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f3f7ff',
          100: '#e7eefc',
          500: '#4f46e5',
          600: '#4338ca',
          700: '#3730a3',
        },
      },
      boxShadow: {
        soft: '0 20px 45px rgba(79, 70, 229, 0.12)',
      },
    },
  },
  plugins: [],
};
