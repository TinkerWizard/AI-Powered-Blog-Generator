from sqlmodel import SQLModel, Field
from sqlalchemy import Column, Integer
from datetime import date

class Blogs(SQLModel, table=True):
    id: int = Field(default=None, sa_column=Column(Integer, autoincrement=True, primary_key=True))
    author_name: str
    author_username: str = Field(foreign_key="users.username")
    author_id: int = Field(foreign_key="users.id")
    title: str
    body: str
    created_date: date
    blog_cover: bytes

class Users(SQLModel, table=True):
    id: int = Field(default=None, sa_column=Column(Integer, primary_key=True, autoincrement=True))
    name: str
    username: str = Field(unique=True, index=True)
    email: str = Field(unique=True, index=True)
    hashed_password: str
    created_at: date
    updated_at: date
    profile_pic: bytes
    
class Followers(SQLModel, table=True):
    id: int = Field(default=None,sa_column=Column(Integer, primary_key=True, autoincrement=True))
    followee_id: int = Field(foreign_key="users.id")
    follower_id: int = Field(foreign_key="users.id")
    followed_at: date