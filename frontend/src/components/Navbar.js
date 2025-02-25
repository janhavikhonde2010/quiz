import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const navStyle = {
    backgroundColor: '#007bff',
    padding: '15px',
    textAlign: 'center',
    position: 'sticky',  // This makes the navbar sticky
    top: '0',            // Makes sure it sticks to the top of the screen
    zIndex: '1000',      // Ensures it stays above other content
  };

  const ulStyle = {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
  };

  const liStyle = {
    display: 'inline',
  };

  const linkStyle = {
    textDecoration: 'none',
    color: 'white',
    fontSize: '18px',
    fontWeight: 'bold',
    padding: '10px 15px',
    borderRadius: '5px',
    transition: 'background 0.3s',
  };

  const linkHover = {
    backgroundColor: '#0056b3',
  };

  return (
    <nav style={navStyle}>
      <ul style={ulStyle}>
        <li style={liStyle}>
          <Link to="/" style={{ ...linkStyle }}>Home</Link>
        </li>
        <li style={liStyle}>
          <Link to="/add-question" style={{ ...linkStyle }}>Add Quiz</Link>
        </li>
        <li style={liStyle}>
          <Link to="/signin" style={{ ...linkStyle }}>Sign In</Link>
        </li>
        <li style={liStyle}>
          <Link to="/results" style={{ ...linkStyle }}>See Results</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
