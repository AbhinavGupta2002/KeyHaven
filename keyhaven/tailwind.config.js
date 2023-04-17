/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,tsx}"],
  theme: {
    extend: {
      colors: {
        default1: '#010536',
        default2: '#ffff00',
        default1_2: '#1a1e4a'
      },
      width: {
        custom1: '35rem',
        login_signup: '27rem',
        custom2: '70rem',
        header: '96%'
      },
      margin: {
        custom1: '0.9rem',
        custom2: '2px'
      },
    },
  },
  plugins: [],
}
