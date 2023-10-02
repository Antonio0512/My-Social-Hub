from sqlalchemy.orm import Session
from backend.friendship.models import Friendship


def get_friendship(
        user_id: int,
        friend_id: int,
        db: Session
):
    return db.query(Friendship).filter(
        (Friendship.user_id == user_id) & (Friendship.friend_id == friend_id)
    ).first()
