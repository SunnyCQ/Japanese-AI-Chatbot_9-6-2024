import React, { useState, useEffect } from 'react';
import Flashcard from './Flashcard';
import './css_files/Flashcard.css';
import './css_files/Flashcards.css';

import { collection, addDoc, getDocs, onSnapshot, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase'; // Import Firestore instance

const Flashcards = () => {
    const [flashcards, setFlashcards] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);
    const [language, setLanguage] = useState("Japanese"); // Track current language
    const [newCard, setNewCard] = useState({ term: "", def: "" }); // New card state

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, "flashcards"), (snapshot) => {
            const fetchedFlashcards = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setFlashcards(fetchedFlashcards);
        });
        
        // Cleanup on unmount
        return () => unsubscribe();
    }, []);


    const handleFlip = () => setIsFlipped(!isFlipped);

    const nextCard = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % flashcards.length);
        setIsFlipped(language === "Japanese");
    };

    const prevCard = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + flashcards.length) % flashcards.length);
        setIsFlipped(language === "Japanese");
    };

    const toggleLanguage = () => {
        setLanguage((prevLanguage) => (prevLanguage === "English" ? "Japanese" : "English"));
    };

    
    // Handle form input changes for the new flashcard
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewCard((prevCard) => ({ ...prevCard, [name]: value }));
    };

    const handleAddFlashcard = async (e) => {
        e.preventDefault();
        try {
            const docRef = await addDoc(collection(db, "flashcards"), newCard);
            setNewCard({ term: "", def: "" }); // Reset form
        } catch (error) {
            console.error("Error adding document: ", error);
        }
    };

    // Handle deleting a flashcard
    const handleDeleteFlashcard = async (id) => {
        try {
            await deleteDoc(doc(db, "flashcards", id));
            setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0)); // Adjust index if needed
        } catch (error) {
            console.error("Error deleting document: ", error);
        }
    };

    return (
        <div className="flashcard-list">
            {/* Only render Flashcard component if flashcards has items */}
            {flashcards.length > 0 && (
                <Flashcard 
                    term={flashcards[currentIndex].term} 
                    def={flashcards[currentIndex].def} 
                    isFlipped={isFlipped}
                    handleFlip={handleFlip}
                    handleDelete={() => handleDeleteFlashcard(flashcards[currentIndex].id)} // Pass delete handler
                />
            )}
            <div className="flashcard-buttons">
                <button onClick={prevCard}>Previous</button>
                <button onClick={nextCard}>Next</button>
            </div>
            <button
                onClick={toggleLanguage}
                className={`toggle-button ${language === "English" ? "en" : "jp"}`}
            >
                {language === "English" ? "Japanese" : "English"}
            </button>

            {/* Form to add a new flashcard */}
            <form onSubmit={handleAddFlashcard} className="flashcard-form">
                <h2>Add New Flashcard</h2>
                <input
                    type="text"
                    name="term"
                    value={newCard.term}
                    onChange={handleInputChange}
                    placeholder="Japanese Term"
                    required
                />
                <input
                    type="text"
                    name="def"
                    value={newCard.def}
                    onChange={handleInputChange}
                    placeholder="English Definition"
                    required
                />
                <button type="submit">Add Flashcard</button>
            </form>
        </div>
    );
};

export default Flashcards;