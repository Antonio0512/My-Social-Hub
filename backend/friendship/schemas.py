from pydantic import BaseModel


class FriendshipBase(BaseModel):
    user_id: int
    friend_id: int
    status: str


class FriendshipCreate(FriendshipBase):
    pass


class FriendshipResponse(FriendshipBase):
    id: int


class FriendshipStatus(BaseModel):
    user_id: int
    friend_id: int
    status: str


class FriendshipRemove(BaseModel):
    message: str
    friendship: FriendshipResponse
