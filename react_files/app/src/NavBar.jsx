// NavBar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './css_files/NavBar.css';  // Import a CSS file for styling

function NavBar() {
  return (
    <nav className="navbar">
      <Link className="nav-link" to="/">Home</Link>
      <Link className="nav-link" to="/TomoChat">TomoChat</Link>
      <Link className="nav-link" to="/Flashcards">Flashcards</Link>
      <Link className="nav-link" to="/About">About</Link>
    </nav>
  );
}

export default NavBar;