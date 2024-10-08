from pydantic import BaseModel
from typing import Optional
from datetime import datetime
from fastapi import UploadFile, File, Form

class NewBlog(BaseModel):
    author_name: str
    author_username: str
    title: str
    body: str
    created_date: Optional[datetime]
    blog_cover: Optional[UploadFile]
    author_id: int
    
class UpdateBlog(BaseModel):
    title: str
    body: str
    blog_cover: Optional[UploadFile]

class GenerateBlog(BaseModel):
    concept: str
    number_of_words: int
    type_of_response: str
    
    class Config:
        allow_population_by_field_name = True
        # Define aliases for fields
        schema_extra = {
            "example": {
            "concept": "Tech in 2024",
            "numberOfWords": 500,
            "typeOfResponse": "Passage"
            }
        }