from fastapi import FastAPI, Depends
from sqlmodel import Session
from database import create_db_and_tables, engine, get_db
from models import Blogs
from crud import get_blog_posts, get_all_followers
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


@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.get("/blogs/", response_model=list[Blogs])
def read_blog_posts(db: Session = Depends(get_db)):
    return get_blog_posts(db)
    

@app.get('/followers/{user_id}')
async def get_followers(user_id: int, db: Session = Depends(get_db)):
    users = get_all_followers(db, user_id)
    print(users)
    return users

app.include_router(api_router)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)
