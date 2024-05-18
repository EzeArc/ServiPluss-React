import animations from "tailwindcss-animated";
const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", flowbite],
  darkMode: "media",
  theme: {
    extend: {
      fontFamily: {
        tomaso: ["Tomaso", "sans-serif"],
        jura: ["Jura", "sans-serif"],
      },
    },
  },
  plugins: [animations, flowbite.plugin()],
};
