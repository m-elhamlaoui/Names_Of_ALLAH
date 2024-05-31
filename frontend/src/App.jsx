import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Quiz from './components/Quiz';
import Login from './components/Login';
import Register from './components/Register';
import './index.css';

function App() {
  const [sectionRefs, setSectionRefs] = useState({});

  const scrollToSection = (section) => {
    sectionRefs[section]?.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Router>
      <div className="w-screen border h-screen">
        <Navbar scrollToSection={scrollToSection} />
        <Routes>
          <Route path="/" element={<Home setRefs={setSectionRefs} />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
