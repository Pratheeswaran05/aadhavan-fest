/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme'); 

module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'custom-bg': "url('/assets/images/bg.jpg')",
        'bg1' : "url('/assets/bg/bgimg.jpg')",
      },
      colors: {
        darkBlue: "#0D3B66",
        lightCream: "#FAF0CA",
        mustard: "#F4D35E",
        orange: "#EE964B",
        red1: "#F95738",
        // color for header
        primary: "#1a1a2e", // Dark navy background
        secondary: "#16213e", // Slightly lighter navy
        offwhite: "#f5f5f5",
        dropdownBg: "#222831", // Dark dropdown background
        hoverGold: "#d4af37", // Hover effect
        pink: "#e91e63",
        cyan: "#00bcd4",
        blue1: "#2196f3",
        white1: "E4EFE7",
      },
      fontFamily: {
        sans: ['Poppins', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide')
  ],
}

