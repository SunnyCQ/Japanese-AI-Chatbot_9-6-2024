import { useState } from 'react'

import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import './css_files/TomoChat.css'; 
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator} from "@chatscope/chat-ui-kit-react";
import {handleMessage} from './async_funcs';

function TomoChat() {
  const [typing, setTyping] = useState(false);
  //initializes variable messages and creates setMessages function which we use to change messages
  const [messages, setMessages] = useState([
    {
      //this is the initial state of 'messages'
      message: "Hello, I am OmO!",
      sender: "OmO",
      direction: "incoming"
    }
  ])

  //Function declaration
  const manageMessage = async (message) => {
    handleMessage(messages, message, setMessages, setTyping);
  }
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
            <span>/help OR /h:</span> <span className="function-desc">| list all functions</span><br />
            <span>/exit OR /e:</span> <span className="function-desc">| End conversation with chatbot</span><br />
            <span>/jtranslate OR /jt &#123;message&#125;</span> <span className="function-desc">| translates English into Japanese</span><br />
            <span>/etranslate OR /et &#123;message&#125;</span> <span className="function-desc">| translates Japanese into English</span><br />
            <span>/add OR /a &#123;word&#125;</span> <span className="function-desc">| adds word as a flash card</span><br />
            <span>/del OR /d &#123;word&#125;</span> <span className="function-desc">| delete the flashcard for &#123;word&#125;. Prints an error if word doesn't exist</span><br />
            <span>/flist:</span> <span className="function-desc">| list all the flashcards</span><br />
          </p>
        </div>
      </div>
    </div>
  )
}

export default TomoChat
