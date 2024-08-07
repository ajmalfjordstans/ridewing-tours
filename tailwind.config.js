/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'hero': 'url("/images/background/landing-hero.jpg")',
        'japan': 'url("/images/background/japan.jpg")',
        'uk': 'url("/images/background/uk.jpg")',
        'categories': 'url("/images/background/categories.jpg")',
      },
      colors: {
        'secondary': "#FFCC00",
        'custom-red': "#E4322C",
      }
    },
  },
  plugins: [],
});
