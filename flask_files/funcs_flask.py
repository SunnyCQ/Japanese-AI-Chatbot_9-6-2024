import os, openai, re
from dotenv import load_dotenv, find_dotenv #pip install python-dotenv

html_content = f"""
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Preserve Spaces</title>
    </head>
    <body>
        <pre>{
            "/help OR /h:             | list all functions\n"
            "/exit OR /e:             | End conversation with chatbot\n"
            "/jtranslate OR /jt \{msg\} | translates English into Japanese\n"
            "/etranslate OR /et \{msg\} | translates Japanese into English\n"
            "/add OR /a \{word\}        | adds word as a flash card\n"
            "/del OR /d \{word\}        | delete the flashcard for {word}. Prints an error if word doesn't exist.\n"
            "/flist:                  | list all the flashcards\n"
        }</pre>
    </body>
    </html>
    """

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
            return (f"Translation: {bot_response}") 
        else:
            return ("Please type in English for this command.")

    def jap_to_eng(self, user_input):
        if(is_japanese(user_input)):
            bot_response = self.generate_response("Print English translation of input: \'" + user_input + "\'") # Generate the chatbot's response
            return (f"Translation: {bot_response}") 
        else:
            return ("Please type in Japanese for this command.")
    
class Terminal: 
    def __init__(self, chatbot):
        self.chatbot = chatbot

    def process_command(self, input):
        parts = input.split(' ', 1)
        command = parts[0].lower() #lower to make it consistent
        user_input = parts[1] if len(parts) > 1 else None
        if(command == "/help" or command == "/h"):
            return (html_content)
        elif(command == "/jtranslate" or command == "/jt"):
            return self.chatbot.eng_to_jap(user_input)
        elif(command == "/etranslate" or command == "/et"):
            return self.chatbot.jap_to_eng(user_input)
        elif(command == "/tprev" or command == "/tp"):
            return ("tp")
        elif(command == "/add" or command == "/a"):
            return ("ADD!")
        elif(command == "/del" or command == "/d"):
            return ("DEL!")
        elif(command == "/flist" or command == "/f"):
            return ("list!")
        else:
            return ("Invalid Command.")

class Flashcard:
    def __init__(self, term, definition):
        self.term = term
        self.definition = definition
    
    def show_front(self):
        print('Term: ' + self.term)
    
    def show_back(self):
        print('Term: ' + self.term + ' Definition: ' + self.definition)

#Old Flashcard
"""
class Flashcard:
    def __init__(self, term = None, definition = None): #add furigana and ex sentence later
        if(term is None and definition is None):
            print("You must provide at least a term or a definition")
            return #no flashcard is created
        elif(definition is None):
            if(self.generate_def(self, term)):
                self.term = term
            else:
                return False#generating definition failed, no card created
        elif(term is None):
            if(self.generate_term(self, definition)):
                self.definition = definition
            else: 
                return False
        else:
            self.term = term #japanese
            self.hiragana = definition #english
        return True

    def edit_term(self, new_term):
        if(not is_japanese(new_term)):
            return False #unsuccessful translation
        self.term = new_term
        return True

    def edit_def(self, new_definition):
        if(not is_english(new_definition)):
            return False
        self.definition = new_definition
        return True
    
    def generate_term(self, chatbot, definition): #should check if its in english
        if(not is_english(definition)):
            return False
        return self.edit_term(chatbot.jap_to_eng(definition))
    
    def generate_def(self, chatbot, term): #should check if its in japanese
        if(not is_japanese(term)):
            return False #unsuccessful translation
        return self.edit_def(chatbot.jap_to_eng(term))
    
    def show_front(self):
        print('Term: ' + self.term)
    
    def show_back(self):
        print('Term: ' + self.term + ' Definition: ' + self.definition)
"""