/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        pinyon: ["Pinyon Script"],
        faustina: ["Faustina"],
      },
      
    },
  },
  plugins: [require("flowbite/plugin")],
};
