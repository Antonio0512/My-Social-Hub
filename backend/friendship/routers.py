from typing import List

from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session

from backend.friendship import schemas as friendship_schema, views
from backend.user import schemas as user_schema

from backend.auth import get_current_user
from backend.database import get_db

router = APIRouter()


@router.post("/friends/add", response_model=friendship_schema.FriendshipResponse)
def add_friend(
        friendship_data: friendship_schema.FriendshipCreate,
        current_user: user_schema.User = Depends(get_current_user),
        db: Session = Depends(get_db)
):
    return views.add_friend(friendship_data, current_user, db)


@router.get("/friendships/status", response_model=List[friendship_schema.FriendshipStatus])
def get_friendships(
        user_ids: str,
        current_user: user_schema.User = Depends(get_current_user),
        db: Session = Depends(get_db)
):
    user_id_list = [int(id_str) for id_str in user_ids.split(",")]

    friendship_statuses = []
    for user_id in user_id_list:
        status = views.get_friendship_status(current_user.id, user_id, db)
        friendship_statuses.append(
            {
                "user_id": user_id,
                "friend_id": current_user.id,
                "status": status
            }
        )

    print(friendship_statuses)
    return friendship_statuses
