// App.js
import React, { useEffect, useState} from 'react';
import './css_files/App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase'; // Import your firebase auth instance

import Home from './Home';
import TomoChat from './TomoChat';
import Flashcards from './Flashcards';
import About from  './About';
import NavBar from './NavBar'; // Navigation bar component
import Login from './Login.jsx';

function App() {
  
  const [user, setUser] = useState(null)
  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
      // Listen for authentication state changes
      const unsubscribe = onAuthStateChanged(auth, (user) => {
          if (user) {
              setUser(user); // User is signed in
          } else {
              setUser(null); // User is signed out
          }
      });

      // Cleanup subscription on unmount
      return () => unsubscribe();
  }, []);

  return (
    <>
      {user ?(
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