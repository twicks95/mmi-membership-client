/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    // dropShadow: {
    //   'drop-shadow': '0 2px 25px -7px rgba(0,0,0,0.25)'
    // },
    boxShadow: {
      'md': '0 2px 25px -7px rgba(0,0,0,0.25)'
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      textColor: {
        'color-header-main': '#606060',
        'color-footer-main': '#F9F9F9'
      },
      fontSize: {
        'xs': '0.5rem', //8px
        'sm': '0.625rem', //10px
        'base-extend': '0.75rem' //12px
      }
      // dropShadow: {
      //   'drop-shadow': '0 2px 25px -7px rgba(0,0,0,0.25)'
      // }
      // boxShadow: {
      //   'custom': '0 2px 25px -7px rgba(0,0,0,0.25)'
      // }
    },
  },
  plugins: [],
};
