/** @type {import('tailwindcss').Config} */
// export default {
//   content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
//   darkMode: 'class',
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// };

module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class', // Use class-based dark mode
  theme: {
    extend: {
      colors: {
        navy: '#001f3f', // Navy color
        white: '#ddc6c6'
      },
    },
  },
  plugins: [],
};