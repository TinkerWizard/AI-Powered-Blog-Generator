from fastapi import APIRouter, Depends, HTTPException
from api.security.auth import get_current_user
from api.utilities.users import get_author_id_using_author_username
from database import get_db
from models import Followers, Users
from sqlmodel import and_
from sqlalchemy.orm import Session
from api.schemas.followers import FollowUser, UnfollowUser
from datetime import datetime, timezone

router = APIRouter()

@router.get('/{user_id}')
def get_all_followers_of_the_user_id(user_id: int, db: Session = Depends(get_db)):
    """
    GET ALL THE FOLLOWERS OF THE USER ID
    """
    followers = db.query(Followers).filter(Followers.followee_id == user_id).all()
    
    if not followers:
        raise HTTPException(status_code=404, detail="No followers found for this user")
    
    followee_ids = [f.follower_id for f in followers]
    users = db.query(Users).filter(Users.id.in_(followee_ids)).all()
    return users

@router.post('/')
def follwer_user(follow_user: FollowUser, db: Session = Depends(get_db)):
    
    followee_id = get_author_id_using_author_username(follow_user.followee_username)
    follower_id = get_author_id_using_author_username(follow_user.follower_username)
    new_follower_record = Followers(
        followee_id=followee_id,
        follower_id=follower_id,
        followed_at=datetime.now(timezone.utc)
    )
    
    db.add(new_follower_record)
    db.commit()
    db.refresh(new_follower_record)
    return{
        "message": "Followed a new user",
        "record": new_follower_record
    }
    
    
@router.delete('/')
def unfollow_user(unfollow_user: UnfollowUser, db: Session = Depends(get_db)):
    
    followee_id = get_author_id_using_author_username(unfollow_user.followee_username, db)
    follower_id = get_author_id_using_author_username(unfollow_user.follower_username, db)
    follower_record = db.query(Followers).filter(
        and_(
            Followers.followee_id == followee_id,
            Followers.follower_id == follower_id
        )
    ).first()
    if not follower_record:
        raise HTTPException(status_code=404, detail="You are not following this user")
    
    db.delete(follower_record)
    db.commit()
    return{
        "message": "Unfollowed user",
        "record": follower_record
    }