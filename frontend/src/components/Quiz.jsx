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
        <div className="app">
            {showScore ? (
                <div className="score-section">
                    You scored {score} out of {questions.length}!
                    <button onClick={handleRestartButtonClick}>Play Again</button>
                </div>
            ) : (
                <div className="quiz-section">
                    <h1>Quiz about The Names of ALLAH</h1>
                    <div className="question-section">
                        <h2 id="question">{questions[currentQuestionIndex].question}</h2>
                        <div id="answer-buttons">
                            {questions[currentQuestionIndex].answers.map((answer, index) => (
                                <button
                                    key={index}
                                    className={`btn ${selectedAnswer !== null && answer.correct ? 'correct' : ''} ${selectedAnswer !== null && !answer.correct && selectedAnswer === answer.correct ? 'incorrect' : ''}`}
                                    onClick={() => handleAnswerButtonClick(answer.correct)}
                                    disabled={selectedAnswer !== null}
                                >
                                    {answer.text}
                                </button>
                            ))}
                        </div>
                    </div>
                    <button id="next-btn" onClick={handleNextButtonClick} disabled={selectedAnswer === null}>
                        {currentQuestionIndex < questions.length - 1 ? 'Next' : 'Show Score'}
                    </button>
                </div>
            )}
        </div>
    );
};

export default Quiz;
