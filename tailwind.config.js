/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
      xs: "475px",
      tall: { raw: "(min-height: 750px)" },
      short: { raw: "(min-height: 590px)" },
      ...defaultTheme.screens,
    },
    extend: {
      backgroundImage: {
        mainImage: "url('./assets/images/Banner.jpg')",
        card: "url('./assets/images/Card.jpg')",
      },
      backgroundPosition: {
        'bottom-custom': 'right bottom -4rem',
      }
    },
  },
  plugins: [],
}
