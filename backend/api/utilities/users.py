from models import Users
from sqlmodel import select
from sqlalchemy.orm import Session
from sqlalchemy.ext.asyncio import AsyncSession
from database import get_db
from fastapi import Depends, HTTPException

def get_author_name_using_author_username(author_username: str, db: AsyncSession):
    user = db.query(Users).filter(Users.username == author_username).first()  # Get the first result
    return user.name


def get_author_id_using_author_username(author_username: str, db: Session = Depends(get_db)):
    user = db.query(Users).filter(Users.username == author_username).first()
    return user.id

