module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, 
  theme: {
    extend: {
      backgroundImage: {
        'home': "url('assets/images/home.jpg')",
      }
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}