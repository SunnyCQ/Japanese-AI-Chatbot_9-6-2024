import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import {doc, setDoc, getFirestore, getDoc, onSnapshot, collection, addDoc, orderBy, query, serverTimestamp} from 'firebase/firestore';
import { auth, db } from '../firebase';

const handleSubmit = async (message) => {
    // Send user input to the Python backend
    const res = await fetch('http://127.0.0.1:5000/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    });

    const data = await res.json();
    console.log('handleSubmit: ' + data.reply)
    return data.reply;
  };

const handleMessage = async (messages, message, setMessages, setTyping) => {

    //Send user data to firebase
    const msgCollection = collection(db, 'messages');
    const userRef = await addDoc(msgCollection, {
      uid: auth.currentUser.uid,
      sender: "user",
      msg: message,
      timestamp: serverTimestamp()
    })

    setTyping(true);
    const response = await handleSubmit(message);

    //Send bot data to firebase
    const botRef= await addDoc(msgCollection, {
      uid: "bot",
      sender: "bot",
      msg: response,
      timestamp: serverTimestamp()
    })
  
    setTyping(false);
    return;
  }


const handleGoogleLogin = async () => {
  const provider = new GoogleAuthProvider()

  try {
    const result = await signInWithPopup(auth, provider)
  } catch (error) {
    console.log(error)
  }
}

export {handleSubmit, handleMessage, handleGoogleLogin};