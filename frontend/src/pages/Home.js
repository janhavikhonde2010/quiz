import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const categories = [
{ name: 'Science', image: '/images/science.jpg' },
  { name: 'Math', image: '/images/math.jpg' },
  { name: 'History', image: '/images/history.jpg' },
  { name: 'Geography', image: '/images/geography.jpg' },
  { name: 'Technology', image: '/images/technology.jpg' },
  { name: 'Sports', image: '/images/sports.jpg' },
  { name: 'Entertainment', image: '/images/entertainment.jpg' },
  { name: 'Politics', image: '/images/politics.jpg' },
  { name: 'Art', image: '/images/art.jpg' },
  
];

const Home = () => {
  
  const navigate = useNavigate();

  return (
    <div className="container">
      <h1>Welcome to the Quiz Game!</h1>
      <h2>Select a category:</h2>
      <div className="quiz-grid">
        {categories.map((category) => (
          <div key={category.name} className="quiz-card">
            <img src={category.image} alt={category.name} />
            <h3>{category.name}</h3>
            <button onClick={() => navigate(`/quiz/${category.name}`)}>
              Take Quiz
            </button>
          </div>
        ))}
      </div><br></br>
      
      {/* Footer Section */}
      <footer className="footer">
        <p>© 2025 Quiz Game. All Rights Reserved.</p>
        <p>Janhavi Khonde.</p>
       
      </footer>
    </div>
  );
};

export default Home;
