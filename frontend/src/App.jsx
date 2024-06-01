import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Quiz from './components/Quiz';
import Login from './components/Login';
import Register from './components/Register';
import './index.css';

const App = () => {
  const [sectionRefs, setSectionRefs] = useState({});
  const [user, setUser] = useState(null);
  const [questions, setQuestions] = useState([])

  useEffect(() => {
    const loggedUser = localStorage.getItem('user');
    if (loggedUser) {
      setUser(JSON.parse(loggedUser));
    }
  }, []);

  const scrollToSection = (section) => {
    sectionRefs[section]?.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Router>
      <div className="w-screen border border-black h-screen">
        <Navbar scrollToSection={scrollToSection} user={user} setUser={setUser} />
        <Routes>
          <Route path="/" element={<Home setRefs={setSectionRefs} />} />
          <Route path="/quiz" element={user ? <Quiz user={user} questions={questions} setQuestions={(value)=>setQuestions(value)}/> : <Login setUser={setUser} setQuestions={(value)=>setQuestions(value)}/>} />
          <Route path="/login" element={<Login setUser={setUser} questions={questions} setQuestions={(value)=>setQuestions(value)} />} />
          <Route path="/register" element={<Register setUser={setUser} questions={questions} setQuestions={(value)=>setQuestions(value)} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
