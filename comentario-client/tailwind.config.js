/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      sm: '480px',
      md: '700px',
      lg: '976px',
      xl: '1200px'
    },
    extend: {
      colors: {
        bgColor: '#f8f9fd',
        primaryWhite: '#ffffff',
        primaryBlue: '#2e80ec',
      }
    },
  },
  plugins: [],
}

