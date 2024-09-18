/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        mobile: { max: "640px" },
        desktop: { max: "1440px" },
      },
    },
  },
  plugins: [],
};
