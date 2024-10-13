from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import JSONResponse
from models import Blogs, Followers, Users
from sqlalchemy.orm import Session
from database import get_db
from api.schemas.blog import NewBlog, UpdateBlog, GenerateBlog
from datetime import datetime, timezone
import base64
from api.utilities.generate_blog import generate_blog_using_genai
from api.security.auth import get_current_user
from api.utilities.users import get_author_id_using_author_username, get_author_name_using_author_username

router = APIRouter()


@router.get('/')
def get_all_blogs(db: Session = Depends(get_db)):
    """.gr
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
def get_blogs_by_author_username(username: str, current_user: Users = Depends(get_current_user), db: Session = Depends(get_db)):
    """
    RETRIEVE BLOGS BY AUTHOR USERNAME
    """
    try:
        blogs = db.query(Blogs).filter(Blogs.author_username == username).all()
        if not blogs:
            raise HTTPException(status_code=404, detail="Author have not pulished any blogs or invalid username")
        return blogs
    except Exception as e:
        print(f"Error: {e}")
        raise HTTPException(status_code=500, detail="An internal server error occurred")

@router.get("/following/{username}")    
def get_blogs_by_user_username(username: str, current_user: Users = Depends(get_current_user), db: Session = Depends(get_db)):
    """
    RETRIEVE BLOGS BY USER USERNAME, DISPLAY ONLY BLOGS OF THE FOLLOWING
    """
    user = db.query(Users).filter(Users.username == username).first()
    user_id = user.id
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
async def post_blog(blog: NewBlog, current_user: Users = Depends(get_current_user), db: Session = Depends(get_db)):
    blog_cover_base64 = None
    if blog.blog_cover:
        blog_cover_base64 = base64.b64encode(blog.blog_cover.read()).decode('utf-8')
    new_blog_record = Blogs(
        author_name = get_author_name_using_author_username(blog.author_username, db),
        author_username= blog.author_username,
        title=blog.title,
        body=blog.body,
        created_date=datetime.now(timezone.utc),
        blog_cover=blog_cover_base64,
        author_id=get_author_id_using_author_username(blog.author_username, db)
    )
    
    db.add(new_blog_record)
    db.commit()
    db.refresh(new_blog_record)
    
    return JSONResponse(
        status_code=200,
        content={"message": "Blog added successfully"}
    )

@router.put('/{id}')
def update_blog_by_id(id: int, update_blog: UpdateBlog, current_user: Users = Depends(get_current_user), db: Session = Depends(get_db)):
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
def delete_blog_by_id(id: int, current_user: Users = Depends(get_current_user), db: Session = Depends(get_db)):
    blog = db.query(Blogs).filter(Blogs.id == id).first()
    if not blog:
        raise HTTPException(status_code=404, detail="Blog not found")
    db.delete(blog)
    db.commit()
    return{
        "message":"Blog deleted",
        "deleted_blog": blog
    }
    
@router.post('/generate')
def generate_blog(generate_blog: GenerateBlog, current_user: Users = Depends(get_current_user)):
    topic = generate_blog.concept
    number_of_words = generate_blog.number_of_words
    # Passages, bullet points, numbered points
    type_of_response = generate_blog.type_of_response
    template = f"""Use the following pieces of context to build content at the end. 
    If you cannot produce a content, just say that you can't produce a content. 
    Keep the content within the number of characters provided. Always say something relative and positive at the end of the content. 
    Always provide a title and then provide the body in the format below:
    "Title: Some Title\nBody: This is the body of the content..."
    Topic: {topic}
    Number of words: {number_of_words}
    Type: {type_of_response}
    Content: Blog
    """
    content = generate_blog_using_genai(template) 
    return JSONResponse(
        status_code=200,
        content={"message": "Content Generated", "title": content['title'], "body": content['body']}
    )