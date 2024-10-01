from sqlmodel import SQLModel, Field

class BlogPost(SQLModel, table = True):
    __tablename__ = "blogs"
    id: int = Field(default = True, primary_key=True)
    author: str
    username: str
    title: str
    body: str
    date: str
    thumbnail: str