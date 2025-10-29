/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        parroquia: {
          primary: '#0f4c75',
          accent: '#3282b8',
          light: '#bbe1fa',
          neutral: '#1b262c',
        },
      },
    },
  },
  plugins: [],
}
