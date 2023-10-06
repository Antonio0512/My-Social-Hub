from sqlalchemy import Column, Integer, ForeignKey, String, DateTime
from sqlalchemy.orm import relationship

from backend.database import Base


class Notification(Base):
    __tablename__ = "notifications"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    sender_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    receiver_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    message = Column(String)
    notification_type = Column(String)
    status = Column(String, default="unread")
    created_at = Column(DateTime)

    sender = relationship("User", foreign_keys=[sender_id], back_populates="sent_notifications")
    receiver = relationship("User", foreign_keys=[receiver_id], back_populates="received_notifications")
