from fastapi import APIRouter, HTTPException, Depends
from sqlmodel import Session
from database import get_db
from api.schemas.user import UserRegister, UserLogin, ResetPassword
from models import Users
from datetime import datetime, timezone
import base64
from api.security.auth import create_access_token, verify_access_token, hash_password, verify_password
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
        
    hashed_password = hash_password(new_user.hashed_password)
    new_user_record = Users(
        name=new_user.name,
        username=new_user.username,
        email=new_user.email,
        hashed_password=hashed_password,
        created_at=datetime.now(timezone.utc),
        updated_at=datetime.now(timezone.utc),
        profile_pic=profile_pic_base64
    )
    
    db.add(new_user_record)
    db.commit()
    db.refresh(new_user_record)
    
    return {"message": "User successfully created"}

@router.post('/login')
def login_user(user_login: UserLogin, db: Session = Depends(get_db)):
    user = db.query(Users).filter(Users.username == user_login.username).first()
    
    if not user:
        raise HTTPException(status_code=400, detail="Invalid username or password")
    
    if not verify_password(user_login.password, user.hashed_password):
        raise HTTPException(status_code=400, detail="Invalid username or password")
    
    # Create JWT token
    access_token = create_access_token(data={"sub": user.username})
    return {"access_token": access_token, "token_type": "bearer"}


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
    