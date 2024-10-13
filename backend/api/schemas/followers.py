from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class FollowUser(BaseModel):
    followee_username: str
    follower_username: str
    
class UnfollowUser(BaseModel):
    followee_username: str
    follower_username: str