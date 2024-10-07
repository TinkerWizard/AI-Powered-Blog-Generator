from pydantic import BaseModel
from typing import Optional
from datetime import datetime
from fastapi import UploadFile

class NewBlog(BaseModel):
    author_name: str
    author_username: str
    author_id: int
    title: str
    body: str
    created_date: Optional[datetime]
    blog_cover: Optional[UploadFile]
    
class UpdateBlog(BaseModel):
    title: str
    body: str
    blog_cover: Optional[UploadFile]

class GenerateBlog(BaseModel):
    concept: str
    number_of_words: int
    type_of_response: str