/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      // adding custom classes
      fontFamily:{
        "poppins":["Poppins", "sans-serif"],
      },
      height:{
        "1/10":["8%"],
      }
    },
  },
  plugins: [
  ],
}