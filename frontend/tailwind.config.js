import { custom } from "zod";

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "selector",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        xs: "320px",
        sm: "480px",
        md: "768px",
        lg: "1040px",
        xl: "1440px",
      },
      colors: {
        customGray: "#575767",
        customBlue: "#F2F3FF",
      },
    },
  },
  plugins: [],
};
