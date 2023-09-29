from typing import List, Union
from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form
from sqlalchemy.orm import Session

from backend import auth
from backend.database import get_db
from backend.user import schemas, storage
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
    user_data = {
        "id": user.id,
        "username": user.username,
        "email": user.email,
        "full_name": user.full_name,
        "bio": user.bio,
        "profile_picture": user.profile_picture,
        "cover_picture": user.cover_picture,
        "posts": user.posts,
        "friends": user.friends
    }

    return {"user": user_data, "access_token": access_token, "token_type": "bearer"}


@router.put("/users/{user_id}", response_model=schemas.User)
def update_user(
        user_id: int,
        username: str = Form(...),
        email: str = Form(...),
        full_name: str = Form(None),
        bio: str = Form(None),
        profile_picture: Union[UploadFile, str] = File(None),
        cover_picture: Union[UploadFile, str] = File(None),
        current_user: schemas.User = Depends(auth.get_current_user),
        db: Session = Depends(get_db)
):
    if isinstance(profile_picture, str):
        profile_picture_path = profile_picture
    else:
        profile_picture_path = storage.save_image(profile_picture)

    if isinstance(cover_picture, str):
        cover_picture_path = cover_picture
    else:
        cover_picture_path = storage.save_image(cover_picture)

    updated_user = views.update_user(
        user_id,
        username,
        email,
        full_name,
        bio,
        profile_picture_path,
        cover_picture_path,
        current_user,
        db
    )

    return updated_user


@router.get("/users/{user_id}", response_model=schemas.User)
def get_user(
        user_id: int,
        _current_user: schemas.User = Depends(auth.get_current_user),
        db: Session = Depends(get_db)
):
    user = views.get_one_user(user_id, db)
    return user


@router.get("/users", response_model=List[schemas.User])
def get_users(
        q: str | None = None,
        _current_user: schemas.User = Depends(auth.get_current_user),
        db: Session = Depends(get_db)
):
    users = views.get_users(q, db)

    return users
