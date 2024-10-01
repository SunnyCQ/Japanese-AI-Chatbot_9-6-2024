// App.js
import React, { useEffect, useState} from 'react';
import './css_files/App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, app } from '../firebase'; // Import your firebase auth instance

import Home from './Home';
import TomoChat from './TomoChat';
import Flashcards from './Flashcards';
import About from  './About';
import NavBar from './NavBar'; // Navigation bar component
import Login from './Login.jsx';

function App() {
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      // Listen for authentication state changes
      console.log("hello")
      const unsubscribe = onAuthStateChanged(auth, (user) => {
          if (user) {
              setIsLoggedIn(true); // User is signed in
          } else {
              setIsLoggedIn(false); // User is signed out
          }
          setLoading(false); // Stop loading after determining auth state
      });

      // Cleanup subscription on unmount
      return () => unsubscribe();
  }, []);

  return (
    <>
      {isLoggedIn ?(
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
      ):(
        <Login />
      )}
    </>
  );
}


{/* <>
      {isLoggedIn ?(
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
      ):(
        <Login/>
      )}
    </> */}

// function App() {
//   return (
        // <Router>
        //   <div>
        //     <NavBar />
        //     <Routes>
        //       <Route path="/" element={<Home />} />
        //       <Route path="/TomoChat" element={<TomoChat />} />
        //       <Route path="/Flashcards" element={<Flashcards />} />
        //       <Route path="/About" element={<About />} />
        //     </Routes>
        //   </div>
        // </Router>
//   );
// }
export default App;