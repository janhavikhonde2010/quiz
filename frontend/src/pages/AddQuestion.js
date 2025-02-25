import React, { useState } from 'react';

const AddQuestion = () => {
  const [category, setCategory] = useState('');
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '', '', '']);
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [referenceLink, setReferenceLink] = useState('');
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newQuestion = { category, question, options, correctAnswer, referenceLink };
    const updatedQuestions = [...questions, newQuestion];
    setQuestions(updatedQuestions);

    // Reset form fields for next question
    setCategory('');
    setQuestion('');
    setOptions(['', '', '', '']);
    setCorrectAnswer('');
    setReferenceLink('');

    // Move to next question
    setCurrentIndex(updatedQuestions.length);
  };

  const handleNext = () => {
    setCurrentIndex(currentIndex + 1);
  };

  const handleBack = () => {
    setCurrentIndex(currentIndex - 1);
  };

  const handleAddQuiz = () => {
    console.log('Quiz Added:', questions);
    // You can now save the questions to a database or send them to the backend
  };

  return (
    <div className="container">
      <h2>Add a New Question</h2>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
          <input
            type="text"
            placeholder="Question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
          {options.map((opt, index) => (
            <input
              key={index}
              type="text"
              placeholder={`Option ${index + 1}`}
              value={opt}
              onChange={(e) => handleOptionChange(index, e.target.value)}
            />
          ))}
          <input
            type="text"
            placeholder="Correct Answer"
            value={correctAnswer}
            onChange={(e) => setCorrectAnswer(e.target.value)}
          />
          <input
            type="text"
            placeholder="Reference Link"
            value={referenceLink}
            onChange={(e) => setReferenceLink(e.target.value)}
          />

          {/* Navigation Buttons */}
          <div className="button-container">
            {currentIndex > 0 && (
              <button type="button" onClick={handleBack}>
                Back
              </button>
            )}

            {currentIndex < 9 ? (
              <button type="submit">Next</button>
            ) : (
              <button type="button" onClick={handleAddQuiz}>
                Add Quiz
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Display current question index */}
      <p>Question {currentIndex + 1} of 10</p>

      {/* Internal CSS */}
      <style>{`
        .container {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .form-container {
          width: 100%;
          max-width: 600px;
          margin: 20px;
          display: flex;
          flex-direction: column;
        }

        input {
          margin: 10px 0;
          padding: 8px;
          width: 100%;
          border-radius: 5px;
          border: 1px solid #ddd;
        }

        .button-container {
          display: flex;
          justify-content: space-between;
          margin-top: 10px;
          width: 100%;
        }

        button {
          padding: 10px 20px;
          border: none;
          background-color: #4CAF50;
          color: white;
          cursor: pointer;
          width: 48%; /* Ensure buttons are not full-width */
        }

        button:hover {
          background-color: #45a049;
        }
      `}</style>
    </div>
  );
};

export default AddQuestion;
