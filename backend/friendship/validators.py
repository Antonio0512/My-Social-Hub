from sqlalchemy.orm import Session
from backend.friendship.models import Friendship


def are_friends(
        user_id: int,
        friend_id: int,
        db: Session
):
    return db.query(Friendship).filter_by(
        user_id=user_id,
        friend_id=friend_id
    ).first()
