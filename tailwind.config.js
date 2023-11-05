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
        dark: {
          primary: "#1A120B",
          secondary: "#D5CEA3",
          accent: "#E5E5CB",
          sub: "#E5E5CB",
        },
        natural: {
          primary: "#3C6255",
          secondary: "#EAE7B1",
          accent: "#A6BB8D", //61876E
          sub: "#61876E",
        },
        CoolTonesPalette: {
          primary: "#F1F6F9",
          secondary: "#394867",
          accent: "#212A3E", //61876E
          sub: "#9BA4B5",
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
        sm: ".1rem",
        lg: "1rem",
        xl: "1rem",
        "2xl": "1rem",
      },
    },
  },

  plugins: [require("daisyui")],
};
