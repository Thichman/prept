/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        btn: {
          background: "hsl(var(--btn-background))",
          "background-hover": "hsl(var(--btn-background-hover))",
        },

        'brefd-primary': {
          'indigo': '#5E17EB',
          'yellow': '#FAD02C',
          'purple': '#7447E1',
          'black': '#100F0F'
        },
        'brefd-secondary': {
          'gradient-start': '#FF914D',
          'gradient-end': '#FAD02CB',
          'gray-lights': '#C0C0C0',
          'gray-dark': '#9A9696',
        },
      },
    },
    plugins: [

    ],
  },
};
