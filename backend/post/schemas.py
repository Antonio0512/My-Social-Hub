from datetime import datetime
from typing import Optional

from pydantic import BaseModel

class PostBase(BaseModel):
    content: str
    image_url: Optional[str] = None

class PostCreate(PostBase):
    pass

class PostUpdate(PostBase):
    pass

class PostResponse(PostBase):
    id: int
    creation_date: datetime
    author_id: int

class PostInDB(PostResponse):
    pass
