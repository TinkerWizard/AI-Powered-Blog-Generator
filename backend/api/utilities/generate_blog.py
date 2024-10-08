import google.generativeai as genai
import os
from dotenv import load_dotenv
load_dotenv()

genai.configure(api_key=os.environ['GEMINI_API_KEY'])
model = genai.GenerativeModel(model_name="gemini-1.5-flash")


def generate_blog_using_genai(template):
    response = model.generate_content(template)
    # print(response.text)
    content = response.text
    print(content)
    title=""
    body=""
    if "Title:" in content and "Body:" in content:
        # Extract title and body
        title_start = content.index("Title:") + len("Title:")
        body_start = content.index("Body:") + len("Body:")

        title = content[title_start:body_start].strip()
        body = content[body_start:].strip()
    return {
        "title": title,
        "body": body
    }