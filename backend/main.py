from fastapi import FastAPI, Depends
from sqlmodel import Session
from database import create_db_and_tables, engine
from models import BlogPost
from crud import get_blog_posts


app = FastAPI()


create_db_and_tables()

def get_db():
    with Session(engine) as session:
        yield session
# connect database
# SQL_MODEL

@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.get("/blogposts/", response_model=list[BlogPost])
def read_blog_posts(db: Session = Depends(get_db)):
    blog_posts = db.query(BlogPost).all()
    print("Retrieved blog posts:", blog_posts)  # Print the retrieved posts
    return blog_posts


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)
