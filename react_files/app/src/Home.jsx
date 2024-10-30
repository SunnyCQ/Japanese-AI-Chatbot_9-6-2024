import React from 'react';
import { Link } from 'react-router-dom';
import './css_files/Home.css'

function Home() {
  return (
    <div className="Home">
        <h1 id="home_header">Welcome to the Home Page of 
            <Link className="nav-link" to="/TomoChat"> <u>TomoChat!</u></Link>
        </h1>
        <h3 id="description">
            This is a AI-assissted Japanese learning tool. The star of our website is Tomo, who will act
            as your Japanese conversation partner and teacher. You can click on the links above to meet Tomo immediately!

            We also have a flashcard functionality that is integrated with Tomo. You can manually add flashcards on the flashcards page, 
            or you could ask tomo to autogenerate flashcards by simply following the commands under the chat console. Hope you have fun!
        </h3>
    </div>
);
}

export default Home;