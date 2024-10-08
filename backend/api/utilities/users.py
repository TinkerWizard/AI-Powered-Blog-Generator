from models import Users
from sqlmodel import Session, select
from sqlalchemy.ext.asyncio import AsyncSession
from database import get_db
from fastapi import Depends, HTTPException

async def get_author_name_using_author_username(author_username: str, db: AsyncSession):
    statement = select(Users).where(Users.username == author_username)
    result = await db.execute(statement)  # Use 'exec' with async session
    user = result.scalars().first()  # Get the first result
    return user.name if user else None


def get_author_id_using_author_username(author_username: str, db: Session = Depends(get_db)):
    user = db.query(Users).filter(Users.username == author_username).first()
    return user.id

