/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        c1: "#164B60",
        c2: "#1B6B93",
        c3: "#4FC0D0",
        c4: "#A2FF86",
      },
      fontFamily: {
        inconsolata: ["Inconsolata", "monospace"],
      },
      screens: {
        sm: "400px",
        md: "550px",
        lg: "750px",
        xl: "1024px",
      },
    },
  },
  plugins: [],
};
