import React, { useState, useEffect } from 'react';

const Navbar = ({ scrollToSection, user, setUser }) => {
  // État pour gérer l'ouverture/fermeture du menu mobile
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Effet pour vérifier si un utilisateur est déjà connecté
  useEffect(() => {
    // Récupérer les informations de l'utilisateur depuis le localStorage
    const loggedUser = localStorage.getItem('user');
    if (loggedUser) {
      // Si un utilisateur est trouvé, mettre à jour l'état avec ses informations
      setUser(JSON.parse(loggedUser));
    }
  }, [setUser]); // Dépendance pour s'assurer que l'effet s'exécute seulement lorsque setUser change

  // Fonction pour basculer l'état du menu mobile (ouvert/fermé)
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="h-[65px] bg-transparent flex items-center justify-between px-5 fixed w-full z-10">
      {/* Logo du site avec un lien vers la page d'accueil */}
      <h1 className="text-black bg-bisque rounded-full p-2.5 text-2xl font-andalus shadow-orange">
        <a href="/">Names of ALLAH</a>
      </h1>

      {/* Menu de navigation pour les écrans de taille moyenne et plus grande */}
      <ul className="hidden md:flex list-none">
        <li className="ml-5">
          <a href="/" className="no-underline text-black text-[20px]">Home</a>
        </li>
        <li className="ml-5">
          <a href="#about" className="no-underline text-black text-[20px]">About</a>
        </li>
        <li className="ml-5">
          <a href="#contact" className="no-underline text-black text-[20px]">Contact us</a>
        </li>
      </ul>

      {/* Bouton pour ouvrir/fermer le menu mobile */}
      <div className="block md:hidden">
        <button onClick={toggleMenu} className="focus:outline-none">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      </div>

      {/* Menu de navigation pour les écrans de petite taille, affiché conditionnellement */}
      {isMenuOpen && (
        <ul className="flex flex-col md:hidden absolute top-[65px] left-0 w-full bg-white list-none">
          <li className="ml-5">
            <a href="/" onClick={toggleMenu} className="no-underline text-black text-[20px]">Home</a>
          </li>
          <li className="ml-5">
            <a href="#about" onClick={toggleMenu} className="no-underline text-black text-[20px]">About</a>
          </li>
          <li className="ml-5">
            <a href="#contact" onClick={toggleMenu} className="no-underline text-black text-[20px]">Contact us</a>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
