from fastapi import HTTPException
from sqlalchemy import desc
from sqlalchemy.orm import Session

from backend.user.schemas import User

from backend.notification.models import Notification


async def get_user_notifications(
        user_id: int,
        current_user: User,
        db: Session
):
    if user_id != current_user.id:
        raise HTTPException(status_code=403, detail="You are not authorized!")

    return await db.query(Notification) \
        .filter(Notification.receiver_id == user_id) \
        .order_by(desc(Notification.created_at)) \
        .all()
