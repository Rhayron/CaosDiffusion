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
def chatgpt(api_key, temperature=0.8, frequency_penalty=0.2, presence_penalty=0):
    openai.api_key = api_key
    
    messages_input = "hello"

    # Make a call to the OpenAI API
    completion = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        temperature=temperature,
        frequency_penalty=frequency_penalty,
        presence_penalty=presence_penalty,
        messages=messages_input)

    # Return ChatGPTs response
    return print(completion)

# Start with an empty conversation
conversation = []