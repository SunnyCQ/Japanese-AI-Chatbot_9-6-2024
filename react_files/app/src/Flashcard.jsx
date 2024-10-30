// Flashcard.js
import React, { useState } from 'react';
import './css_files/Flashcard.css';

const Flashcard = ({ term, def, isFlipped, handleFlip, handleDelete }) => {
    return (
        <div className="flashcard" onClick={handleFlip}>
            <button className="delete-button" onClick={(e) => { e.stopPropagation(); handleDelete(); }}>X</button>
            <p>{isFlipped ? def : term}</p>
        </div>
    );
};

export default Flashcard;
