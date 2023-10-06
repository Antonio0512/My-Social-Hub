from sqlalchemy import Column, Integer, String, Boolean, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from backend.database import Base


class Notification(Base):
    __tablename__ = 'notifications'

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    sender_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    recipient_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    message = Column(String)
    timestamp = Column(DateTime)
    read = Column(Boolean, default=False)
    notification_type = Column(String)

    sender = relationship(
        "User",
        back_populates="sent_notifications",
        foreign_keys=[sender_id]
    )
    recipient = relationship(
        "User",
        back_populates="received_notifications",
        foreign_keys=[recipient_id]
    )
