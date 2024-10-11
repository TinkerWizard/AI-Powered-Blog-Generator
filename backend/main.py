from fastapi import FastAPI, Depends
from sqlmodel import Session
from database import create_db_and_tables, engine, get_db
from models import Blogs
from fastapi.middleware.cors import CORSMiddleware
from api.main import api_router
from dotenv import load_dotenv
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Adjust to your frontend URL
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods (GET, POST, etc.)
    allow_headers=["*"],  # Allows all headers
)


create_db_and_tables()

app.include_router(api_router, prefix='/api')

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
