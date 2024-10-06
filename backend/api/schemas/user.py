from pydantic import BaseModel
from typing import Optional
from datetime import datetime
from fastapi import UploadFile

class UserRegister(BaseModel):
    name: str
    username: str
    email: str
    hashed_password: str
    created_at: Optional[datetime]
    updated_at: Optional[datetime]
    profile_pic: Optional[bytes]
    
class UserLogin(BaseModel):
    username: str
    password: str

class UserUpdate(BaseModel):
    name: Optional[str]
    username: Optional[str]
    email: Optional[str]
    hashed_password: Optional[str]
    updated_at: Optional[datetime]
    profile_pic: Optional[UploadFile]
    
class ResetPassword(BaseModel):
    new_password: str