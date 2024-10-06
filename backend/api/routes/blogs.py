from fastapi import APIRouter, Depends, HTTPException
from models import Blogs, Followers, Users
from sqlmodel import Session
from database import get_db
from api.schemas.blog import NewBlog, UpdateBlog
from datetime import datetime, timezone
import base64

router = APIRouter()


@router.get('/')
def get_all_blogs(db: Session = Depends(get_db)):
    """
    RETRIEVE ALL BLOGS
    """
    return db.query(Blogs).all()

@router.get('/{id}')
def get_blog_by_id(id: int, db: Session = Depends(get_db)):
    """
    RETRIEVE BLOG BY ID
    """
    blog = db.query(Blogs).filter(Blogs.id == id).first()
    if not blog:
        raise HTTPException(status_code=404, detail="Blog not found")
    return{
        "message": "Blog found",
        "blog": blog
    }

@router.get("/author/{username}")
def get_blogs_by_author_username(username: str, db: Session = Depends(get_db)):
    """
    RETRIEVE BLOGS BY AUTHOR USERNAME
    """
    blogs = db.query(Blogs).filter(Blogs.author_username == username).all()
    if not blogs:
        raise HTTPException(status_code=404, detail="Author have not pulished any blogs or invalid username")
    return blogs

@router.get("/following/{username}")
def get_blogs_by_user_username(username: str, db: Session = Depends(get_db)):
    """
    RETRIEVE BLOGS BY USER USERNAME, DISPLAY ONLY BLOGS OF THE FOLLOWING
    """
    user = db.query(Users).filter(Users.username == username).first()
    user_id = user.id
    print("USER ID:", user_id)
    # get the following list of the user_id
    following = db.query(Followers).filter(Followers.follower_id == user_id)
    # grab the followee_id of the following
    followee_ids = [f.followee_id for f in following]
    # using the id, grab the blogs
    if not followee_ids:
        return {"message": "The user is not following anyone."}

    # Now, fetch the blogs from the followees
    blogs = db.query(Blogs).filter(Blogs.author_id.in_(followee_ids)).all()

    if not blogs:
        return {"message": "No blogs found for the users being followed."}

    return blogs
    
@router.post('/')
def post_blog(blog: NewBlog ,db: Session = Depends(get_db)):
    blog_cover_base64 = None
    if blog.blog_cover:
        blog_cover_base64 = base64.b64encode(blog.blog_cover.read()).decode('utf-8')
    new_blog_record = Blogs(
        author_name = blog.author_name,
        author_username= blog.author_username,
        author_id=blog.author_id,
        title=blog.title,
        body=blog.body,
        created_date=datetime.now(timezone.utc),
        blog_cover=blog_cover_base64
    )
    
    db.add(new_blog_record)
    db.commit()
    db.refresh(new_blog_record)
    
    return{"message": "Blog added successfully"}

@router.put('/{id}')
def update_blog_by_id(id: int, update_blog: UpdateBlog, db: Session = Depends(get_db)):
    db_blog = db.query(Blogs).filter(Blogs.id == id).first()
    if not db_blog:
        raise HTTPException(status_code=404, detail="Blog not found")
    if update_blog.title:
        db_blog.title = update_blog.title
    if update_blog.body:
        db_blog.body = update_blog.body
    if update_blog.blog_cover:
        db_blog.blog_cover = base64.b64encode(update_blog.blog_cover.read()).decode('utf-8')
    db.commit()
    db.refresh(db_blog)
    return db_blog

@router.delete('/{id}')
def delete_blog_by_id(id: int, db: Session = Depends(get_db)):
    blog = db.query(Blogs).filter(Blogs.id == id).first()
    if not blog:
        raise HTTPException(status_code=404, detail="Blog not found")
    db.delete(blog)
    db.commit()
    return{
        "message":"Blog deleted",
        "deleted_blog": blog
    }