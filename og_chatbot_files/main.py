from funcs import ChatBot, Terminal

from flask import Flask, request

app = Flask(__name__)

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

def main():
    print("Chatbot is running! Type 'exit' to stop the conversation.")
 
    while True: #inf loop for continuous interaction.
        user_input = input("You: ") # Get user input

        if user_input.lower() == "/exit" or user_input.lower() == "/e": # Exit the loop if the user types '/exit'
            print("さよなら!")
            break
        elif user_input[0] == '/':
            terminal.process_command(user_input)
        else:
            bot_response = chatbot.generate_response(user_input) # Generate the chatbot's response
            print(f"Bot: {bot_response}") # Display the bot's response

if __name__ == "__main__":
    main()
    

# @app.route('/test', methods=['GET'])
# def rand_func():
#     user_input = request.args.get('user_input')

#     if user_input[0] == '/':
#         terminal.process_command(user_input)
#     else:
#         bot_response = chatbot.generate_response(user_input) # Generate the chatbot's response
#         return (f"Bot: {bot_response}") # Display the bot's response
    
# @app.route('/test2', methods=['GET'])
# def test2():
#     return "idiot"

# app.run() #put this at the end. Website starts