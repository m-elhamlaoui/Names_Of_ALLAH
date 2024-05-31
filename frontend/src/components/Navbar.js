import React from 'react';
import '../styles/style3.css'
import '../styles/styles.css'
import '../styles/stype2.css'

const Navbar = () => {
  return (
    <nav>
      <h1 className="A"><a href="/">Names of ALLAH</a></h1>
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="about">About</a></li>
        <li><a href="contact">Contact us</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;
