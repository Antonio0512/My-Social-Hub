from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship

from backend.database import Base

class Post(Base):
    __tablename__ = "posts"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    content = Column(String)
    image_url = Column(String)
    creation_date = Column(DateTime)
    author_id = Column(Integer, ForeignKey("users.id"))

    author = relationship("User", back_populates="posts")
