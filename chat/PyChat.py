import openai
from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv()

# Get the API key from environment variables
openai.api_key = os.getenv("OPENAI_API_KEY")

def chat_with_gpt():
    print("ChatGPT: Type 'exit' to end the chat.")
    
    while True:
        user_input = input("You: ")
        if user_input.lower() == "exit":
            print("ChatGPT: Goodbye!")
            break

        try:
            response = openai.completions.create(
                model="gpt-3.5-turbo", 
                prompt=user_input,
                max_tokens=150
            )
            print("ChatGPT:", response['choices'][0]['text'].strip())
        except Exception as e:
            print("Error:", e)

# Run the chat function
chat_with_gpt()
