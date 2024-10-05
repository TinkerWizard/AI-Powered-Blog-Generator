from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session
from models import Users
from crud import get_all_users
from database import get_db

router = APIRouter()

@router.get('/')
def get_users(db: Session = Depends(get_db)):
    return get_all_users(db)

@router.get('/{username}')
def get_user_by_username(username: str, db: Session = Depends(get_db)):
    user = db.query(Users).filter(Users.username == username).first()
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")  # Handle user not found case
    return user

@router.put('/{username}', response_model=None)
def update_user_by_username(username: str, db: Session = Depends(get_db)):
    # update functionality
    new_password = "i.killed.leah"
    user = db.query(Users).filter(Users.username == username).first()
    
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    user.hashed_password = new_password
    
    db.commit()
    return {"message": "User updated successfully", "user": user}
    
    
