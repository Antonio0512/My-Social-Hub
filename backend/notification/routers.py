from typing import List

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from backend.auth import get_current_user
from backend.database import get_db
from backend.notification import schemas, views

from backend.user.schemas import User

router = APIRouter()


@router.post("/friend-request", response_model=schemas.Notification)
def create_friendship_notification(
        recipient: schemas.NotificationCreate,
        current_user: User = Depends(get_current_user),
        db: Session = Depends(get_db)

):
    return views.create_friendship_notification(recipient, current_user, db)


@router.get("/{user_id}/friend-requests", response_model=List[schemas.Notification])
def get_user_friendship_notifications(
        user_id: int,
        _current_user: User = Depends(get_current_user),
        db: Session = Depends(get_db)
):
    return views.get_user_friendship_notifications(user_id, db)
