from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.orm import relationship

from backend.database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    username = Column(String, unique=True, index=True)
    email = Column(String, unique=True, index=True)
    password = Column(String)
    full_name = Column(String, nullable=True)
    bio = Column(String, nullable=True)
    profile_picture = Column(String, nullable=True)
    cover_picture = Column(String, nullable=True)
    registration_date = Column(DateTime, nullable=True)

    posts = relationship("Post", back_populates="author")
    friends = relationship(
        "Friendship",
        back_populates="user",
        primaryjoin="User.id == Friendship.user_id")
