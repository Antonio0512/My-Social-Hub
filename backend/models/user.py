from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.orm import relationship

from backend.config import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    username = Column(String, unique=True, index=True)
    email = Column(String, unique=True, index=True)
    password = Column(String)
    full_name = Column(String)
    bio = Column(String)
    profile_picture = Column(String)
    cover_picture = Column(String)
    registration_date = Column(DateTime)

    posts = relationship("Post", back_populates="author")
    friends = relationship("Friendship", back_populates="user")

