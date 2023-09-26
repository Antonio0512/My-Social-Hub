from pydantic import BaseModel


class UserBase(BaseModel):
    username: str
    email: str
    full_name: str
    bio: str
    profile_picture: str
    cover_picture: str
    registration_date: str


class UserCreate(BaseModel):
    username: str
    email: str
    password: str
    password2: str


class UserUpdate(UserBase):
    pass


class User(UserBase):
    id: int

    class Config:
        orm_mode = True
