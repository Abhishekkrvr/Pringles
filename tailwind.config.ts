import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "#F6EBD6",
        paper: "#EFE0BF",
        ink: "#241408",
        gold: "#EDA424",
      },
      fontFamily: {
        display: ["Fredoka", "sans-serif"],
        body: ["'Space Grotesk'", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
