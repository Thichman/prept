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

        'prept-color': {
          'main-green': '#6DD47E',
          'background-lighter-green': '#ADFFBA',
          'header-gray-black': '#1B1B1B',
          'gray-white': '#EDEDED',
        },
      },
    },
  },
  plugins: [

  ]
};
