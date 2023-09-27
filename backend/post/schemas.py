from pydantic import BaseModel

class PostBase(BaseModel):
    content: str
    image_url: str | None

class PostCreate(PostBase):
    pass

class PostUpdate(PostBase):
    pass

class PostResponse(PostBase):
    id: int
    creation_date: str
    author_id: int

class PostInDB(PostResponse):
    pass
