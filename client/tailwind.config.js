/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        light: {
          bg: 'var(--bg-color-light)',
          text: 'var(--text-color-light)',
        },
        dark: {
          bg: 'var(--bg-color-dark)',
          text: 'var(--text-color-dark)',
        }
      }
    },
  },
  plugins: [
    require('daisyui'),
  ],
}
