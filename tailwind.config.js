import { transform } from 'typescript';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes:{
        wall:{
          "0%":{transform:"scale(0.7)"},
          "100%":{transform:"scale(1)"}
        }
      }
    },
  },
  plugins: [],
}

