import { useState } from 'react'
import './App.css'
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator} from "@chatscope/chat-ui-kit-react";
import {handleMessage} from './async_funcs';

function App() {
  const [typing, setTyping] = useState(false);
  //initializes variable messages and creates setMessages function which we use to change messages
  const [messages, setMessages] = useState([
    {
      //this is the initial state of 'messages'
      message: "Hello, I am JBot!",
      sender: "JBot",
      direction: "incoming"
    }
  ])

  //Function declaration
  const manageMessage = async (message) => {
    handleMessage(messages, message, setMessages, setTyping);
  }
  // handleSend
  return (
    <div className = "App">
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
    </div>
  )
}

export default App
