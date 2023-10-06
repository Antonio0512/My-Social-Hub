from datetime import datetime

from sqlalchemy.orm import Session

from backend.notification import schemas, models


def create_notification(
        notification_data: schemas.NotificationCreate,
        db: Session
):
    creation_date = datetime.utcnow()

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
    return notification
