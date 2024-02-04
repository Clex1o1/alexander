/** @type {import('tailwindcss').Config} */
export default {
  content: [],
  theme: {
    extend: {
      fontFamily: {
        default: ["IBM Plex Sans", "sans-serif"],
        headline: ["Modenine", "sans-serif"],
        mono: ["IBM Plex Mono", "monospace"],
      },
    },
  },
  plugins: [],
  safelist: ["router-link-active", "router-link-exact-active"],
};
