import React, { useState, useEffect } from 'react'

import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import './css_files/TomoChat.css'; 
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator} from "@chatscope/chat-ui-kit-react";
import {handleMessage} from './async_funcs';

import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from 'firebase/auth'
import {doc, setDoc, getFirestore, getDoc, onSnapshot, collection, addDoc, orderBy, query, serverTimestamp, limitToLast} from 'firebase/firestore';
import { auth, db } from '../firebase'
import { useLocation } from 'react-router-dom';


function TomoChat() {
  const location = useLocation();
  const [typing, setTyping] = useState(false);
  //initializes variable messages and creates setMessages function which we use to change messages
  const [messages, setMessages] = useState([])

  //Function declaration
  const manageMessage = async (message) => {
    handleMessage(messages, message, setMessages, setTyping);
  }

  useEffect(() => {
    // Create a query to fetch the last 25 messages
    const messagesQuery = query(
        collection(db, 'messages'),
        orderBy('timestamp', 'asc'), // Order by timestamp in ascending order
        limitToLast(25) // Limit to the last 25 messages
    );

    // Listen for real-time updates
    const unsubscribe = onSnapshot(messagesQuery, (querySnapshot) => {
        const fetchedMessages = [];
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            // Format the message according to your structure
            fetchedMessages.push({
                message: data.msg, // Assuming your message field is 'msg'
                sender: data.uid, // Assuming 'uid' indicates the sender
                direction: data.uid === "bot" ? "incoming" : "outgoing" // Adjust based on your logic
            });
        });
        setMessages(fetchedMessages); // Update the state with fetched messages
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [location]); // Empty dependency array to run only on mount


  // handleSend
  return (
    <div className = "TomoChat">
      <h1 id="TomoChat_name"><u>TomoChat</u></h1>
      <div style = {{ position: "relative", height: "800px", width: "700px"}}>
        <MainContainer>
          <ChatContainer>
            <MessageList typingIndicator={typing ? <TypingIndicator content="ChatBot is typing" /> : null}>
              {messages.map((message, i) => {
                return <Message key={i} model={message} />
              })}
            </MessageList>
            <MessageInput placeholder='Type message here' onSend={manageMessage}/> 
          </ChatContainer>
        </MainContainer>
      </div>
      <div className="help_page">
        <h2 id="help-header"><u>Help</u></h2>
        <div className="help-text">
          <p>
            <span>/jtranslate OR /jt &#123;message&#125;</span> <span className="function-desc">| translates English into Japanese</span><br />
            <span>/etranslate OR /et &#123;message&#125;</span> <span className="function-desc">| translates Japanese into English</span><br />
            <span>/add_en OR /aen &#123;English definition&#125;</span> <span className="function-desc">| autogenerates flashcard with english definition only</span><br />
            <span>/add_jp OR /ajp &#123;Japanese term&#125;</span> <span className="function-desc">| autogenerates flashcard with japanese term only</span><br />
          </p>
        </div>
      </div>
    </div>
  )
}

export default TomoChat
