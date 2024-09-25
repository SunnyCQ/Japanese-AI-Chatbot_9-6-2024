import React from 'react';
import { Link } from 'react-router-dom';
import './css_files/Home.css'

function Home() {
  return (
    <div className="Home">
        <h1 id="home_header">Welcome to the Home Page of 
            <Link className="nav-link" to="/TomoChat"> <u>TomoChat!</u></Link>
        </h1>
    </div>
);
}

export default Home;