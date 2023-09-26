from pydantic import BaseModel


class PostBase(BaseModel):
    content: str
    image_url: str
    creation_date: str


class PostCreate(PostBase):
    pass


class PostUpdate(PostBase):
    pass


class Post(PostBase):
    id: int
    author_id: int

    class Config:
        orm_mode = True
