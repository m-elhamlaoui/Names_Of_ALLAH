module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'], // Purge les classes inutilisées en production
  darkMode: false, // 'media' pour utiliser les préférences du système, ou 'class' pour activer le mode sombre via une classe
  theme: {
    extend: {
      backgroundImage: {
        'home': "url('assets/images/home.jpg')", // Ajout d'une image de fond pour la classe 'home'
        'ph6': "url('assets/images/ph6.jpg')", // Ajout d'une image de fond pour la classe 'ph6'
      },
      colors: {
        bisque: '#ffe4c4', // Ajout de la couleur bisque
        customBrown: 'rgb(177, 124, 55)', // Ajout de la couleur customBrown
      },
      boxShadow: {
        orange: '0 0 40px orange', // Ajout de l'ombre orange
        'custom-orange': '0 0 20px orange', // Ajout de l'ombre custom-orange
      },
      borderRadius: {
        '25px': '25px', // Ajout d'un rayon de bordure de 25px
      },
      padding: {
        '20px': '20px', // Ajout de padding de 20px
        '40px': '40px', // Ajout de padding de 40px
      },
      fontSize: {
        '18px': '18px', // Ajout de la taille de police de 18px
        '27px': '27px', // Ajout de la taille de police de 27px
      },
      fontFamily: {
        andalus: ['Andalus', 'sans-serif'], // Ajout de la police Andalus
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};