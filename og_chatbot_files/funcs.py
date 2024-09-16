import os, openai, re
from dotenv import load_dotenv, find_dotenv #pip install python-dotenv

def is_english(text):
    return bool(re.match(r'^[\x00-\x7F]+$', text))

def is_japanese(text):
    return bool(re.match(r'[\u3040-\u30FF\u4E00-\u9FFF]', text))

class ChatBot:
    def __init__(self, model, max_tokens, temperature, conv_history):
        _ = load_dotenv(find_dotenv())
        openai.api_key = os.environ.get('OPENAI_API_KEY') 
        self.model=model
        self.max_tokens=max_tokens
        self.temperature=temperature
        self.conv_history = conv_history

    def generate_response(self, user_input):
        self.conv_history.append({"role": "user", "content": user_input}) # Append the user's input to the conversation history
        
        response = openai.ChatCompletion.create( # Call OpenAI API with the updated conversation history
            model=self.model,
            messages=self.conv_history,
            max_tokens=150,
            temperature=self.temperature
        )
        # print(self.conv_history)
        assistant_reply = response['choices'][0]['message']['content'] # Get assistant's reply

        self.conv_history.append({"role": "assistant", "content": assistant_reply}) # Append the assistant's reply to the conversation history

        return assistant_reply + "\n"
    
    def eng_to_jap(self, user_input):
        if(is_english(user_input)):
            bot_response = self.generate_response("Print Japanese translation of input: \'" + user_input + "\'") # Generate the chatbot's response
            print(f"Translation: {bot_response}") 
        else:
            print("Please type in English for this command.")

    def jap_to_eng(self, user_input):
        if(is_japanese(user_input)):
            bot_response = self.generate_response("Print English translation of input: \'" + user_input + "\'") # Generate the chatbot's response
            print(f"Translation: {bot_response}") 
        else:
            print("Please type in Japanese for this command.")
    
class Terminal: 
    def __init__(self, chatbot):
        self.chatbot = chatbot

    def process_command(self, input):
        parts = input.split(' ', 1)
        command = parts[0].lower() #lower to make it consistent
        user_input = parts[1] if len(parts) > 1 else None
        if(command == "/help" or command == "/h"):
            print(
                "/help OR /h:             | list all functions\n"
                "/exit OR /e:             | End conversation with chatbot\n"
                "/jtranslate OR /jt {msg} | translates English into Japanese\n"
                "/etranslate OR /et {msg} | translates Japanese into English\n"
                "/add OR /a {word}        | adds word as a flash card\n"
                "/del OR /d {word}        | delete the flashcard for {word}. Prints an error if word doesn't exist.\n"
                "/flist:                  | list all the flashcards\n"
                )
        elif(command == "/jtranslate" or command == "/jt"):
            self.chatbot.eng_to_jap(user_input)
        elif(command == "/etranslate" or command == "/et"):
            self.chatbot.jap_to_eng(user_input)
        elif(command == "/tprev" or command == "/tp"):
            print("tp")
        elif(command == "/add" or command == "/a"):
            print("ADD!")
        elif(command == "/del" or command == "/d"):
            print("DEL!")
        elif(command == "/flist" or command == "/f"):
            print("list!")
        else:
            print("Invalid Command.")

        
