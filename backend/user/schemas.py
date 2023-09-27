from pydantic import BaseModel
from typing import List, Optional, Dict


class UserBase(BaseModel):
    username: str
    email: str
    full_name: Optional[str] = None
    bio: Optional[str] = None
    profile_picture: Optional[str] = None
    cover_picture: Optional[str] = None
    registration_date: Optional[str] = None


class UserCreate(UserBase):
    password: str
    password2: str


class UserLogin(BaseModel):
    email: str
    password: str


class UserUpdate(UserBase):
    pass


class User(UserBase):
    id: int
    posts: List[dict] = []
    friends: List[dict] = []

    class Config:
        from_attributes = True


class TokenResponse(BaseModel):
    access_token: str
    token_type: str
