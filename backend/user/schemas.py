from pydantic import BaseModel
from typing import List, Optional, Dict
from backend.post.schemas import PostResponse


class UserBase(BaseModel):
    username: str
    email: str
    full_name: Optional[str] = None
    bio: Optional[str] = None
    current_city: Optional[str] = None
    birth_place: Optional[str] = None
    relationship_status: Optional[str] = None
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
    posts: List[PostResponse] = []
    friends: List[Dict] = []

    class Config:
        from_attributes = True


class TokenResponse(BaseModel):
    user: dict
    access_token: str
    token_type: str
