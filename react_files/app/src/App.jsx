// App.js
import React from 'react';
import './css_files/App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './Home';
import TomoChat from './TomoChat';
import Flashcards from './Flashcards';
import About from  './About';
import NavBar from './NavBar'; // Navigation bar component

function App() {
  return (
    <Router>
      <div>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/TomoChat" element={<TomoChat />} />
          <Route path="/Flashcards" element={<Flashcards />} />
          <Route path="/About" element={<About />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;