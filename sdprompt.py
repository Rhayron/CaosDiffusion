# Import the necessary libraries
import openai   # for the OpenAI API
import os       # to interact with the operating system
import datetime # to work with dates and times
import base64   # to encode and decode binary data

# This function opens a file and reads its contents
def open_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as infile:
        return infile.read()
    
# Read API keys from text files
api_key = open_file('openaiapikey.txt')  # OpenAI API key

# This function calls the OpenAI API's ChatCompletion endpoint to carry out a conversation
def chatgpt(api_key, conversation, chatbot, user_input, temperature=0.8, frequency_penalty=0.2, presence_penalty=0):
    openai.api_key = api_key

    # Add user input to the conversation history
    conversation.append({"role": "user","content": user_input})

    # Add a system message to the conversation
    messages_input = conversation.copy()
    prompt = [{"role": "system", "content": chatbot}]
    messages_input.insert(0, prompt[0])

    # Make a call to the OpenAI API
    completion = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        temperature=temperature,
        frequency_penalty=frequency_penalty,
        presence_penalty=presence_penalty,
        messages=messages_input)

    # Extract ChatGPTs response
    chat_response = completion['choices'][0]['message']['content']

    # Add ChatGPTs response to the conversation
    conversation.append({"role": "assistant", "content": chat_response})

    # Return ChatGPTs response
    return chat_response