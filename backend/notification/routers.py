from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from backend.auth import get_current_user
from backend.database import get_db
from backend.notification import schemas, views

from backend.user.schemas import User

router = APIRouter()


@router.post("/friend-request", response_model=schemas.Notification)
def create_notification(
        recipient: schemas.NotificationCreate,
        current_user: User = Depends(get_current_user),
        db: Session = Depends(get_db)

):
    return views.create_notification(recipient, current_user, db)
