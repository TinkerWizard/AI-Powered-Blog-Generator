from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from api.utilities.blogs import get_number_of_blogs_posted_by_user
from api.utilities.followers import get_number_of_followers, is_following
from models import Users
from database import get_db
from api.schemas.user import UserUpdate
from api.security.auth import get_current_user

router = APIRouter()
user_not_found_detail = "User not found"

@router.get("/")
def get_users(db: Session = Depends(get_db)):
    """
    RETRIEVE ALL USERS
    """
    return db.query(Users).all()

@router.get("/{username}")
def get_user_by_username(username: str, current_user: Users = Depends(get_current_user), db: Session = Depends(get_db)):
    """
    RETRIEVE USER BY USERNAME, ONLY ALLOW IF CURRENT USER IS AUTHENTICATED
    """
    user = db.query(Users).filter(Users.username == username).first()
    if user is None:
        raise HTTPException(status_code=404, detail=user_not_found_detail)
    # get the no.of blogs posted and no. of followers
    blog_count = get_number_of_blogs_posted_by_user(username, db)
    number_of_followers = get_number_of_followers(username, db)
    is_following_result = is_following(username, current_user.username, db)
    print("Current User:", current_user.username)
    print("Username:", username)
    print("Following?",is_following_result)
    return {"name": user.name, "username": user.username, "profile": user.profile_pic, "created": user.created_at, "blog_count": blog_count, "follower_count": number_of_followers, "is_following": is_following_result}

@router.put("/{username}")
def update_user_by_username(
    username: str, user_update: UserUpdate, current_user: Users = Depends(get_current_user), db: Session = Depends(get_db)
):
    """
    UPDATE USER BY USERNAME, ONLY ALLOW IF CURRENT USER IS AUTHENTICATED
    """
    db_user = db.query(Users).filter(Users.username == username).first()
    if not db_user:
        raise HTTPException(status_code=404, detail=user_not_found_detail)
    
    if user_update.username:
        existing_user_with_username = db.query(Users).filter(Users.username == user_update.username).first()
        if existing_user_with_username and existing_user_with_username.username != username:
            raise HTTPException(status_code=400, detail="Username already taken")
        db_user.username = user_update.username

    if user_update.email:
        existing_user_with_email = db.query(Users).filter(Users.email == user_update.email).first()
        if existing_user_with_email and existing_user_with_email.email != db_user.email:
            raise HTTPException(status_code=400, detail="Email already taken")
        db_user.email = user_update.email

    db_user.name = user_update.name or db_user.name
    db.commit()
    db.refresh(db_user)
    return db_user

@router.delete("/{username}")
def delete_user_by_username(username: str, db: Session = Depends(get_db)):
    """
    DELETE USER BY USERNAME, ONLY ALLOW IF CURRENT USER IS AUTHENTICATED
    """
    user = db.query(Users).filter(Users.username == username).first()
    if not user:
        raise HTTPException(status_code=404, detail=user_not_found_detail)
    
    db.delete(user)
    db.commit()
    return {
        "message": "User deleted successfully",
        "user": user,
    }
