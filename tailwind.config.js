/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  daisyui: {
    themes: [
      {
        light: {
          primary: "#F3F0CA",
          secondary: "#192655",
          accent: "#3876bf",
          sub: "#e1aa74",
        },
      },
    ],
  },
  theme: {
    extend: {
      fontFamily: {
        Rubik: ["Rubik"],
      },
    },
    container: {
      padding: {
        DEFAULT: "1rem",
        sm: "2rem",
        lg: "1rem",
        xl: "1rem",
        "2xl": "1rem",
      },
    },
  },

  plugins: [require("daisyui")],
};
