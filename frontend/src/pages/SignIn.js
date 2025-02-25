import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
  const [username, setUsername] = useState('');
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already signed in
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleSignIn = (e) => {
    e.preventDefault();
    if (username.trim()) {
      localStorage.setItem('user', JSON.stringify(username));
      setUser(username);
      navigate('/'); // Redirect to home after sign-in
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      {user ? (
        <>
          <h2>Welcome, {user}!</h2>
          <button onClick={handleSignOut} style={buttonStyle}>Sign Out</button>
        </>
      ) : (
        <>
          <h2>Sign In</h2>
          <form onSubmit={handleSignIn}>
            <input
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              style={inputStyle}
            />
            <button type="submit" style={buttonStyle}>Sign In</button>
          </form>
        </>
      )}
    </div>
  );
};

// Inline CSS
const inputStyle = {
  width: '80%',
  padding: '10px',
  margin: '10px 0',
  border: '1px solid #ddd',
  borderRadius: '5px'
};

const buttonStyle = {
  padding: '10px 20px',
  backgroundColor: '#007bff',
  color: 'white',
  border: 'none',
  cursor: 'pointer',
  margin: '10px'
};

export default SignIn;
