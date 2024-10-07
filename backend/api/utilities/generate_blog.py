import google.generativeai as genai
import os
from dotenv import load_dotenv
load_dotenv()

genai.configure(api_key=os.environ['GEMINI_API_KEY'])
model = genai.GenerativeModel(model_name="gemini-1.5-flash")


def generate_blog_using_genai(template):
    response = model.generate_content(template)
    print(response.text)
    return response.text

# topic = input("Enter a topic: ")
# number_of_words = 1000
# # Passages, bullet points, numbered points
# type = "bullet points"
# template = f"""Use the following pieces of context to build content at the end. 
# If you cannot produce a content, just say that you can't produce a content. 
# Keep the content within the number of characters provided. Always say something relative and positive at the end of the content. 
# Topic: {topic}
# Number of words: {number_of_words}
# Type: {type}
# Blog:"""

# generate_blog(template)