/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,tsx}"],
  theme: {
    extend: {
      colors: {
        default1: '#010536',
        default2: '#ffff00'
      },
      width: {
        custom1: '35rem'
      }
    },
  },
  plugins: [],
}
