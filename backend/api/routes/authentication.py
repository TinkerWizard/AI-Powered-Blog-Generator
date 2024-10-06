from fastapi import APIRouter, HTTPException, Depends
from sqlmodel import Session
from database import get_db
from api.schemas.user import UserRegister, UserLogin, ResetPassword
from models import Users
from datetime import datetime, timezone
import base64

router = APIRouter()

@router.post('/signup')
def user_signup(new_user: UserRegister, db: Session = Depends(get_db)):
    """
    NEW USER REGISTERATION
    """
    existing_user_with_username = db.query(Users).filter(Users.username == new_user.username).first()
    if existing_user_with_username:
        raise HTTPException(status_code=400, detail="Username is already taken")
    
    # Check if the email is available
    existing_user_with_email = db.query(Users).filter(Users.email == new_user.email).first()
    if existing_user_with_email:
        raise HTTPException(status_code=400, detail="Email is already taken")
    profile_pic_base64 = None
    if new_user.profile_pic:
        # Assume new_user.profile_pic is a file-like object (e.g., from a form)
        profile_pic_base64 = base64.b64encode(new_user.profile_pic.read()).decode('utf-8')
    new_user_record = Users(
        name=new_user.name,
        username=new_user.username,
        email=new_user.email,
        hashed_password=new_user.hashed_password,
        created_at=datetime.now(timezone.utc),
        updated_at=datetime.now(timezone.utc),
        profile_pic=profile_pic_base64
    )
    
    db.add(new_user_record)
    db.commit()
    db.refresh(new_user_record)
    
    return {"message": "User successfully created"}

@router.post('/login')
def user_login(user: UserLogin, db: Session = Depends(get_db)):
    """
    USER LOGIN
    """
    existing_user = db.query(Users).filter(Users.username == user.username).first()
    
    if not existing_user:
        raise HTTPException(status_code=400, detail="Invalid username or password")

    # Directly compare passwords for now
    if existing_user.hashed_password == user.password:
        return {
            "message": "Credentials matched. Login successful",
            "user_id": existing_user.id,
        }
    
    raise HTTPException(status_code=400, detail="Invalid username or password")

@router.post('/reset-password/{username}')
def update_password_by_username(username:str, new_password: ResetPassword, db: Session = Depends(get_db)):
    """
    SENDGRID MAIL OTP HAS TO BE ADDED
    """
    db_user = db.query(Users).filter(Users.username == username).first()
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")
    db_user.hashed_password = new_password.new_password
    return {
        "message": "Password reset successful"
    }
    
# will be implemented during JWT implementation
# @router.get('/logout')
# def logout(db: Session = Depends(get_db)):
    