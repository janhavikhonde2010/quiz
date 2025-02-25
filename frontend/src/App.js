import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Quiz from './pages/Quiz';
import AddQuestion from './pages/AddQuestion';
import SignIn from './pages/SignIn';
import Results from './components/Results';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quiz/:category" element={<Quiz />} />
        <Route path="/add-question" element={<AddQuestion />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/results" element={<Results />} />
      </Routes>
    </Router>
  );
}

export default App;
