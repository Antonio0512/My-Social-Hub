from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles

from backend.database import Base, engine

from backend.user.routers import router as user_router
from backend.post.routers import router as post_router
from backend.friendship.routers import router as friendship_router

from backend.user.models import User
from backend.post.models import Post
from backend.friendship.models import Friendship

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.mount("/static", StaticFiles(directory="static"), name="static")

app.include_router(user_router, prefix="/api", tags=["Users"])
app.include_router(post_router, prefix="/api", tags=["Posts"])
app.include_router(friendship_router, prefix="/api", tags=["Friendships"])
