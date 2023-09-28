from typing import List

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session

from backend import auth
from backend.database import get_db
from backend.user import schemas
from backend.user import views

router = APIRouter()


@router.post("/users", response_model=schemas.User)
def register(
        user_data: schemas.UserCreate,
        db: Session = Depends(get_db)
):
    try:
        user = views.register_user(user_data, db)
        return user
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except HTTPException as e:
        raise HTTPException(status_code=e.status_code, detail=e.detail)


@router.post("/login", response_model=schemas.TokenResponse)
def login(
        user_data: schemas.UserLogin,
        db: Session = Depends(get_db)
):
    user = views.login_user(user_data.email, user_data.password, db)
    if not user:
        raise HTTPException(status_code=400, detail="Incorrect username or password")

    access_token = auth.create_access_token(data={"sub": user.email})

    return {"access_token": access_token, "token_type": "bearer"}


@router.get("/users/{id}", response_model=schemas.User)
def get_user(
        user_id: int,
        _current_user: schemas.User = Depends(auth.get_current_user),
        db: Session = Depends(get_db)
):
    user = views.get_one_user(user_id, db)
    return user


@router.get("/users/", response_model=List[schemas.User])
def get_users(
        q: str | None = None,
        _current_user: schemas.User = Depends(auth.get_current_user),
        db: Session = Depends(get_db)
):
    users = views.get_users(q, db)

    return users
