// src/App.jsx
import React, { useState, useEffect } from 'react';
// Importation des modules nécessaires pour le routage
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// Importation des composants
import Navbar from './components/Navbar';
import Home from './components/Home';
import Quiz from './components/Quiz';
import Login from './components/Login';
import Register from './components/Register';
// Importation des styles globaux
import './index.css';
// Importation du composant Container


const App = () => {
  // État pour gérer les références des sections de la page
  const [sectionRefs, setSectionRefs] = useState({});
  // État pour gérer les informations de l'utilisateur
  const [user, setUser] = useState(null);
  // État pour gérer les questions du quiz
  const [questions, setQuestions] = useState([]);

  // useEffect pour récupérer les informations de l'utilisateur depuis le localStorage au chargement de l'application
  useEffect(() => {
    const loggedUser = localStorage.getItem('user');
    if (loggedUser) {
      setUser(JSON.parse(loggedUser));
    }
  }, []);

  // Fonction pour faire défiler jusqu'à une section spécifique
  const scrollToSection = (section) => {
    sectionRefs[section]?.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    // Router pour gérer le routage dans l'application
    <Router>
      
        {/* Navbar avec les props scrollToSection, user et setUser */}
        <Navbar scrollToSection={scrollToSection} user={user} setUser={setUser} />
        {/* Routes pour définir les différentes routes de l'application */}
        <Routes>
          {/* Route pour la page d'accueil */}
          <Route path="/" element={<Home setRefs={setSectionRefs} />} />
          {/* Route pour le quiz, si l'utilisateur est connecté, affiche le quiz, sinon affiche la page de login */}
          <Route path="/quiz" element={user ? <Quiz user={user} questions={questions} setQuestions={(value) => setQuestions(value)} /> : <Login setUser={setUser} setQuestions={(value) => setQuestions(value)} />} />
          {/* Route pour la page de login */}
          <Route path="/login" element={<Login setUser={setUser} questions={questions} setQuestions={(value) => setQuestions(value)} />} />
          {/* Route pour la page d'enregistrement */}
          <Route path="/register" element={<Register setUser={setUser} questions={questions} setQuestions={(value) => setQuestions(value)} />} />
        </Routes>
   
    </Router>
  );
}

export default App;
