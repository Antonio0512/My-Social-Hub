from datetime import datetime
from pydantic import BaseModel


class NotificationBase(BaseModel):
    message: str
    read: bool = False
    notification_type: str = None


class NotificationCreate(NotificationBase):
    sender_id: int
    recipient_id: int


class Notification(NotificationBase):
    id: int
    sender_id: int
    recipient_id: int
    timestamp: datetime


class UserWithNotifications(dict):
    pass
