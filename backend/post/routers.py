from typing import Union, List

from fastapi import APIRouter, Depends, UploadFile, File, Form
from sqlalchemy.orm import Session

from backend.post import views
from backend.user.schemas import User as Schema_user

from backend.user import schemas

from backend.auth import get_current_user
from backend.database import get_db

from backend.utils import save_image

router = APIRouter()


@router.post("/posts", response_model=schemas.PostResponse)
def add_post(
        content: str = Form(...),
        image: Union[UploadFile, str] = File(...),
        current_user: Schema_user = Depends(get_current_user),
        db: Session = Depends(get_db)
):
    if isinstance(image, str):
        post_picture_path = image
    else:
        post_picture_path = save_image(image, "post_pics")

    post = views.create_post(
        content,
        post_picture_path,
        current_user,
        db
    )
    return post


@router.get("/posts", response_model=List[schemas.PostResponse])
def get_posts(
        _current_user: Schema_user = Depends(get_current_user),
        db: Session = Depends(get_db)
):
    posts = views.get_posts(db, column_name="creation_date")
    return posts


@router.get("/posts/{post_id}/author", response_model=schemas.User)
def get_post_author(
        post_id: int,
        _current_user: schemas.User = Depends(get_current_user),
        db: Session = Depends(get_db)
):
    return views.get_post_author(post_id, db)


@router.get("/{user_id}/posts", response_model=List[schemas.PostResponse])
def get_user_posts(
        user_id: int,
        _current_user: schemas.User = Depends(get_current_user),
        db: Session = Depends(get_db)
):
    return views.get_user_posts(user_id, db)
