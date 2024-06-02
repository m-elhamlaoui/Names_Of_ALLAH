import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';

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
    <nav >
      <h1 className='A'><a href="/">Names of ALLAH</a></h1>
      
      <ul >
        <li><a href="/">Home</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#contact">Contact us</a></li>
        {user ? (
          <>
            <li className=""><a href="/quiz">Go to the Quiz</a></li>
            <li className=""><button onClick={handleLogout}>Logout</button></li>
          </>
        ) : (
          <div className="flex flex-col md:flex-row md:gap-5">
            <li className=""><a href="/login">Login</a></li>
            <li className="
            "><a href="/register">Register</a></li>
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
