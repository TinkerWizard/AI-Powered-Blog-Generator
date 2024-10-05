from dotenv import load_dotenv
from sqlmodel import SQLModel, create_engine, Session
import os
load_dotenv()

DATABASE_URL = f"postgresql://{os.getenv('DATABASE_USERNAME')}:{os.getenv('DATABASE_PASSWORD')}@localhost/GenAI Blogs"

engine = create_engine(DATABASE_URL)

def create_db_and_tables():
   SQLModel.metadata.create_all(engine) 
   
   

def get_db():
    with Session(engine) as session:
        yield session