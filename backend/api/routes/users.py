from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
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
def get_user_by_username(username: str, db: Session = Depends(get_db)):
    """
    RETRIEVE USER BY USERNAME, ONLY ALLOW IF CURRENT USER IS AUTHENTICATED
    """
    user = db.query(Users).filter(Users.username == username).first()
    if user is None:
        raise HTTPException(status_code=404, detail=user_not_found_detail)
    return user

@router.put("/{username}")
def update_user_by_username(
    username: str, user_update: UserUpdate, db: Session = Depends(get_db)
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
