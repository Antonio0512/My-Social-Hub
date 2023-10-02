from fastapi import APIRouter, Depends
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
