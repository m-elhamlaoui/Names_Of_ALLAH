import React, { useState, useEffect } from 'react';

const questions = [
    {
        question: "The All-Compassionate, The Beneficent, The One who has plenty of mercy towards the believers and the blasphemers in this world and especially to the believers in the here-after. The Mercy to all.",
        answers: [
            { text: "Ar-Rahiim", correct: false },
            { text: "Ar-Rahman", correct: true },
            { text: "Al-Malik", correct: false },
            { text: "Al-Quddus", correct: false },
        ]
    },
    {
        question: "The All-Merciful.The Kind one, The One who has plenty of mercy towards the believers in this world and in the here-after.",
        answers: [
            { text: "Al-Baari", correct: false },
            { text: "As-Salaam", correct: false },
            { text: "Al-Muhaymin", correct: false },
            { text: "Ar-Rahiim", correct: true },
        ]
    },
    {
        question: "The King, The Sovereign Lord, The One with the complete Dominion, the One Whose Dominion is completely clear from imperfection.",
        answers: [
            { text: "Al-Jabbaar", correct: false },
            { text: "Al-Khaaliq", correct: false },
            { text: "Al-Malik", correct: true },
            { text: "Al-Qahhaar", correct: false },
        ]
    }
];

const Quiz = () => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState(null);

    useEffect(() => {
        setSelectedAnswer(null);
    }, [currentQuestionIndex]);

    const handleAnswerButtonClick = (isCorrect) => {
        if (isCorrect) {
            setScore(score + 1);
        }
        setSelectedAnswer(isCorrect);
    };

    const handleNextButtonClick = () => {
        const nextQuestion = currentQuestionIndex + 1;
        if (nextQuestion < questions.length) {
            setCurrentQuestionIndex(nextQuestion);
        } else {
            setShowScore(true);
        }
    };

    const handleRestartButtonClick = () => {
        setScore(0);
        setCurrentQuestionIndex(0);
        setShowScore(false);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 border gap-5">
            {showScore ? (
                <div className="bg-white p-8 rounded-lg shadow-md text-center">
                    <h1 className="text-2xl font-bold mb-4">Quiz Results</h1>
                    <p className="mb-4">You scored {score} out of {questions.length}!</p>
                    <button
                        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
                        onClick={handleRestartButtonClick}
                    >
                        Play Again
                    </button>
                </div>
            ) : (
                <div className="bg-white p-8 rounded-lg shadow-md">
                    <h1 className="text-2xl font-bold mb-6">Quiz about The Names of ALLAH</h1>
                    <div className="mb-4">
                        <h2 className="text-xl font-semibold mb-4">{questions[currentQuestionIndex].question}</h2>
                        <div className="flex flex-col space-y-2">
                            {questions[currentQuestionIndex].answers.map((answer, index) => (
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
                                    onClick={() => handleAnswerButtonClick(answer.correct)}
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
                        {currentQuestionIndex < questions.length - 1 ? 'Next' : 'Show Score'}
                    </button>
                </div>
            )}
        </div>
    );
};

export default Quiz;
