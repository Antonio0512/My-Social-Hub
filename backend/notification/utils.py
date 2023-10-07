from sqlalchemy.orm import Session
from backend.notification import models, schemas


def notification_exist(
        notification_data: schemas.NotificationCreate,
        db: Session
):
    return db.query(models.Notification).filter(
        models.Notification.sender_id == notification_data.sender_id,
        models.Notification.recipient_id == notification_data.recipient_id,
        models.Notification.notification_type == "friend_request"
    ).first()

