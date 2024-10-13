from sqlalchemy.orm import Session
from database import get_db
from fastapi import Depends
from models import Blogs
def get_number_of_blogs_posted_by_user(username: str, db: Session = Depends(get_db)):
    blogs = db.query(Blogs).filter(Blogs.author_username == username).all()
    count = 0
    if not blogs:
        return "No blogs have been posted by the user"
    for _ in blogs:
        count=count+1
    return count