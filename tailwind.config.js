const {nextui} = require("@nextui-org/react");
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/views/**/*.{jsx,js}", "./src/components/**/*.{jsx,js}", "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [nextui()],
}
