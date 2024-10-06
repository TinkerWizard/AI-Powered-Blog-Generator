from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class FollowUser(BaseModel):
    followee_id: int
    follower_id: int
    followed_at: Optional[datetime]
    
class UnfollowUser(BaseModel):
    followee_id: int
    follower_id: int