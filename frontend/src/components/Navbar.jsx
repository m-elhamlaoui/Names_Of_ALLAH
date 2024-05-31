import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ scrollToSection }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is already logged in when the component mounts
    const loggedUser = localStorage.getItem('user');
    if (loggedUser) {
      setUser(JSON.parse(loggedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
  };

  return (
    <nav className='w-full border border-black h-[10vh] flex flex-row justify-between items-center px-4 sticky'>
      <h1><a href="/">Names of ALLAH</a></h1>
      <ul className='flex flex-row gap-5 w-max items-center'>
        <li><a href="/" onClick={() => scrollToSection('home')}>Home</a></li>
        <li><a href="/" onClick={() => scrollToSection('about')}>About</a></li>
        <li><a href="/" onClick={() => scrollToSection('contact')}>Contact us</a></li>
        {user ? (
          <>
            <li className='p-4 rounded-md border'><a href="/quiz">Go to the Quiz</a></li>
            <li className='p-4 rounded-md border'><button onClick={handleLogout}>Logout</button></li>
          </>
        ) : (
          <div className='flex flex-row w-max gap-5'>
            <li className='p-4 rounded-md border'><a href="/login">Login</a></li>
            <li className='p-4 rounded-md border'><a href="/register">Register</a></li>
          </div>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
