from typing import List

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from backend.auth import get_current_user
from backend.database import get_db

from backend.notification import schemas, views
from backend.user.models import User

router = APIRouter()


@router.get("/notifications/{user_id}/all", response_model=List[schemas.Notification])
async def get_user_notifications(
        user_id: int,
        current_user: User = Depends(get_current_user),
        db: Session = Depends(get_db)
):
    return await views.get_user_notifications(user_id, current_user, db)
