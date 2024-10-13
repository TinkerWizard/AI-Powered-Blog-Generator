from sqlalchemy.orm import Session
from api.utilities.users import get_author_id_using_author_username
from database import get_db
from fastapi import Depends
from models import Followers


def get_number_of_followers(username: str, db: Session = Depends(get_db)):
    user_id = get_author_id_using_author_username(username, db)
    followers = db.query(Followers).filter(Followers.followee_id == user_id).all()
    count = 0
    if not followers:
        return "No followers"
    for _ in followers:
        count = count + 1
    return count

def is_following(followee_username: str, follower_username: str, db: Session = Depends(get_db)):
    follower_id = get_author_id_using_author_username(follower_username, db)
    followee_id = get_author_id_using_author_username(followee_username, db)
    result = db.query(Followers).filter(
        Followers.follower_id == follower_id,  # Check if follower_id matches
        Followers.followee_id == followee_id   # Check if followee_id matches
    ).first()
    if result:
        return True
    return False