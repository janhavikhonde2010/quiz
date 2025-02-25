import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const defaultQuestions = {
  Science: [
    { question: 'What is the chemical symbol for gold?', options: ['Au', 'Ag', 'Pb', 'Fe'], answer: 'Au', reference: 'https://www.chemistry.com/gold' },
    { question: 'What planet is known as the Red Planet?', options: ['Earth', 'Mars', 'Jupiter', 'Venus'], answer: 'Mars', reference: 'https://www.space.com/mars' },
  ],
  Math: [
    { question: 'What is 5 + 7?', options: ['10', '12', '14', '15'], answer: '12', reference: 'https://www.math.com/addition' },
    { question: 'What is the square root of 64?', options: ['6', '7', '8', '9'], answer: '8', reference: 'https://www.math.com/square-root' },
  ],
  History: [
    { question: 'Who was the first President of the United States?', options: ['Abraham Lincoln', 'George Washington', 'John Adams', 'Thomas Jefferson'], answer: 'George Washington', reference: 'https://www.history.com/george-washington' },
    { question: 'What year did World War II end?', options: ['1942', '1945', '1950', '1939'], answer: '1945', reference: 'https://www.history.com/wwii' },
  ],
};

const Quiz = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const questions = defaultQuestions[category] || [];
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [quizResults, setQuizResults] = useState([]);

  const handleNext = () => {
    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = selectedAnswer === currentQuestion.answer;

    if (isCorrect) {
      setScore(score + 1);
    }

    setQuizResults([
      ...quizResults,
      {
        question: currentQuestion.question,
        selectedAnswer,
        correctAnswer: currentQuestion.answer,
        reference: currentQuestion.reference,
      },
    ]);
    setSelectedAnswer(null);
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  const handleFinish = () => {
    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = selectedAnswer === currentQuestion.answer;

    if (isCorrect) {
      setScore(score + 1);
    }

    setQuizResults([
      ...quizResults,
      {
        question: currentQuestion.question,
        selectedAnswer,
        correctAnswer: currentQuestion.answer,
        reference: currentQuestion.reference,
      },
    ]);

    navigate('/results', { state: { quizResults, score, totalQuestions: questions.length } });
  };

  if (currentQuestionIndex >= questions.length) {
    return null; // This will be handled by the Results page.
  }

  return (
    <div>
      <h2>{category} Quiz</h2>
      <h3>{questions[currentQuestionIndex].question}</h3>
      <div>
        {questions[currentQuestionIndex].options.map((option) => (
          <button key={option} onClick={() => setSelectedAnswer(option)}>{option}</button>
        ))}
      </div>
      <div>
        {currentQuestionIndex === questions.length - 1 ? (
          <button onClick={handleFinish}>Finish Quiz</button>
        ) : (
          <button onClick={handleNext}>Next</button>
        )}
      </div>
    </div>
  );
};

export default Quiz;
