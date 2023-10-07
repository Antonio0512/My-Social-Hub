from datetime import datetime

from fastapi import HTTPException
from sqlalchemy.orm import Session

from backend.notification import schemas, models
from backend.notification.utils import notification_exist

from backend.user.schemas import User

from backend.friendship import views, schemas as friendship_schemas


def create_notification(
        notification_data: schemas.NotificationCreate,
        current_user: User,
        db: Session
):
    creation_date = datetime.utcnow()

    existing_notification = notification_exist(notification_data, db)

    if existing_notification:
        raise HTTPException(status_code=400, detail="Friend request already sent")

    notification = models.Notification(
        message=notification_data.message,
        read=False,
        notification_type=notification_data.notification_type,
        sender_id=notification_data.sender_id,
        recipient_id=notification_data.recipient_id,
        timestamp=creation_date
    )

    db.add(notification)
    db.commit()
    db.refresh(notification)

    sender_friendship_data = friendship_schemas.FriendshipCreate(
        user_id=notification_data.sender_id,
        friend_id=notification_data.recipient_id,
        status="Requested",
    )

    recipient_friendship_data = friendship_schemas.FriendshipCreate(
        user_id=notification_data.recipient_id,
        friend_id=notification_data.sender_id,
        status="Requested",
    )

    views.add_friend(
        sender_friendship_data,
        current_user,
        db
    )

    views.add_friend(
        recipient_friendship_data,
        current_user,
        db
    )

    return notification
