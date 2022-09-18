/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      lineClamp: {
        10: "10",
        12: "12",
      }
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
}
