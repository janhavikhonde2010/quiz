import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Quiz = () => {
  const { category } = useParams();
  const navigate = useNavigate();

  const questions = defaultQuestions[category] || [];
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [score, setScore] = useState(0);
  const [location, setLocation] = useState(null);

  // Fetch user location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          const response = await axios.get(`https://geocode.maps.co/reverse?lat=${latitude}&lon=${longitude}&api_key=YOUR_API_KEY`);
          const locationData = response.data.address;
          setLocation({
            country: locationData.country || "Unknown",
            city: locationData.city || locationData.town || "Unknown",
            latitude,
            longitude,
          });
        } catch (error) {
          console.error('Error fetching location:', error);
        }
      },
      (error) => console.error('Geolocation error:', error)
    );
  }, []);

  const handleAnswerSelect = (option) => {
    const correct = questions[currentQuestion].answer === option;
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQuestion]: { 
        question: questions[currentQuestion].question,
        selectedOption: option,
        correctAnswer: questions[currentQuestion].answer,
        reference: questions[currentQuestion].reference,
      }
    }));
    if (correct) setScore((prev) => prev + 1);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = async () => {
    const resultData = {
      username: "Guest", // Replace with actual username if authentication is added
      category,
      score,
      totalQuestions: questions.length,
      answers: Object.values(selectedAnswers),
      location, // Include location
    };

    try {
      await axios.post('http://localhost:5000/api/results/save', resultData);
      navigate('/see-results');
    } catch (error) {
      console.error('Error saving quiz result:', error);
    }
  };

  return (
    <div>
      <h2>{category} Quiz</h2>
      <p>{questions[currentQuestion].question}</p>
      {questions[currentQuestion].options.map((option, index) => (
        <button key={index} onClick={() => handleAnswerSelect(option)}>
          {option}
        </button>
      ))}
      <div>
        {currentQuestion > 0 && <button onClick={handleBack}>Back</button>}
        {currentQuestion < questions.length - 1 ? (
          <button onClick={handleNext}>Next</button>
        ) : (
          <button onClick={handleSubmit}>Submit</button>
        )}
      </div>
    </div>
  );
};

export default Quiz;
