import atexit
from funcs_flask import ChatBot, Terminal, Flashcard
from flask import Flask, request, jsonify
from flask_cors import CORS
from database import Database


# app = Flask(__name__) #create the webpage app
# CORS(app)

"""DATABASE SECTION! Comment out if not using
connection_string = (
    "DRIVER={ODBC Driver 17 for SQL Server};"
    "SERVER=SUNNY_QI_PC\\SQLEXPRESS;"  # Replace with your server name or IP. The double slash is equal to one written slash.
    "DATABASE=JBot;"  # Replace with your database name
    "Trusted_Connection=yes;" #Windows Authentication
)

database = Database(connection_string)

#Automatically runs when flask server shuts down
def shutdown_server(exception=None):
    print(database.close_connection())
    print("Server is shutting down...")

atexit.register(shutdown_server)
"""

start_conv_history = [
    {"role": "system", "content": 
     "Your name is Omo, and you are a Japanese conversation partner and teacher who teaches in English. Your goal is to help users learn and discuss Japanese language and culture."
     "1. When the user speaks in English about Japanese topics, respond in English as a helpful teacher of the Japanese language."
     "2. If the user says something in English unrelated to Japanese, remind them USING ENGLISH to ask only Japanese-related questions. Do not provide answers to unrelated questions."
     "3. When and only when the user speaks in Japanese, respond in Japanese as a conversation partner."
     }
]

chatbot = ChatBot("gpt-3.5-turbo", 150, 0.5, start_conv_history)

flashcards = []

def main():
    print("Flashcard Generation Running!.")
 
    while True: #inf loop for continuous interaction.
        user_response = input("\nType /f to create flashcard or /s to see flashcards: ")
        parts = user_response.split(' ', 2)
        command = parts[0].lower() #lower to make it consistent
        term = parts[1] if len(parts) > 1 else None
        definition = parts[2] if len(parts) > 2 else None
        if(command == "/f" and len(parts) > 2):
            flashcards.append(Flashcard(term, definition))
        elif(command == "/s" and len(parts) == 1):
            for f in flashcards:
                f.show_back()
        elif(command == "/e"):
            break
        else:
            print("\nInvalid command.")

if __name__ == "__main__":
    main()

# @app.route('/chat', methods=['POST'])
# def chatbot_page():
#     user_input = request.json.get('message')
#     if user_input[0] == '/':
#         return jsonify({'reply': terminal.process_command(user_input)})
#     else:
#         #database.get_translogs()  COMMENT OUT IF NOT USING DATABASE
#         bot_response = chatbot.generate_response(user_input) # Generate the chatbot's response
#         return jsonify({'reply': (f"{bot_response}")}) # Display the bot's response
    
# app.run() #put this at the end. Website starts
#format: http://127.0.0.1:5000/chat?user_input={input_here}