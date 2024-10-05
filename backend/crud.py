from sqlmodel import Session
from models import Blogs, Users, Followers

def create_blog_post(db: Session, blog: Blogs):
    db.add(blog)
    db.commit()
    db.refresh(blog)
    return blog

def get_blog_posts(db: Session):
    return db.query(Blogs).all()

def get_all_users(db: Session):
    return db.query(Users).all()

def get_all_followers(db: Session, user_id: int):
    return db.query(Followers).filter(Followers.followee_id == user_id).all()

def get_following_blogs():
    return None