// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCdVxwAu3NKWeSIYu-NMQHlHi9B7Sn56FY",
  authDomain: "tomochat-4ddf8.firebaseapp.com",
  projectId: "tomochat-4ddf8",
  storageBucket: "tomochat-4ddf8.appspot.com",
  messagingSenderId: "732047006225",
  appId: "1:732047006225:web:556cf2d0cfebc794d96fb0",
  measurementId: "G-LMKKLPC0L3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);

export {auth, app, firestore}