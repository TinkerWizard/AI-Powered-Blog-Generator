from sqlmodel import SQLModel, create_engine

DATABASE_URL = "postgresql://postgres:april1@localhost/GenAI Blogs"

engine = create_engine(DATABASE_URL)

def create_db_and_tables():
   SQLModel.metadata.create_all(engine) 
   
   
