// Importation des hooks et des dépendances nécessaires depuis React
import React, { useState, useEffect } from 'react';
// Importation d'une image depuis les assets
import img from '../assets/images/pho5.jpg';

// Définition du composant fonctionnel Quiz avec des props 'questions' et 'user'
const Quiz = ({ questions, user }) => {
    // Déclaration des états pour la gestion du quiz
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // Index de la question actuelle
    const [score, setScore] = useState(0); // Score de l'utilisateur
    const [showScore, setShowScore] = useState(false); // Indicateur pour afficher le score final
    const [selectedAnswer, setSelectedAnswer] = useState(null); // Réponse sélectionnée par l'utilisateur
    const [myQuestions, setMyQuestions] = useState(null); // Liste des questions à afficher
    const [userToken, setUserToken] = useState(null); // Token de l'utilisateur pour l'authentification
    const [questionsNumber, setQuestionsNumber] = useState(0); // Nombre total de questions

    // Effet pour réinitialiser la réponse sélectionnée à chaque changement de question
    useEffect(() => {
        setSelectedAnswer(null);
    }, [currentQuestionIndex]);

    // Effet pour mettre à jour les questions, le score et le nombre de questions
    useEffect(() => {
        if (questions) {
            if (questions.length === 0) {
                setShowScore(true); // Afficher le score si aucune question n'est disponible
                setScore(user.score); // Mettre à jour le score avec le score utilisateur
                setQuestionsNumber(3); // Définir le nombre de questions
                setMyQuestions(null); // Réinitialiser les questions
            } else {
                setScore(user.score); // Mettre à jour le score utilisateur
                setMyQuestions(questions); // Définir les questions
                setQuestionsNumber(questions.length); // Définir le nombre de questions
            }
        }
    }, [questions, user.score]);

    // Effet pour récupérer et mettre à jour le token utilisateur depuis le localStorage
    useEffect(() => {
        const token = localStorage.getItem('token');
        setUserToken(token);
    }, [user]);

    // Fonction pour gérer le clic sur un bouton de réponse
    const handleAnswerButtonClick = async (isCorrect, questionId) => {
        if (isCorrect) {
            setScore(score + 1); // Augmenter le score si la réponse est correcte
        }
        setSelectedAnswer(isCorrect); // Mettre à jour l'état de la réponse sélectionnée

        // Envoi des données de réponse au serveur pour mettre à jour l'utilisateur
        try {
            const response = await fetch('http://localhost:5000/update-user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userToken}`
                },
                body: JSON.stringify({ questionId, isCorrect, id: user.id }) // Corps de la requête
            });

            if (!response.ok) {
                throw new Error('Error updating user data');
            }
        } catch (error) {
            console.error("Error updating user data:", error);
        }
    };

    // Fonction pour passer à la question suivante
    const handleNextButtonClick = () => {
        const nextQuestion = currentQuestionIndex + 1;
        if (nextQuestion < myQuestions.length) {
            setCurrentQuestionIndex(nextQuestion); // Passer à la question suivante
        } else {
            setShowScore(true); // Afficher le score si toutes les questions sont terminées
        }
    };

    // Fonction pour redémarrer le quiz
    const handleRestartButtonClick = async () => {
        setScore(0); // Réinitialiser le score
        setCurrentQuestionIndex(0); // Réinitialiser l'index de la question actuelle
        setShowScore(false); // Masquer le score

        // Réinitialisation des données utilisateur sur le serveur
        try {
            const response = await fetch('http://localhost:5000/reset-user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userToken}`
                },
                body: JSON.stringify({ id: user.id }) // Corps de la requête
            });

            if (!response.ok) {
                throw new Error('Error resetting user data');
            }

            // Optionnellement, rechargez les questions ici
            const data = await response.json();
            setMyQuestions(data.questions); // Mettre à jour les questions avec les nouvelles données
        } catch (error) {
            console.error("Error resetting user data:", error);
        }
    };

    // Rendu du composant
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 border gap-5 bg-cover" style={{ backgroundImage: `url(${img})` }}>
            <header className="w-full bg-blue shadow-md py-4 px-8 mb-5">
                <div className="flex justify-between items-center">
                    <h1 className="text-white font-bold">Quiz about the names of ALLAH</h1>
                    <div className="text-white font-bold">
                        Score: {score} | Remaining questions: {questionsNumber - currentQuestionIndex - 1}
                    </div>
                </div>
            </header>
            {showScore ? (
                // Affichage des résultats lorsque le quiz est terminé
                <div className="bg-white p-8 rounded-lg shadow-md text-center">
                    <h1 className="text-2xl font-bold mb-4">Quiz results</h1>
                    <p className="mb-4">You scored {score} out of {questionsNumber}!</p>
                    <button
                        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
                        onClick={handleRestartButtonClick}
                    >
                        Play again
                    </button>
                </div>
            ) : (
                // Affichage des questions et réponses lorsque le quiz est en cours
                myQuestions && myQuestions.length > 0 && (
                    <div className="bg-brown p-8 rounded-lg shadow-md">
                        <div className="mb-4">
                            <h2 className="text-orange-400 text-4xl font-semibold mb-5 ">{myQuestions[currentQuestionIndex].question}</h2>
                            <div className="flex flex-col space-y-2">
                                {myQuestions[currentQuestionIndex].answers.map((answer, index) => (
                                    <button
                                        key={index}
                                        className={`py-2 px-4 rounded transition duration-200 ${
                                            selectedAnswer !== null
                                                ? answer.correct
                                                    ? 'bg-green-500 text-white' // Afficher en vert si la réponse est correcte
                                                    : selectedAnswer === answer.correct
                                                    ? 'bg-red-500 text-white' // Afficher en rouge si la réponse est incorrecte
                                                    : 'bg-white-100 text-white-800' // Afficher les autres réponses en gris
                                                : 'bg-white-100 text-black hover:bg-white-300' // Afficher en blanc si aucune réponse n'est sélectionnée
                                        }`}
                                        onClick={() => handleAnswerButtonClick(answer.correct, myQuestions[currentQuestionIndex]._id)}
                                        disabled={selectedAnswer !== null} // Désactiver le bouton si une réponse est sélectionnée
                                    >
                                        {answer.text}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <button
                            className="bg-orange-300 text-white py-2 px-4 rounded hover:bg-orange-400 transition duration-200 mt-4"
                            onClick={handleNextButtonClick}
                            disabled={selectedAnswer === null} // Désactiver le bouton suivant si aucune réponse n'est sélectionnée
                        >
                            {currentQuestionIndex < myQuestions.length - 1 ? 'Next' : 'Show Score'} 
                        </button>
                    </div>
                )
            )}
        </div>
    );
};

// Exportation du composant Quiz pour utilisation dans d'autres parties de l'application
export default Quiz;
