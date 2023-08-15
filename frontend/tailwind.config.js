/** @type {import('tailwindcss').Config} */

export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': "#f8fafc",
        'primary-dark': "#0b1120",
        'text': "#0d0c22",
        'text-dark': "white",
        'text-subtle': "#888888",
        'text-subtle-dark': "#F5F5DC",
        'text-hover': "#0f172a",
        'text-hover-dark': "#94a3b8",
        'bg-hover': "#e9f5f9",
        'bg-hover-dark': "#134b5f",
        'secondary': "#38bdf8",
        'secondary-dark': "#38bdf8",
        'search': "white",
        'search-dark': "#134b5f",
        'accent': " rgb(0,69,79)"
      },
      fontFamily: {
        sans: ['Rubik', 'sans-serif'],
      },

      backgroundImage: {
        "login": "url(./src/assets/loginPageBG.jpg)"
      },

    },
  },
  plugins: [],
}