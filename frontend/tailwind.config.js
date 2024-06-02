module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, 
  theme: {
    extend: {
      backgroundImage: {
        'home': "url('assets/images/home.jpg')",
         'ph6': "url('assets/images/ph6.jpg')",
      }
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}