// Importation des hooks et des dépendances nécessaires depuis React et d'autres bibliothèques
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Utilisation de useNavigate pour la navigation
import { jwtDecode } from 'jwt-decode'; // Utilisation de jwtDecode pour décoder le jeton JWT
import '../styles/style1.css'; // Importation des styles CSS

// Définition du composant Register avec des props setUser, questions, et setQuestions
const Register = ({ setUser, questions, setQuestions }) => {
  // Définition des états pour username et password avec useState
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // Utilisation de useNavigate pour la navigation entre les pages
  const navigate = useNavigate();

  // Fonction pour gérer la soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Envoi d'une requête POST au serveur pour l'enregistrement
    const response = await fetch('http://localhost:5000/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }), // Envoi des données d'enregistrement
    });

    // Récupération des données de la réponse
    const data = await response.json();

    // Vérification si le token et les questions sont présents dans les données de réponse
    if (data.token && data.questions) {
      // Décodage du token JWT
      const decodedToken = jwtDecode(data.token);

      // Stockage du token JWT et des données utilisateur dans le stockage local
      localStorage.setItem('user', JSON.stringify(decodedToken));
      localStorage.setItem('token', data.token);

      // Mise à jour des questions dans l'état local
      setQuestions(data.questions);

      // Mise à jour de l'utilisateur dans l'état local
      setUser(decodedToken);

      // Navigation vers la page du quiz
      navigate('/quiz');
    } else {
      // Affichage d'une alerte en cas de nom d'utilisateur déjà existant
      alert('username already exists');
    }
  };

  // Rendu du composant
  return (
    <div className="w-full flex justify-center items-center h-screen bg-ph6 bg-cover bg-center">
      <section>
        <div className="form-box">
          <div className="form-value">
            {/* Formulaire d'enregistrement avec soumission appelant handleSubmit */}
            <form onSubmit={handleSubmit} className="w-full h-full flex flex-col justify-center items-center">
              <h2 className="text-2xl">Register</h2>
              <div className="flex flex-col justify-start items-start w-max gap-2">
                {/* Champ de saisie pour le nom d'utilisateur */}
                <div className="inputbox">
                  <input type="text" className="border rounded-md w-max" required value={username} onChange={(e) => setUsername(e.target.value)} />
                  <label>Username</label>
                </div>
                {/* Champ de saisie pour le mot de passe */}
                <div className="inputbox">
                  <input type="password" className="border rounded-md w-max" required value={password} onChange={(e) => setPassword(e.target.value)} />
                  <label>Password</label>
                </div>
              </div>
              {/* Bouton de soumission du formulaire */}
              <button type="submit" className="px-4 py-2 rounded-md bg-blue-500 border text-white hover:bg-blue-700">Register</button>
              {/* Lien vers la page de connexion */}
              <div className="register">
                <p>
                  Already have an account? <a href="/login" className="text-blue-500">Login</a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

// Exportation du composant Register par défaut
export default Register;