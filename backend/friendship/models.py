from sqlalchemy import Column, Integer, ForeignKey, String
from sqlalchemy.orm import relationship

from backend.database import Base


class Friendship(Base):
    __tablename__ = "friendships"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    status = Column(String)
    user_id = Column(Integer, ForeignKey("users.id"))
    user = relationship(
        "User",
        back_populates="friends",
        primaryjoin="User.id == Friendship.user_id"
    )

    friend_id = Column(Integer, ForeignKey("users.id"))
    friend = relationship(
        "User",
        back_populates="friends",
        primaryjoin="User.id == Friendship.friend_id"
    )
