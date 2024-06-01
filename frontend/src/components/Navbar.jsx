import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ scrollToSection, user, setUser }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedUser = localStorage.getItem('user');
    if (loggedUser) {
      setUser(JSON.parse(loggedUser));
    }
  }, [setUser]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
    navigate('/');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="w-full border border-black h-[10vh] flex flex-row justify-between items-center px-4 bg-white">
      <h1 className=''><a href="/">Names of ALLAH</a></h1>
      
      <ul className={`flex-col md:flex-row gap-5 w-full md:w-max items-center md:top-0 absolute top-[10vh] left-0 md:relative bg-white md:bg-transparent md:flex ${isMenuOpen ? 'block' : 'hidden'}`}>
        <li className="cursor-pointer" onClick={() => scrollToSection('home')}>Home</li>
        <li className="cursor-pointer" onClick={() => scrollToSection('about')}>About</li>
        <li className="cursor-pointer" onClick={() => scrollToSection('contact')}>Contact us</li>
        {user ? (
          <>
            <li className="md:p-4 md:rounded-md md:border cursor-pointer"><a href="/quiz">Go to the Quiz</a></li>
            <li className="md:p-4 md:rounded-md md:border cursor-pointer"><button onClick={handleLogout}>Logout</button></li>
          </>
        ) : (
          <div className="flex flex-col md:flex-row md:gap-5">
            <li className="md:p-4 md:rounded-md md:border cursor-pointer"><a href="/login">Login</a></li>
            <li className="md:p-4 md:rounded-md md:border cursor-pointer"><a href="/register">Register</a></li>
          </div>
        )}
      </ul>
      <div className="block md:hidden">
        <button onClick={toggleMenu} className="focus:outline-none">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
