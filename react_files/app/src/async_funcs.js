import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import {doc, setDoc, getFirestore, getDoc, onSnapshot} from 'firebase/firestore';
import { auth } from '../firebase';

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
    const newMessage = {
      message: message,
      sender: "user",
      direction: "outgoing" //show on the right
    }

    let newMessages = [...messages, newMessage]; //concacanate all old messages with new one
    setMessages(newMessages);
    setTyping(true);

    const response = await handleSubmit(message);
    const newResponse = {
      message: response,
      sender: "JBot",
      direction: "incoming"
    }
    console.log('newResponse_msg: ' + newResponse.message);
  
    newMessages = [...newMessages, newResponse]; //concacanate all old messages with new one
    //update messages
    
    console.log('newMessages: ' + newMessages);
    setMessages(newMessages)
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