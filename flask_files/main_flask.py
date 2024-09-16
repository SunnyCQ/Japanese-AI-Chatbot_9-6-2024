from funcs_flask import ChatBot, Terminal
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__) #create the webpage app
CORS(app)

start_conv_history = [
    {"role": "system", "content": 
     "You are a Japanese conversation partner and teacher. Your goal is to help users learn and discuss Japanese language and culture."
     "1. When the user speaks in English about Japanese topics, respond in English as a helpful teacher of the Japanese language."
     "2. If the user says something in English unrelated to Japanese, remind them USING ENGLISH to ask only Japanese-related questions. Do not provide answers to unrelated questions."
     "3. When and only when the user speaks in Japanese, respond in Japanese as a conversation partner."
     }
]

chatbot = ChatBot("gpt-3.5-turbo", 150, 0.5, start_conv_history)
terminal = Terminal(chatbot)

#Main loop page
@app.route('/chat', methods=['POST'])
def chatbot_page():
    user_input = request.json.get('message')
    if user_input[0] == '/':
        return jsonify({'reply': terminal.process_command(user_input)})
    else:
        bot_response = chatbot.generate_response(user_input) # Generate the chatbot's response
        return jsonify({'reply': (f"{bot_response}")}) # Display the bot's response
    
app.run() #put this at the end. Website starts
#format: http://127.0.0.1:5000/chat?user_input={input_here}
