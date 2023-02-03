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
        custom1: '35rem',
        login_signup: '27rem',
        custom2: '70rem'
      },
      margin: {
        custom1: '0.9rem'
      }
    },
  },
  plugins: [],
}
