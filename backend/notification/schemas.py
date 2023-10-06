from datetime import datetime

from pydantic import BaseModel
from sqlalchemy import Enum


class NotificationStatusEnum(Enum):
    unread = "unread"
    read = "read"


class NotificationTypeEnum(Enum):
    friend_request = "friend_request"
    message = "message"
    notification = "notification"


class NotificationBase(BaseModel):
    sender_id: int
    receiver_id: int
    message: str
    notification_type: NotificationTypeEnum


class NotificationCreate(NotificationBase):
    pass


class Notification(NotificationBase):
    id: int
    status: NotificationStatusEnum
    created_at: datetime
