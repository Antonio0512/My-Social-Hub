from fastapi import FastAPI

from backend.config import Base, engine
from backend.router.user_router import user_router

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.include_router(user_router, prefix="/api", tags=["Users"])
