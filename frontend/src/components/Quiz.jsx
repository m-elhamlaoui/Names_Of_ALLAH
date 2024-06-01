import React, { useState, useEffect } from 'react';

const Quiz = ({ questions, user }) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [myQuestions, setMyQuestions] = useState(null);
    const [userToken, setUserToken] = useState(null);
    const [questionsNumber, setQuestionsNumber] = useState(0);

    useEffect(() => {
        setSelectedAnswer(null);
    }, [currentQuestionIndex]);

    useEffect(() => {
        if (questions) {
            if (questions.length === 0) {
                setShowScore(true);
                setScore(user.score);
                setQuestionsNumber(3);
                setMyQuestions(null);
            } else {
                setMyQuestions(questions);
                setQuestionsNumber(questions.length);
            }
        }
    }, [questions]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        setUserToken(token);
    }, [user]);

    const handleAnswerButtonClick = async (isCorrect, questionId) => {
        if (isCorrect) {
            setScore(score + 1);
        }
        setSelectedAnswer(isCorrect);

        try {
            const response = await fetch('http://localhost:5000/update-user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userToken}`
                },
                body: JSON.stringify({ questionId, isCorrect, id: user.id })
            });

            if (!response.ok) {
                throw new Error('Error updating user data');
            }
        } catch (error) {
            console.error("Error updating user data:", error);
        }
    };

    const handleNextButtonClick = () => {
        const nextQuestion = currentQuestionIndex + 1;
        if (nextQuestion < myQuestions.length) {
            setCurrentQuestionIndex(nextQuestion);
        } else {
            setShowScore(true);
        }
    };

    const handleRestartButtonClick = async () => {
        setScore(0);
        setCurrentQuestionIndex(0);
        setShowScore(false);

        try {
            const response = await fetch('http://localhost:5000/reset-user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userToken}`
                },
                body: JSON.stringify({ id: user.id })
            });

            if (!response.ok) {
                throw new Error('Error resetting user data');
            }

            // Optionally, you can reload the questions here
            const data = await response.json();
            setMyQuestions(data.questions);
        } catch (error) {
            console.error("Error resetting user data:", error);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 border gap-5">
            {showScore === true ? (
                <div className="bg-white p-8 rounded-lg shadow-md text-center">
                    <h1 className="text-2xl font-bold mb-4">Quiz Results</h1>
                    <p className="mb-4">You scored {score} out of {questionsNumber}!</p>
                    <button
                        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
                        onClick={handleRestartButtonClick}
                    >
                        Play Again
                    </button>
                </div>
            ) : (
                myQuestions && myQuestions.length > 0 && (
                    <div className="bg-white p-8 rounded-lg shadow-md">
                        <h1 className="text-2xl font-bold mb-6">Quiz about The Names of ALLAH</h1>
                        <div className="mb-4">
                            <h2 className="text-xl font-semibold mb-4">{myQuestions[currentQuestionIndex].question}</h2>
                            <div className="flex flex-col space-y-2">
                                {myQuestions[currentQuestionIndex].answers.map((answer, index) => (
                                    <button
                                        key={index}
                                        className={`py-2 px-4 rounded transition duration-200 ${
                                            selectedAnswer !== null
                                                ? answer.correct
                                                    ? 'bg-green-500 text-white'
                                                    : selectedAnswer === answer.correct
                                                    ? 'bg-red-500 text-white'
                                                    : 'bg-gray-200 text-gray-800'
                                                : 'bg-blue-500 text-white hover:bg-blue-600'
                                        }`}
                                        onClick={() => handleAnswerButtonClick(answer.correct, myQuestions[currentQuestionIndex]._id)}
                                        disabled={selectedAnswer !== null}
                                    >
                                        {answer.text}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <button
                            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200 mt-4"
                            onClick={handleNextButtonClick}
                            disabled={selectedAnswer === null}
                        >
                            {currentQuestionIndex < myQuestions.length - 1 ? 'Next' : 'Show Score'}
                        </button>
                    </div>
                )
            )}
        </div>
    );
};

export default Quiz;
