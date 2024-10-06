from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session
from models import Users, Blogs
from database import get_db
from api.schemas.user import UserUpdate
import base64
from datetime import datetime, timezone





router = APIRouter()
user_not_found_detail = "User not found"
@router.get("/")
def get_users(db: Session = Depends(get_db)):
    """
    RETRIEVE ALL USERS
    """
    return db.query(Users).all()


@router.get("/{username}")
def get_user_by_username(username: str, db: Session = Depends(get_db)):
    """
    RETRIEVE USER BY USERNAME
    """
    user = db.query(Users).filter(Users.username == username).first()
    if user is None:
        raise HTTPException(
            status_code=404, detail=user_not_found_detail
        )  # Handle user not found case
    return user


@router.put("/{username}")
def update_user_by_username(
    username: str, user_update: UserUpdate, db: Session = Depends(get_db)
):
    """
    UPDATE USER BY USERNAME
    """
    db_user = db.query(Users).filter(Users.username == username).first()

    if not db_user:
        raise HTTPException(status_code=404, detail=user_not_found_detail)
    if user_update.username:
        existing_user_with_username = (
            db.query(Users).filter(Users.username == user_update.username).first()
        )
        if (
            existing_user_with_username
            and existing_user_with_username.username != username
        ):
            raise HTTPException(status_code=400, detail="Username already taken")
        db_user.username = user_update.username

    if user_update.email:
        existing_user_with_email = db.query(Users).filter(Users.email == user_update.email).first()
        if(
            existing_user_with_email
            and existing_user_with_email.email != db_user.email
        ):
            raise HTTPException(status_code=400, detail="Email already taken")
        db_user.email = user_update.email
    if db_user.name:
        db_user.name = user_update.name
    if user_update.hashed_password:
        db_user.hashed_password = user_update.hashed_password
    db_user.profile_pic = None
    if user_update.profile_pic:
        # Assume new_user.profile_pic is a file-like object (e.g., from a form)
        db_user.profile_pic = base64.b64encode(user_update.profile_pic.read()).decode('utf-8')
    if user_update.profile_pic:
        db_user.profile_pic = user_update.profile_pic
    db_user.updated_at = datetime.now(timezone.utc)
    db.commit()
    db.refresh(db_user)
    return db_user


@router.delete("/{username}", response_model=None)
def delete_user_by_username(username: str, db: Session = Depends(get_db)):
    """
    DELETE USER BY USERNAME
    """
    user = db.query(Users).filter(Users.username == username).first()
    blogs = db.query(Blogs).filter(Blogs.author_username == username).all()
    if not user:
        raise HTTPException(status_code=404, detail=user_not_found_detail)
    db.delete(user)
    db.delete(blogs)
    return {
        "message": "User deleted successfully and their blogs have been deleted",
        "user": user,
    }
