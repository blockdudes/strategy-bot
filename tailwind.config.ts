const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        lilac: {
          200: "#E9D7FE",
          300: "#D3ADF7",
          400: "#BC84F3",
          500: "#A560EF", // Adjust these values based on the exact colors you need
        },
      },
    },
  },
  plugins: [],
});
