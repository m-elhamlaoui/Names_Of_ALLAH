import React, { useState } from 'react'; // Import des hooks useState depuis React
import { useNavigate } from 'react-router-dom'; // Import de l'hook useNavigate depuis react-router-dom
import { jwtDecode } from 'jwt-decode'; // Import de jwtDecode depuis jwt-decode
import '../styles/style1.css'; // Import du fichier de style style1.css

const Login = ({ setUser, questions, setQuestions }) => {
  // Définition du composant Login avec des props setUser, questions, et setQuestions
  const [username, setUsername] = useState(''); // Déclaration de l'état username avec useState
  const [password, setPassword] = useState(''); // Déclaration de l'état password avec useState
  const navigate = useNavigate(); // Initialisation de l'hook useNavigate pour la navigation

  const handleSubmit = async (e) => {
    // Fonction de gestion de la soumission du formulaire
    e.preventDefault(); // Empêche le rechargement de la page lors de la soumission

    // Requête POST pour la connexion à l'API
    const response = await fetch('http://localhost:5000/login', {
      method: 'POST', // Méthode POST
      headers: { 'Content-Type': 'application/json' }, // En-tête de type JSON
      body: JSON.stringify({ username, password }), // Corps de la requête avec les informations de connexion
    });

    const data = await response.json(); // Conversion de la réponse en JSON
    if (data.token && data.questions) {
      // Vérification de la présence du token et des questions dans la réponse
      const decodedToken = jwtDecode(data.token); // Décodage du token JWT
      localStorage.setItem('user', JSON.stringify(decodedToken)); // Stockage du token dans le localStorage
      localStorage.setItem('token', data.token); // Stockage des questions dans le localStorage
      setQuestions(data.questions); // Mise à jour de l'état des questions
      setUser(decodedToken); // Mise à jour de l'utilisateur avec le token décodé
      navigate('/quiz'); // Navigation vers la page du quiz
    } else {
      alert('username or password are invalid'); // Alerte en cas d'identifiants invalides
    }
  };

  return (
    // Rendu du composant Login
    <div className="w-full flex flex-col justify-center items-center h-screen bg-ph6 bg-cover bg-center">
      <section>
        <div className="form-box">
          <div className="form-value">
            <form onSubmit={handleSubmit} className="w-full h-full flex flex-col justify-center items-center">
              <h2 className="text-2xl">Login</h2> {/* Titre du formulaire */}
              <div className="flex flex-col justify-start items-start w-max gap-2">
                {/* Zone de saisie pour le nom d'utilisateur */}
                <div className="inputbox">
                  <input
                    type="text"
                    className="border rounded-md w-max"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  <label>Username</label>
                </div>
                {/* Zone de saisie pour le mot de passe */}
                <div className="inputbox">
                  <input
                    type="password"
                    className="border rounded-md w-max"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <label>Password</label>
                </div>
              </div>
              {/* Bouton de soumission du formulaire */}
              <button type="submit" className="px-4 py-2 rounded-md bg-blue-500 border text-white hover:bg-blue-700">
                Log in
              </button>
              {/* Lien vers la page d'inscription */}
              <div className="register">
                <p>
                  Don't have an account? <a href="/register" className="text-blue-500">Register</a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login; // Export du composant Login