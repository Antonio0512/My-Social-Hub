from sqlalchemy import Integer, Column, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship

from backend.config import Base


class Post(Base):
    __tablename__ = "posts"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    content = Column(String, nullable=False)
    image_url = Column(String)
    creation_date = Column(DateTime, nullable=False)

    author_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    author = relationship("User", back_populates="posts")