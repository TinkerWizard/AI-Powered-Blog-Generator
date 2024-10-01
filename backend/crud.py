from sqlmodel import Session
from models import BlogPost

def create_blog_post(db: Session, blog_post: BlogPost):
    db.add(blog_post)
    db.commit()
    db.refresh(blog_post)
    return blog_post

def get_blog_posts(db: Session):
    return db.query(BlogPost).all()
