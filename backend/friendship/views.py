from fastapi import HTTPException
from sqlalchemy.orm import Session

from backend.user import schemas as user_schemas, validators as user_validators
from backend.friendship import schemas as friend_schemas, utils as friendship_validators, models


def add_friend(
        friendship_data: friend_schemas.FriendshipCreate,
        current_user: user_schemas.User,
        db: Session
):
    friend = user_validators.get_user_by_id(friendship_data.friend_id, db)
    if not friend:
        raise HTTPException(status_code=404, detail="Friend not found")

    existing_friendship = friendship_validators.get_friendship(current_user.id, friendship_data.friend_id, db)
    if existing_friendship:
        raise HTTPException(status_code=400, detail="Friendship already exists")

    friendship = models.Friendship(
        user_id=friendship_data.user_id,
        friend_id=friendship_data.friend_id,
        status=friendship_data.status
    )
    db.add(friendship)
    db.commit()
    db.refresh(friendship)
    return friendship


def remove_friend(
        user_id: int,
        friend_id: int,
        current_user: user_schemas.User,
        db: Session
):
    friendship = friendship_validators.get_friendship(user_id, friend_id, db)

    if not friendship:
        raise HTTPException(status_code=404,
                            detail=f"Friendship with user_id {user_id} and friend_id {friend_id} not found")

    if friendship.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="You are not authorized to remove this friendship")

    removed_friendship = friendship

    db.delete(friendship)
    db.commit()

    return removed_friendship


def get_friendship_status(
        current_user_id: int,
        user_id: int,
        db: Session
):
    friendship = friendship_validators.get_friendship(current_user_id, user_id, db)
    if friendship:
        return "Friends"
    else:
        return "Not Friends"
