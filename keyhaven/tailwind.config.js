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
        custom12: '25rem',
        custom2: '70rem',
        custom3: '19rem',
        login_signup: '27rem',
        header: '96%'
      },
      margin: {
        custom1: '0.9rem',
        custom2: '2px'
      },
      screens: {
        'custom': '1057px',
        'xs': '460px',
        'h_xs': { 'raw': '(min-height: 810px)' },
      }
    },
  },
  plugins: [],
}
