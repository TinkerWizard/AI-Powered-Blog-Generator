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
