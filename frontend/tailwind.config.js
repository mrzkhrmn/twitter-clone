/** @type {import('tailwindcss').Config} */

import daisyui from "daisyui";
import daisyuiUIThemes from "daisyui/src/theming/themes";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      "light",
      {
        black: {
          ...daisyuiUIThemes["black"],
          primary: "rgb(29, 155, 240)",
          secondary: "rgb(24, 24, 24)",
        },
      },
    ],
  },
};
