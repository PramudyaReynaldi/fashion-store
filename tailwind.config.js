/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        'primary': '#FFFFFF',
        'secondary': '#FBEBB5',
        'accent': '#FAF4F4',
      },
      colors: {
        'primary': '#000000',
        'secondary': '#9F9F9F',
      },
    },
  },
  plugins: [],
};
