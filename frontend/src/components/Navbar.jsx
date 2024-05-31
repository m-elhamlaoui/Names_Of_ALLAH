import React from 'react';

const Navbar = ({ scrollToSection }) => {
  return (
    <nav className='w-full border border-black h-[10vh] flex flex-row justify-between items-center px-4 sticky'>
      <h1 className=""><a href="/">Names of ALLAH</a></h1>
      <ul className='flex flex-row gap-5 w-max'>
        <li><a href="/" onClick={() => scrollToSection('home')}>Home</a></li>
        <li><a href="/" onClick={() => scrollToSection('about')}>About</a></li>
        <li><a href="/" onClick={() => scrollToSection('contact')}>Contact us</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;
